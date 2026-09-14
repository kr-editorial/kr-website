import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/brand/cta-button";
import { SectionHeading } from "@/components/brand/section-heading";
import { SpeechPanel } from "@/components/brand/speech-panel";
import { serviceIcons } from "@/lib/icons";
import { services } from "@/lib/content";

export function ServicesOverviewSection() {
  return (
    <section className="bg-cream-warm">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            align="left"
            pill="Serviço editorial completo"
            title="Editoração, diagramação e publicação"
            subtitle="Cuidamos de cada etapa com excelência técnica e respeito à identidade do autor."
          />
          <CtaButton href="/servicos" variant="outline">
            Conheça todos os serviços
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>

        <SpeechPanel>
          <ul className="space-y-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <li key={service.slug} className="flex items-start gap-3.5">
                  {Icon ? (
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-cream/15">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <div>
                    <p className="font-semibold">{service.title}</p>
                    <p className="text-sm text-cream/70">{service.pill}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </SpeechPanel>
      </div>
    </section>
  );
}
