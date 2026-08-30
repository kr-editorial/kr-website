import { cn } from "@/lib/utils";

type GridTextureProps = {
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
};

/** Wrapper applying the brand graph-paper texture (carousel slides 2 and 4). */
export function GridTexture({
  tone = "light",
  className,
  children,
}: GridTextureProps) {
  return (
    <div
      className={cn(
        tone === "light" ? "bg-grid-paper" : "bg-grid-paper-light",
        className,
      )}
    >
      {children}
    </div>
  );
}
