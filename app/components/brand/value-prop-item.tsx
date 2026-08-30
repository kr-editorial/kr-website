import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ValuePropItemProps = {
  icon: LucideIcon;
  className?: string;
  children: React.ReactNode;
};

export function ValuePropItem({
  icon: Icon,
  className,
  children,
}: ValuePropItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-navy/10 bg-card/80 p-5 shadow-sm",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-cream">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="text-base font-semibold text-navy sm:text-lg">
        {children}
      </span>
    </div>
  );
}
