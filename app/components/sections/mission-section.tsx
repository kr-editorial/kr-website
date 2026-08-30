import { MissionQuote } from "@/components/brand/mission-quote";
import { site } from "@/lib/content";

export function MissionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <MissionQuote>
        {site.mission}
        <footer className="mt-4 text-sm font-semibold tracking-widest text-navy-deep not-italic uppercase">
          — {site.name}
        </footer>
      </MissionQuote>
    </section>
  );
}
