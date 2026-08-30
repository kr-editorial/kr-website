import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type MissionQuoteProps = {
  className?: string;
  children: React.ReactNode;
};

/** Bordered mission statement card (carousel slide 3). */
export function MissionQuote({ className, children }: MissionQuoteProps) {
  return (
    <figure
      className={cn(
        "relative mx-auto max-w-3xl rounded-xl border-2 border-navy-deep/30 bg-card px-8 py-10 text-center shadow-[0_10px_36px_-14px_rgb(44_46_62/0.28)] sm:px-14",
        className,
      )}
    >
      <span className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-navy-deep text-cream">
        <Quote className="size-4" fill="currentColor" strokeWidth={0} />
      </span>
      <blockquote className="text-lg leading-relaxed text-pretty text-navy italic sm:text-xl">
        {children}
      </blockquote>
    </figure>
  );
}
