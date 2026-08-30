import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { AudienceSection } from "@/components/sections/audience-section";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { FoundersSection } from "@/components/sections/founders-section";
import { MissionSection } from "@/components/sections/mission-section";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a KR Editorial: quem somos, nossa missão e a filosofia editorial que une sensibilidade literária e rigor acadêmico.",
  alternates: { canonical: "/quem-somos" },
};

export default function QuemSomosPage() {
  return (
    <PageShell
      pill="Edições Literárias"
      title="Quem Somos"
      lede="Uma editora fundada na convicção de que toda boa história merece uma edição à altura."
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Quem Somos" }]}
    >
      <FoundersSection />
      <MissionSection />
      <AudienceSection />
      <CtaBandSection />
    </PageShell>
  );
}
