import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trixus | Atendimento e relacionamento em um só lugar" },
      { name: "description", content: "Centralize conversas, organize sua equipe e acompanhe sua operação de atendimento com a Trixus." },
      { property: "og:title", content: "Trixus | Atendimento e relacionamento em um só lugar" },
      { property: "og:description", content: "Centralize conversas, organize sua equipe e acompanhe sua operação de atendimento com a Trixus." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.trixus.com.br/" },
      { property: "og:site_name", content: "Trixus" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: "https://www.trixus.com.br/trixus-share.png" },
      { property: "og:image:secure_url", content: "https://www.trixus.com.br/trixus-share.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "376" },
      { property: "og:image:height", content: "237" },
      { property: "og:image:alt", content: "Logo da Trixus" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Trixus | Atendimento e relacionamento em um só lugar" },
      { name: "twitter:description", content: "Centralize conversas, organize sua equipe e acompanhe sua operação de atendimento com a Trixus." },
      { name: "twitter:image", content: "https://www.trixus.com.br/trixus-share.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.trixus.com.br/" }],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
