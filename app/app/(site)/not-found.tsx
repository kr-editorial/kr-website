import { BookX } from "lucide-react";
import { CtaButton } from "@/components/brand/cta-button";
import { GridTexture } from "@/components/brand/grid-texture";

export default function NotFound() {
  return (
    <GridTexture>
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-28 text-center sm:px-6">
        <span className="flex size-16 items-center justify-center rounded-full bg-navy text-cream">
          <BookX className="size-7" strokeWidth={1.5} />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          O capítulo que você procura não está neste livro. Que tal voltar ao
          início da história?
        </p>
        <CtaButton href="/" size="lg">
          Voltar ao início
        </CtaButton>
      </section>
    </GridTexture>
  );
}
