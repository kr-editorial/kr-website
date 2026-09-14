import { cn } from "@/lib/utils";

type FounderCardProps = {
  name: string;
  role?: string;
  className?: string;
};

export function FounderCard({ name, role, className }: FounderCardProps) {
  return (
    <div className={cn("flex flex-col gap-1 border-l-[3px] border-navy-deep pl-4", className)}>
      <h3 className="text-lg font-bold tracking-wide text-navy uppercase">{name}</h3>
      {role ? (
        <p className="text-sm tracking-widest text-muted-foreground uppercase">{role}</p>
      ) : null}
    </div>
  );
}
