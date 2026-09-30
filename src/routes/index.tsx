import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trixus | Soluções que conectam." },
      { name: "description", content: "Plataforma de multi-atendimento para Whatsapp" },
      { property: "og:title", content: "Trixus | Soluções que conectam." },
      { property: "og:description", content: "Plataforma de multi-atendimento para Whatsapp" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.trixus.com.br/" },
      { property: "og:site_name", content: "Trixus" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: "https://www.trixus.com.br/trixus-share.png" },
      { property: "og:image:secure_url", content: "https://www.trixus.com.br/trixus-share.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1616" },
      { property: "og:image:height", content: "973" },
      { property: "og:image:alt", content: "Logo da Trixus" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Trixus | Soluções que conectam." },
      { name: "twitter:description", content: "Plataforma de multi-atendimento para Whatsapp" },
      { name: "twitter:image", content: "https://www.trixus.com.br/trixus-share.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.trixus.com.br/" }],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
