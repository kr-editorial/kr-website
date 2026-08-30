import { cn } from "@/lib/utils";

type SpecItem = {
  label: string;
  value: string;
};

type SpecListProps = {
  items: SpecItem[];
  className?: string;
};

export function SpecList({ items, className }: SpecListProps) {
  if (!items.length) return null;

  return (
    <dl className={cn("divide-y divide-border rounded-lg border border-navy/10 bg-card/60", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline justify-between gap-4 px-4 py-2.5"
        >
          <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {item.label}
          </dt>
          <dd className="text-sm font-medium text-navy">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
