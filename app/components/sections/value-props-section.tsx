import { AlignLeft, Award, BadgeCheck, GraduationCap } from "lucide-react";
import { GridTexture } from "@/components/brand/grid-texture";
import { SectionHeading } from "@/components/brand/section-heading";
import { ValuePropItem } from "@/components/brand/value-prop-item";
import { site } from "@/lib/content";

const valuePropIcons = [Award, GraduationCap, BadgeCheck, AlignLeft];

export function ValuePropsSection() {
  return (
    <GridTexture>
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          pill="Ideal para quem busca:"
          title="Qualidade editorial do início ao fim"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {site.valueProps.map((prop, index) => (
            <ValuePropItem key={prop} icon={valuePropIcons[index] ?? Award}>
              {prop}
            </ValuePropItem>
          ))}
        </div>
      </section>
    </GridTexture>
  );
}
