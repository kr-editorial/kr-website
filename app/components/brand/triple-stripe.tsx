import { cn } from "@/lib/utils";

type TripleStripeProps = {
  orientation?: "vertical" | "horizontal";
  color?: "cream" | "navy";
  className?: string;
};

/** Three-stripe brand accent (carousel slide 5). */
export function TripleStripe({
  orientation = "vertical",
  color = "cream",
  className,
}: TripleStripeProps) {
  const stripe =
    orientation === "vertical" ? "h-20 w-[3px] sm:h-28" : "h-[3px] w-20 sm:w-28";

  return (
    <div
      aria-hidden
      className={cn(
        "flex gap-1.5",
        orientation === "vertical" ? "flex-row" : "flex-col",
        className,
      )}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={cn(
            "rounded-full",
            stripe,
            color === "cream" ? "bg-cream/80" : "bg-navy/70",
          )}
        />
      ))}
    </div>
  );
}
