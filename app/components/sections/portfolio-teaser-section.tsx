import { ArrowRight } from "lucide-react";
import { BookCard } from "@/components/brand/book-card";
import { CtaButton } from "@/components/brand/cta-button";
import { SectionHeading } from "@/components/brand/section-heading";
import { getFeaturedBooks } from "@/lib/content";

export function PortfolioTeaserSection() {
  const featured = getFeaturedBooks(4);

  return (
    <section className="bg-cream-warm">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          pill="Livros publicados"
          title="Obras que ganharam vida com a KR"
          subtitle="Uma seleção de livros que passaram pelas nossas mãos — da revisão à publicação."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
        <div className="flex justify-center">
          <CtaButton href="/portfolio" variant="outline">
            Ver todos os livros
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
