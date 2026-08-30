import { Check } from "lucide-react";
import { PillLabel } from "@/components/brand/pill-label";
import { serviceIcons } from "@/lib/icons";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-navy/15 bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {Icon ? (
          <span className="flex size-11 items-center justify-center rounded-lg bg-navy text-cream">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
        ) : null}
        <PillLabel className="hidden sm:inline-flex">{service.pill}</PillLabel>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-navy">{service.title}</h3>
        <p className="text-muted-foreground">{service.description}</p>
      </div>
      <ul className="mt-auto grid gap-2">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <Check
              className="mt-0.5 size-4 shrink-0 text-navy-deep"
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
