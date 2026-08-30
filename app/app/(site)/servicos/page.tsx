import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesDetailSection } from "@/components/sections/services-detail-section";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Editoração, diagramação, revisão textual, normalização ABNT e padronização editorial para livros, e-books e obras acadêmicas.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <PageShell
      pill="Serviço editorial completo"
      title="Serviços"
      lede="Da preparação do original à arte final: tudo o que sua obra precisa para ser publicada com qualidade profissional."
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Serviços" }]}
    >
      <ServicesDetailSection />
      <ProcessSection />
      <CtaBandSection />
    </PageShell>
  );
}
