import { cn } from "@/lib/utils";

type PillLabelProps = {
  variant?: "navy" | "cream";
  className?: string;
  children: React.ReactNode;
};

export function PillLabel({
  variant = "navy",
  className,
  children,
}: PillLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium italic",
        variant === "navy" ? "bg-navy text-cream" : "bg-cream text-navy",
        className,
      )}
    >
      {children}
    </span>
  );
}
