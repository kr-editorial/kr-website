import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { AudienceSection } from "@/components/sections/audience-section";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { FoundersSection } from "@/components/sections/founders-section";
import { MissionSection } from "@/components/sections/mission-section";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A KR Editorial nasceu da união entre propósito, conhecimento e um sonho: servir a Deus por meio da literatura cristã. Conheça Rodrigo e Karine Lazzaretti.",
  alternates: { canonical: "/quem-somos" },
};

export default function QuemSomosPage() {
  return (
    <PageShell
      pill="Edições Literárias"
      title="Quem Somos"
      lede="Rodrigo Lazzaretti e Karine Lazzaretti"
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Quem Somos" }]}
    >
      <FoundersSection />
      <MissionSection />
      <AudienceSection />
      <CtaBandSection />
    </PageShell>
  );
}
