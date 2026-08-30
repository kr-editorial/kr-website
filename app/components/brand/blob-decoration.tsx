import { cn } from "@/lib/utils";

type BlobDecorationProps = {
  position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  color?: "navy" | "navy-deep" | "cream";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const positionClasses = {
  "top-right": "-top-1/4 -right-1/6",
  "bottom-left": "-bottom-1/4 -left-1/6",
  "top-left": "-top-1/4 -left-1/6",
  "bottom-right": "-bottom-1/4 -right-1/6",
};

const colorClasses = {
  navy: "bg-navy",
  "navy-deep": "bg-navy-deep",
  cream: "bg-cream",
};

const sizeClasses = {
  sm: "size-48 sm:size-64",
  md: "size-72 sm:size-96",
  lg: "size-96 sm:size-[34rem]",
};

/**
 * Organic blob bleeding off a section edge (carousel slide 1).
 * Parent must be `relative overflow-hidden`.
 */
export function BlobDecoration({
  position,
  color = "navy-deep",
  size = "md",
  className,
}: BlobDecorationProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute",
        positionClasses[position],
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
      style={{ borderRadius: "38% 62% 55% 45% / 42% 38% 62% 58%" }}
    />
  );
}
