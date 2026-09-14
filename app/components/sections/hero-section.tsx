import Image from "next/image";
import { BlobDecoration } from "@/components/brand/blob-decoration";
import { CtaButton } from "@/components/brand/cta-button";
import { PillLabel } from "@/components/brand/pill-label";
import { TripleStripe } from "@/components/brand/triple-stripe";
import { site } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <BlobDecoration position="top-right" color="navy-deep" size="lg" />
      <BlobDecoration position="bottom-left" color="navy-deep" size="md" className="opacity-70" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <PillLabel variant="cream">Serviço editorial completo</PillLabel>
          <h1 className="text-4xl font-bold tracking-tight text-balance text-cream sm:text-5xl lg:text-6xl">
            {site.heroHeadline}
          </h1>
          <p className="max-w-xl text-lg text-pretty text-cream/80 sm:text-xl">
            {site.heroSubtitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <CtaButton href="/contato" variant="inverted" size="lg">
              Solicitar orçamento
            </CtaButton>
            <CtaButton
              href="/servicos"
              variant="primary"
              size="lg"
              className="border border-cream/30 bg-transparent hover:bg-cream/10"
            >
              Conheça os serviços
            </CtaButton>
          </div>
        </div>

        <div className="relative hidden flex-1 items-center justify-center lg:flex">
          <Image
            src="/brand/kr-icon-light.svg"
            alt=""
            width={420}
            height={267}
            priority
            className="opacity-90 drop-shadow-xl"
          />
        </div>

        <TripleStripe className="absolute top-1/2 right-6 hidden -translate-y-1/2 xl:flex" />
      </div>
    </section>
  );
}
