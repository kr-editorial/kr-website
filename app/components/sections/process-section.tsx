import { BookOpen, FileText, LayoutTemplate, PenLine } from "lucide-react";
import { GridTexture } from "@/components/brand/grid-texture";
import { ProcessStep } from "@/components/brand/process-step";
import { SectionHeading } from "@/components/brand/section-heading";
import { site } from "@/lib/content";

const stepIcons = [FileText, PenLine, LayoutTemplate, BookOpen];

export function ProcessSection() {
  return (
    <GridTexture>
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          pill="Como funciona"
          title="Do rascunho à publicação"
          subtitle="Um processo claro e acompanhado de perto, para que você saiba exatamente em que etapa sua obra está."
        />
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden
            className="absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dashed border-navy/20 lg:block"
          />
          {site.processSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              index={index + 1}
              title={step.title}
              description={step.description}
              icon={stepIcons[index]}
              className="relative"
            />
          ))}
        </div>
      </section>
    </GridTexture>
  );
}
