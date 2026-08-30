import { cn } from "@/lib/utils";

type SpeechPanelProps = {
  className?: string;
  children: React.ReactNode;
};

/** Navy speech-bubble panel with white content (carousel slide 3). */
export function SpeechPanel({ className, children }: SpeechPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-2xl bg-navy-deep p-8 text-cream shadow-lg sm:p-10">
        {children}
      </div>
      <span
        aria-hidden
        className="absolute -bottom-3 left-12 size-7 rotate-45 rounded-sm bg-navy-deep"
      />
    </div>
  );
}
