import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessStepProps = {
  index: number;
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

export function ProcessStep({
  index,
  title,
  description,
  icon: Icon,
  className,
}: ProcessStepProps) {
  return (
    <div className={cn("relative flex flex-col items-center gap-3 text-center", className)}>
      <span className="flex size-14 items-center justify-center rounded-full bg-navy text-cream shadow-md">
        {Icon ? (
          <Icon className="size-6" strokeWidth={1.75} />
        ) : (
          <span className="text-xl font-bold">{index}</span>
        )}
      </span>
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-widest text-navy-deep uppercase">
          Etapa {index}
        </span>
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <p className="max-w-[16rem] text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
