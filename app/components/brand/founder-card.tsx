import { cn } from "@/lib/utils";

type FounderCardProps = {
  name: string;
  role?: string;
  className?: string;
};

function initials(name: string): string {
  const parts = name.split(" ").filter((part) => part.length > 2 || /^[A-Z]\.?$/.test(part));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

export function FounderCard({ name, role, className }: FounderCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border border-navy/15 bg-card p-8 text-center shadow-sm",
        className,
      )}
    >
      <span className="flex size-20 items-center justify-center rounded-full bg-navy text-2xl font-bold text-cream">
        {initials(name)}
      </span>
      <div>
        <h3 className="text-lg font-bold tracking-wide text-navy uppercase">
          {name}
        </h3>
        {role ? (
          <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
            {role}
          </p>
        ) : null}
      </div>
    </div>
  );
}
