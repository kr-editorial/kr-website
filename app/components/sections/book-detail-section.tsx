import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/brand/book-cover";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { CtaButton } from "@/components/brand/cta-button";
import { SpecList } from "@/components/brand/spec-list";
import { Badge } from "@/components/ui/badge";
import { categoryLabels } from "@/lib/content";
import type { Book } from "@/lib/types";

export function BookDetailSection({ book }: { book: Book }) {
  const specs = [
    book.isbn ? { label: "ISBN", value: book.isbn } : null,
    book.pages ? { label: "Páginas", value: String(book.pages) } : null,
    book.year ? { label: "Ano", value: String(book.year) } : null,
    {
      label: "Formato",
      value: book.format === "ebook" ? "E-book" : "Livro impresso",
    },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec));

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        className="mb-8"
        items={[
          { label: "Início", href: "/" },
          { label: "Livros publicados", href: "/portfolio" },
          { label: book.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <BookCover
          src={book.cover}
          alt={`Capa do livro ${book.title}`}
          priority
          sizes="(max-width: 1024px) 70vw, 320px"
          className="mx-auto w-full max-w-[280px] lg:max-w-none"
        />

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-navy text-cream">
                {book.format === "ebook" ? "E-book" : "Livro impresso"}
              </Badge>
              {book.categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-navy/25 text-navy"
                >
                  {categoryLabels[category] ?? category}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-balance text-navy sm:text-4xl">
              {book.title}
            </h1>
            {book.subtitle ? (
              <p className="text-lg text-pretty text-navy/70">{book.subtitle}</p>
            ) : null}
            <p className="text-lg text-muted-foreground">{book.author}</p>
          </div>

          <p className="max-w-2xl leading-relaxed text-pretty">
            {book.description}
          </p>

          <SpecList items={specs} className="max-w-sm" />

          <div className="mt-2 flex flex-col items-start gap-3 rounded-xl border border-navy/15 bg-cream-warm p-6">
            <p className="font-medium text-navy">
              Quer publicar uma obra como esta?
            </p>
            <CtaButton href={`/contato?livro=${book.slug}`} size="lg">
              Solicitar orçamento
              <ArrowRight className="size-4" />
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
