import {
  Building2,
  Church,
  GraduationCap,
  MicVocal,
  Microscope,
  type LucideIcon,
} from "lucide-react";
import { BlobDecoration } from "@/components/brand/blob-decoration";
import { SectionHeading } from "@/components/brand/section-heading";
import { site } from "@/lib/content";

const audienceIcons: Record<string, LucideIcon> = {
  Pregadores: MicVocal,
  Acadêmicos: GraduationCap,
  Pastores: Church,
  Pesquisadores: Microscope,
  Instituições: Building2,
};

export function AudienceSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <BlobDecoration position="top-left" color="navy-deep" size="md" className="opacity-60" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          tone="dark"
          pill="Para quem trabalhamos"
          title="Ajudamos a dar vida à sua mensagem!"
          subtitle="Pregadores, Pastores, Acadêmicos, Pesquisadores, Teólogos e Denominações em todo o Brasil"
        />
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {site.audiences.map((audience) => {
            const Icon = audienceIcons[audience];
            return (
              <li
                key={audience}
                className="flex items-center gap-2.5 rounded-full border border-cream/20 bg-cream/5 px-5 py-2.5 text-sm font-medium text-cream sm:text-base"
              >
                {Icon ? <Icon className="size-4.5" strokeWidth={1.75} /> : null}
                {audience}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
