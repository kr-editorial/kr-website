import { FounderCard } from "@/components/brand/founder-card";
import { SpeechPanel } from "@/components/brand/speech-panel";
import { site } from "@/lib/content";

export function FoundersSection() {
  const { about } = site;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        {site.founders.map((founder) => (
          <FounderCard key={founder.name} name={founder.name} role={founder.role} />
        ))}
      </div>

      <article className="mx-auto flex max-w-3xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
        <p>{about.intro}</p>
        {about.rodrigo.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {about.karine.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{about.union}</p>
      </article>

      <SpeechPanel className="mx-auto w-full max-w-3xl">
        <p className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
          {about.fruit}
        </p>
        <p className="mt-3 text-lg text-pretty text-cream/80">{about.together}</p>
      </SpeechPanel>

      <article className="mx-auto flex max-w-3xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
        <p>{about.mission}</p>
        <p>{about.belief}</p>
        <p>{about.commitment}</p>
      </article>
    </section>
  );
}
