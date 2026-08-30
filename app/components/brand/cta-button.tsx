import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  variant?: "primary" | "inverted" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  primary:
    "bg-navy text-cream hover:bg-navy-deep focus-visible:ring-navy-deep/40",
  inverted:
    "bg-cream text-navy hover:bg-white focus-visible:ring-cream/50",
  outline:
    "border border-navy/30 bg-transparent text-navy hover:bg-navy hover:text-cream",
};

export function CtaButton({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
}: CtaButtonProps) {
  return (
    <Button
      render={<Link href={href} />}
      size={size}
      className={cn(
        "font-semibold shadow-sm transition-colors",
        variantClasses[variant],
        size === "lg" && "h-12 px-8 text-base",
        className,
      )}
    >
      {children}
    </Button>
  );
}
