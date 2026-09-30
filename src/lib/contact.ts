import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  telefone: z.string().trim().min(8).max(30),
  mensagem: z.string().trim().min(10).max(5_000),
  website: z.string().max(200).default(""),
});

type ContactInput = z.infer<typeof contactSchema>;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const CONTACT_COOLDOWN_MS = 5 * 60 * 1_000;
const rateLimitByIp = new Map<string, RateLimitEntry>();
const lastSuccessfulContactByIdentity = new Map<string, number>();

function assertWithinRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitByIp.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new Error("Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.");
  }

  current.count += 1;
}

function getContactCooldownSeconds(identity: string) {
  const now = Date.now();
  for (const [storedIdentity, lastSuccessfulContact] of lastSuccessfulContactByIdentity) {
    if (lastSuccessfulContact + CONTACT_COOLDOWN_MS <= now) {
      lastSuccessfulContactByIdentity.delete(storedIdentity);
    }
  }

  const lastSuccessfulContact = lastSuccessfulContactByIdentity.get(identity);
  if (!lastSuccessfulContact) return 0;

  const remainingMs = lastSuccessfulContact + CONTACT_COOLDOWN_MS - now;
  return Math.ceil(remainingMs / 1_000);
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Variavel obrigatoria ausente: ${name}`);
  return value;
}

function buildPlainTextMessage(data: ContactInput) {
  return [
    "Novo contato recebido pelo site da Trixus",
    "",
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `WhatsApp/Telefone: ${data.telefone}`,
    "",
    "Mensagem:",
    data.mensagem,
  ].join("\n");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Honeypot: bots costumam preencher campos invisiveis. Retornamos sucesso
    // para nao revelar a protecao, mas nenhum e-mail e enviado.
    if (data.website) return { ok: true };

    const [{ getRequestIP }, nodemailerModule, { createHash }] = await Promise.all([
      import("@tanstack/react-start/server"),
      import("nodemailer"),
      import("node:crypto"),
    ]);

    const ip = getRequestIP({ xForwardedFor: process.env["TRUST_PROXY"] === "true" }) ?? "unknown";
    const identity = createHash("sha256")
      .update(`${data.email.toLowerCase()}|${data.telefone.replace(/\D/g, "")}`)
      .digest("hex");
    const retryAfterSeconds = getContactCooldownSeconds(identity);

    if (retryAfterSeconds > 0) {
      return { ok: false, reason: "cooldown" as const, retryAfterSeconds };
    }

    assertWithinRateLimit(ip);

    const smtpPort = Number(requiredEnv("SMTP_PORT"));
    if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65_535) {
      throw new Error("Configuracao SMTP invalida.");
    }

    const nodemailer = nodemailerModule.default;
    const transporter = nodemailer.createTransport({
      host: requiredEnv("SMTP_HOST"),
      port: smtpPort,
      secure: process.env["SMTP_SECURE"] === "true",
      auth: {
        user: requiredEnv("SMTP_USER"),
        pass: requiredEnv("SMTP_PASS"),
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    try {
      await transporter.sendMail({
        from: requiredEnv("SMTP_FROM"),
        to: requiredEnv("CONTACT_TO"),
        replyTo: { name: data.nome, address: data.email },
        subject: `Novo Lead - Trixus - ${data.nome}`,
        text: buildPlainTextMessage(data),
      });
    } catch (error) {
      console.error("contact_email_delivery_failed", error);
      throw new Error("Nao foi possivel enviar a mensagem agora. Tente novamente em instantes.");
    }

    lastSuccessfulContactByIdentity.set(identity, Date.now());
    return { ok: true };
  });
