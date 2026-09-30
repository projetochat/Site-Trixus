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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.trixus.com.br/" }],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
