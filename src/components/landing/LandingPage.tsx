import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  CircleUserRound,
  ContactRound,
  History,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import markLogo from "@/assets/trixus-logo-mark.png";
import fullLogo from "@/assets/trixus-logo-full.png";
import footerBg from "@/assets/footer-bg.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/lib/contact";
import { DashboardMockup, InboxMockup, TeamMockup } from "./ProductMockups";

const productUrl = "https://chat.trixus.com.br";
const whatsappUrl = "https://api.whatsapp.com/send/?phone=5562996171414";
const heroModules: [string, LucideIcon][] = [
  ["Conversas", MessagesSquare],
  ["Equipe", Users],
  ["Contatos", ContactRound],
  ["Histórico", History],
  ["Gestão", Workflow],
  ["Indicadores", BarChart3],
];
const navItems: [string, string][] = [
  ["Início", "#inicio"],
  ["Produto", "#produto"],
  ["Planos", "#planos"],
  ["Contato", "#contato"],
];

function formatCooldown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

async function handleContactSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setCooldownSeconds: (seconds: number) => void,
) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.dataset["submitting"] === "true") return;

  const formData = new FormData(form);
  form.dataset["submitting"] = "true";

  try {
    const result = await sendContactMessage({
      data: {
        nome: String(formData.get("nome") ?? ""),
        email: String(formData.get("email") ?? ""),
        telefone: String(formData.get("telefone") ?? ""),
        mensagem: String(formData.get("mensagem") ?? ""),
        website: String(formData.get("website") ?? ""),
      },
    });

    if (!result.ok && result.reason === "cooldown") {
      setCooldownSeconds(result.retryAfterSeconds);
      toast.error(
        `Mensagem já enviada. Aguarde ${formatCooldown(result.retryAfterSeconds)} para tentar novamente.`,
      );
      return;
    }

    setCooldownSeconds(0);
    form.reset();
    toast.success("Mensagem enviada com sucesso.");
  } catch (error) {
    console.error(error);
    toast.error("Nao foi possivel enviar a mensagem. Tente novamente em instantes.");
  } finally {
    delete form.dataset["submitting"];
  }
}

function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="whatsapp-float"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
}

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [contactCooldownSeconds, setContactCooldownSeconds] = useState(0);

  useEffect(() => {
    if (contactCooldownSeconds <= 0) return;

    const timeout = window.setTimeout(() => {
      setContactCooldownSeconds((current) => Math.max(0, current - 1));
    }, 1_000);

    return () => window.clearTimeout(timeout);
  }, [contactCooldownSeconds]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const ids = navItems.map(([, href]) => href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const line = Math.min(window.innerHeight * 0.4, 320);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-container grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-[72px] lg:grid-cols-[auto_1fr_auto]">
          <a
            href="#inicio"
            className="flex min-w-0 items-center gap-2.5"
            aria-label="Trixus - início"
          >
            <img
              src={markLogo}
              alt=""
              width={384}
              height={237}
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold tracking-normal">
              Tri<span className="text-primary">x</span>us
            </span>
          </a>
          <nav
            className="hidden items-center justify-center gap-1 lg:flex"
            aria-label="Navegação principal"
          >
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${activeSection === href.slice(1) ? "is-active" : ""}`}
                aria-current={activeSection === href.slice(1) ? "true" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild size="lg" className="h-12 px-6">
              <a href={productUrl}>
                Entrar <ArrowRight />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu lg:hidden" aria-label="Navegação mobile">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={activeSection === href.slice(1) ? "is-active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <ChevronRight />
              </a>
            ))}
            <div className="pt-3">
              <Button asChild size="lg" className="h-12 w-full px-6">
                <a href={productUrl}>
                  Entrar <ArrowRight />
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-section scroll-mt-20">
          <div className="site-container grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:pb-24 lg:pt-32">
            <div className="max-w-xl">
              <h1 className="mt-6 text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-[64px]">
                Atendimento organizado.
                <br />
                <span className="text-primary block mt-7 text-[30px] leading-[1.06] sm:text-[27px] lg:text-[34px]">
                  Relacionamentos mais eficientes.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Centralize conversas, organize sua equipe e acompanhe toda a operação de atendimento
                em um único lugar.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="h-12 px-6">
                  <a href="#contato">
                    Conhecer a Trixus <ArrowRight />
                  </a>
                </Button>
              </div>
              <div className="mt-8 grid w-fit grid-cols-3 gap-x-10 gap-y-2.5 text-xs font-medium text-muted-foreground">
                {heroModules.map(([label, Icon]) => (
                  <span key={label} className="flex items-center gap-2">
                    <Icon className="size-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative lg:-mr-20">
              <div className="hero-grid-bg" />
              <div className="relative shadow-product">
                <InboxMockup />
              </div>
              <div className="floating-status hidden sm:flex">
                <span className="grid size-8 place-items-center rounded-md bg-success-soft text-success">
                  <Check />
                </span>
                <div>
                  <p className="text-[10px] text-muted-foreground">Atendimento</p>
                  <p className="text-xs font-semibold">Conversa distribuída</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="produto" className="section-block section-tight scroll-mt-20">
          <div className="site-container">
            <div className="section-heading">
              <h2>Produto</h2>
              <p className="section-sub">
                Quando as conversas crescem, a organização precisa acompanhar.
              </p>
            </div>
          </div>
        </section>

        <div className="section-block section-tight bg-subtle">
          <div className="site-container space-y-14">
            <FeatureRow
              kicker="WhatsApp"
              title="WhatsApp conectado à sua operação."
              text="Mantenha mensagens, mídias e histórico organizados em uma experiência contínua."
              icon={<MessageCircle />}
              points={[
                "Conexões organizadas",
                "Múltiplas instâncias",
                "Continuidade do atendimento",
              ]}
            >
              <InboxMockup compact />
            </FeatureRow>
            <FeatureRow
              reverse
              kicker="Equipe"
              title="Cada conversa com o responsável certo."
              text="Distribua atendimentos por departamentos e filas e organize papéis e permissões."
              icon={<Users />}
              points={["Departamentos e filas", "Perfis e permissões"]}
            >
              <TeamMockup />
            </FeatureRow>
            <FeatureRow
              kicker="Gestão"
              title="Visibilidade para quem precisa gerir."
              text="Acompanhe indicadores, filas e o histórico da operação em uma visão clara."
              icon={<BarChart3 />}
              points={["Indicadores operacionais", "Relatórios e histórico"]}
            >
              <DashboardMockup />
            </FeatureRow>
          </div>
        </div>

        <section id="planos" className="plans-section section-block section-tight scroll-mt-20">
          <div className="site-container">
            <div className="section-heading">
              <h2>Planos</h2>
              <p className="section-sub">Soluções para cada etapa do seu negócio.</p>
            </div>
            <div className="plans-grid mt-12">
              <PlanCard
                icon={<CircleUserRound />}
                title="Basic"
                level="Nível 1"
                text="Entrada / pequenos clientes"
                features={[
                  "Atendimento centralizado",
                  "Organização de contatos",
                  "Usuários e equipe básica",
                  "Histórico de conversas",
                  "Recursos essenciais",
                ]}
              />
              <PlanCard
                featured
                icon={<BarChart3 />}
                title="Pro"
                level="Nível 2"
                text="Uso profissional"
                features={[
                  "Tudo do plano Basic",
                  "Departamentos e filas",
                  "Papéis e permissões",
                  "Indicadores e relatórios",
                  "Automação de processos",
                  "Mais integrações",
                ]}
              />
              <PlanCard
                icon={<Building2 />}
                title="Business"
                level="Nível 3"
                text="Empresas com maior demanda"
                features={[
                  "Tudo do plano Pro",
                  "Relatórios avançados e BI",
                  "Gestão de múltiplas equipes",
                  "Regras de automação personalizadas",
                  "Segurança e auditoria",
                  "Suporte prioritário",
                ]}
              />
              <PlanCard
                icon={<Building2 />}
                title="Enterprise"
                level="Nível 4"
                text="Grandes empresas / necessidades específicas"
                features={[
                  "Tudo do plano Business",
                  "Personalizações avançadas",
                  "Integrações sob demanda",
                  "SLA e suporte dedicado",
                  "Ambiente exclusivo (se necessário)",
                  "Consultoria especializada",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="section-block section-tight scroll-mt-20">
          <div className="site-container">
            <div className="section-heading">
              <h2>Perguntas frequentes</h2>
              <p className="section-sub">Sobre a Trixus.</p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="mx-auto mt-6 max-w-3xl border-t border-border"
            >
              {faqs.map((faq, i) => (
                <AccordionItem value={`faq-${i}`} key={faq.q}>
                  <AccordionTrigger className="py-5 text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-6 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section
          id="contato"
          className="contact-section section-block section-tight bg-subtle scroll-mt-20"
        >
          <div className="site-container">
            <div className="section-heading">
              <h2>Contato</h2>
              <p className="section-sub">Fale com a Trixus</p>
            </div>
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <span className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-card text-primary">
                    <Mail className="size-4" />
                  </span>
                  contato@trixus.com.br
                </span>
                <a
                  href={productUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium transition-colors hover:text-primary"
                >
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-card text-primary">
                    <Globe className="size-4" />
                  </span>
                  chat.trixus.com.br
                </a>
              </div>
              <form
                onSubmit={(event) => handleContactSubmit(event, setContactCooldownSeconds)}
                className="contact-form mx-auto mt-6 w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px opacity-0"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      Nome{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-name"
                      name="nome"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">
                      E-mail{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      placeholder="voce@empresa.com"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="contact-phone">
                      WhatsApp ou telefone{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-phone"
                      name="telefone"
                      type="tel"
                      required
                      minLength={8}
                      maxLength={30}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="contact-message">
                      Mensagem{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="mensagem"
                      required
                      minLength={1}
                      maxLength={5000}
                      rows={4}
                      placeholder="Conte um pouco sobre a sua operação."
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="mt-6 h-12 w-full">
                  Enviar mensagem <ArrowRight />
                </Button>
                {contactCooldownSeconds > 0 && (
                  <p role="alert" className="mt-3 text-center text-sm font-medium text-destructive">
                    Você já enviou uma mensagem. Aguarde {formatCooldown(contactCooldownSeconds)}{" "}
                    para enviar novamente.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppFloat />

      <footer className="footer relative overflow-hidden">
        <div
          aria-hidden
          className="footer-bg absolute inset-0"
          style={{ backgroundImage: `url(${footerBg})` }}
        />
        <div className="relative site-container grid grid-cols-2 gap-x-5 gap-y-7 py-9 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-x-10 lg:py-12">
          <div className="col-span-2 flex flex-col items-center justify-center gap-4 text-center sm:col-span-3 lg:col-span-1">
            <img
              src={fullLogo}
              alt="Trixus"
              width={632}
              height={378}
              className="h-24 w-auto object-contain"
            />
          </div>
          <FooterColumn
            title="Produto"
            items={[
              ["Atendimento", "#produto"],
              ["WhatsApp", "#produto"],
              ["Gestão", "#produto"],
              ["Recursos", "#produto"],
            ]}
          />
          <FooterColumn
            title="Empresa"
            items={[
              ["Sobre", "#inicio"],
              ["Contato", "#contato"],
            ]}
          />
          <FooterColumn title="Legal" items={[["Termos de Uso"], ["Política de Privacidade"]]} />
          <FooterColumn title="Acesso" items={[["Entrar", productUrl]]} />
        </div>
        <div className="relative site-container border-t border-border py-4 text-xs text-muted-foreground">
          © Trixus. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function FeatureRow({
  kicker,
  title,
  text,
  icon,
  points,
  children,
  reverse = false,
}: {
  kicker: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  points: string[];
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="feature-icon">{icon}</div>
        <span className="section-kicker">{kicker}</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">{text}</p>
        <div className="mt-6 space-y-3">
          {points.map((point) => (
            <p key={point} className="flex items-center gap-2 text-sm font-medium">
              <span className="grid size-5 place-items-center rounded-full bg-success-soft">
                <Check className="size-3 text-success" />
              </span>
              {point}
            </p>
          ))}
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

function PlanCard({
  title,
  level,
  text,
  features,
  icon,
  featured = false,
}: {
  title: string;
  level: string;
  text: string;
  features: string[];
  icon: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <article className={`plan-card ${featured ? "is-featured" : ""}`}>
      {featured && <span className="plan-label">Mais escolhido</span>}
      <div className="flex items-center gap-3">
        <div className="plan-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <span className="plan-level">{level}</span>
      <p className="plan-description">{text}</p>
      <div className="plan-divider" />
      <ul>
        {features.map((f) => (
          <li key={f}>
            <Check />
            {f}
          </li>
        ))}
      </ul>
      <Button asChild variant="outline" className="plan-button">
        <a
          href="https://api.whatsapp.com/send/?phone=5562996171414"
          target="_blank"
          rel="noreferrer"
        >
          Falar com a Trixus
        </a>
      </Button>
    </article>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map(([label, href]) => (
          <li key={label}>
            {href ? (
              <a
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const faqs = [
  {
    q: "O que é a Trixus?",
    a: "A Trixus é uma plataforma SaaS para centralizar conversas e organizar a operação de atendimento e relacionamento com clientes.",
  },
  {
    q: "Preciso instalar algum programa?",
    a: "A Trixus é acessada pela internet. A disponibilidade de aplicativos ou recursos específicos pode variar conforme a configuração contratada.",
  },
  {
    q: "Posso organizar atendimentos por equipe?",
    a: "Sim. A plataforma permite estruturar usuários, atendentes, departamentos, filas e transferências de conversas.",
  },
  {
    q: "A Trixus mantém histórico das conversas?",
    a: "Sim. O histórico ajuda a equipe a preservar o contexto dos atendimentos e do relacionamento com cada contato.",
  },
  {
    q: "Posso utilizar mais de uma conexão?",
    a: "A plataforma contempla múltiplas conexões ou instâncias, conforme a configuração da operação.",
  },
  {
    q: "Consigo controlar o acesso dos usuários?",
    a: "Sim. Papéis e permissões ajudam a organizar acessos e separar responsabilidades na operação.",
  },
  {
    q: "Como começo a usar a Trixus?",
    a: "Entre em contato com a equipe Trixus para conhecer a plataforma e avaliar a configuração adequada à sua operação.",
  },
];
