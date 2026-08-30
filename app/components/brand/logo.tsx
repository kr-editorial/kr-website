import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const iconSizes = {
  sm: { width: 50, height: 32 },
  md: { width: 63, height: 40 },
  lg: { width: 94, height: 60 },
};

const nameSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

const taglineSizes = {
  sm: "text-[8px] tracking-[0.22em]",
  md: "text-[9px] tracking-[0.28em]",
  lg: "text-xs tracking-[0.32em]",
};

export function Logo({ variant = "dark", size = "md", className }: LogoProps) {
  const icon =
    variant === "light" ? "/brand/kr-icon-light.svg" : "/brand/kr-icon.svg";
  const { width, height } = iconSizes[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={icon}
        alt=""
        width={width}
        height={height}
        priority
        className="shrink-0"
      />
      <span
        className={cn(
          "flex flex-col leading-tight",
          variant === "light" ? "text-cream" : "text-navy",
        )}
      >
        <span className={cn("font-bold tracking-wide", nameSizes[size])}>
          KR EDITORIAL
        </span>
        <span className={cn("font-light uppercase", taglineSizes[size])}>
          Edições Literárias
        </span>
      </span>
    </span>
  );
}
