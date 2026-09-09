"use client";

import { ArrowRight, XIcon } from "lucide-react";
import { BookCover } from "@/components/brand/book-cover";
import { CtaButton } from "@/components/brand/cta-button";
import { SpecList } from "@/components/brand/spec-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryLabels } from "@/lib/content";
import type { Book } from "@/lib/types";

const PLACEHOLDER = "A confirmar";

const badgeLabels: Record<NonNullable<Book["badge"]>, string> = {
  lançamento: "Lançamento",
  novo: "Novo",
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function BookDialogContent({ book }: { book: Book }) {
  const formatLabel = book.format === "ebook" ? "E-book" : "Livro impresso";

  const specs = [
    { label: "Formato", value: formatLabel },
    { label: "Ano", value: book.year ? String(book.year) : PLACEHOLDER },
    { label: "Páginas", value: book.pages ? String(book.pages) : PLACEHOLDER },
    { label: "ISBN", value: book.isbn ?? PLACEHOLDER },
  ];

  const authorBio =
    book.authorBio ??
    `Em breve, uma apresentação de ${book.author}: trajetória, formação e o que motivou a escrita desta obra.`;

  return (
    <DialogContent
      showCloseButton={false}
      aria-describedby={undefined}
      className="flex max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-6xl flex-col gap-0 overflow-y-auto p-0 ring-navy/15 sm:max-w-6xl lg:h-[min(88dvh,52rem)] lg:max-h-none lg:flex-row lg:overflow-hidden"
    >
      <DialogClose
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 z-10 rounded-full text-cream hover:bg-cream/15 hover:text-cream lg:text-navy lg:hover:bg-navy/10 lg:hover:text-navy"
          />
        }
      >
        <XIcon />
        <span className="sr-only">Fechar</span>
      </DialogClose>

      {/* Cover panel */}
      <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-navy bg-grid-paper-light px-6 py-8 sm:py-10 lg:w-[42%] lg:px-12 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-navy-deep/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-cream/10 blur-3xl"
        />
        <div className="relative w-full max-w-[160px] sm:max-w-[200px] lg:max-w-[300px] xl:max-w-[320px]">
          <BookCover
            src={book.cover}
            alt={`Capa do livro ${book.title}`}
            priority
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 320px"
            className="shadow-2xl shadow-black/40 ring-cream/15"
          />
          {book.badge ? (
            <Badge className="absolute top-2 left-2 bg-cream text-navy shadow-sm">
              {badgeLabels[book.badge]}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Info panel */}
      <div className="flex min-h-0 flex-1 flex-col lg:overflow-y-auto">
        <div className="flex flex-col gap-7 p-6 sm:p-8 lg:p-10 lg:pr-14">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-navy text-cream">{formatLabel}</Badge>
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
            <DialogTitle className="text-2xl leading-tight font-bold tracking-tight text-balance text-navy sm:text-3xl lg:text-4xl">
              {book.title}
            </DialogTitle>
            {book.subtitle ? (
              <p className="text-base text-pretty text-navy/70 sm:text-lg">
                {book.subtitle}
              </p>
            ) : null}
            <p className="text-base text-muted-foreground">{book.author}</p>
          </div>

          <DialogDescription className="text-base leading-relaxed text-pretty text-foreground">
            {book.description}
          </DialogDescription>

          <SpecList items={specs} />

          <section className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Sobre o autor
            </h3>
            <div className="flex gap-4">
              <div
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-bold text-cream"
              >
                {getInitials(book.author)}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-navy">{book.author}</p>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {authorBio}
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-col items-start gap-3 rounded-xl border border-navy/15 bg-cream-warm p-5 sm:p-6">
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
    </DialogContent>
  );
}
