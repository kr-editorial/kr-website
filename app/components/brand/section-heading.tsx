import { PillLabel } from "@/components/brand/pill-label";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  pill?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  pill,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {pill ? (
        <PillLabel variant={tone === "dark" ? "cream" : "navy"}>
          {pill}
        </PillLabel>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          tone === "dark" ? "text-cream" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-lg text-pretty",
            tone === "dark" ? "text-cream/80" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
