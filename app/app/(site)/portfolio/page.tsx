import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { PortfolioGridSection } from "@/components/sections/portfolio-grid-section";
import { books } from "@/lib/content";

export const metadata: Metadata = {
  title: "Livros publicados",
  description:
    "Obras publicadas com o cuidado editorial da KR Editorial: livros impressos e e-books de autores, acadêmicos e instituições.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <PageShell
      pill="Livros publicados"
      title="Obras que ganharam vida com a KR"
      lede="Cada obra publicada passou pelo nosso processo completo: revisão, diagramação, normalização e publicação."
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Livros publicados" }]}
    >
      <PortfolioGridSection books={books} />
      <CtaBandSection />
    </PageShell>
  );
}
