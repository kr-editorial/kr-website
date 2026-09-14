import Image from "next/image";
import { BlobDecoration } from "@/components/brand/blob-decoration";
import { FounderCard } from "@/components/brand/founder-card";
import { PillLabel } from "@/components/brand/pill-label";
import { SpeechPanel } from "@/components/brand/speech-panel";
import { site } from "@/lib/content";

export function FoundersSection() {
  const { about, founders } = site;

  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 overflow-x-clip px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <figure className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:mx-0 lg:max-w-none">
        <BlobDecoration
          position="bottom-left"
          color="navy-deep"
          size="sm"
          className="-bottom-12 -left-14 opacity-80"
        />
        <div className="relative rounded-2xl bg-card p-2 shadow-[0_28px_64px_-24px_rgb(44_46_62/0.5)] ring-1 ring-navy/10 sm:p-2.5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src={about.photo}
                alt={about.photoAlt}
                fill
                priority
                unoptimized
                className="object-cover"
              />
          </div>
        </div>
      </figure>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-8">
          <PillLabel>Fundadores</PillLabel>
          <div className="grid w-full gap-6 sm:grid-cols-2">
            {founders.map((founder) => (
              <FounderCard key={founder.name} name={founder.name} role={founder.role} />
            ))}
          </div>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            {about.intro}
          </p>
        </div>

        <article className="flex flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          {about.rodrigo.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {about.karine.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{about.union}</p>
        </article>

        <SpeechPanel>
          <p className="text-xl font-bold tracking-tight text-balance sm:text-2xl">
            {about.fruit}
          </p>
          <p className="mt-3 text-lg text-pretty text-cream/80">{about.together}</p>
        </SpeechPanel>

        <article className="flex flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          <p>{about.mission}</p>
          <p>{about.belief}</p>
          <p>{about.commitment}</p>
        </article>
      </div>
    </section>
  );
}
