import { BlobDecoration } from "@/components/brand/blob-decoration";
import { CtaButton } from "@/components/brand/cta-button";
import { TripleStripe } from "@/components/brand/triple-stripe";
import { site } from "@/lib/content";

export function CtaBandSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <BlobDecoration position="top-left" color="cream" size="sm" className="opacity-10" />
      <TripleStripe className="absolute top-1/2 right-5 hidden -translate-y-1/2 lg:flex" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-cream sm:text-4xl">
          Pronto para publicar a sua obra?
        </h2>
        <p className="max-w-xl text-lg text-pretty text-cream/80">{site.heroCta}</p>
        <CtaButton href="/contato" variant="inverted" size="lg">
          Solicitar orçamento
        </CtaButton>
        <p className="mt-2 text-xs font-medium tracking-[0.25em] text-cream/60 uppercase">
          {site.founders.map((founder) => founder.name).join(" · ")}
        </p>
      </div>
    </section>
  );
}
