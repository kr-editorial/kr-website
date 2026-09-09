"use client";

import { ArrowRight, XIcon } from "lucide-react";
import { BookCover } from "@/components/brand/book-cover";
import { CtaButton } from "@/components/brand/cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAuthorCredits } from "@/lib/content";
import type { Author, Book } from "@/lib/types";

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

function AuthorBlock({ name, author }: { name: string; author?: Author }) {
  const roles = author?.roles.slice(0, 2).join(" · ");
  const bio = author?.bio.length
    ? author.bio
    : [
        `Em breve, uma apresentação de ${name}: trajetória, formação e o que motivou a escrita desta obra.`,
      ];

  return (
    <div className="flex gap-4">
      <div
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-bold text-cream"
      >
        {getInitials(name)}
      </div>
      <div className="min-w-0 space-y-2">
        <div>
          <p className="font-semibold text-navy">{name}</p>
          {roles ? (
            <p className="text-sm text-navy-deep/80">
              {roles}
              {author?.location ? ` · ${author.location}` : ""}
            </p>
          ) : null}
        </div>
        <div className="space-y-2 text-sm leading-relaxed text-pretty text-muted-foreground">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookDialogContent({ book }: { book: Book }) {
  const profiles = getAuthorCredits(book.author);
  const heading = profiles.length > 1 ? "Sobre os autores" : "Sobre o autor";

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
      <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-navy bg-grid-paper-light px-6 py-8 sm:py-10 lg:w-[46%] lg:px-10 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-navy-deep/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-cream/10 blur-3xl"
        />
        <div className="relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[380px] xl:max-w-[400px]">
          <BookCover
            src={book.cover}
            alt={`Capa do livro ${book.title}`}
            priority
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 400px"
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
          <div className="space-y-2">
            <DialogTitle className="text-2xl leading-tight font-bold tracking-tight text-balance text-navy sm:text-3xl lg:text-4xl">
              {book.title}
            </DialogTitle>
            {book.subtitle ? (
              <p className="text-lg font-medium text-pretty text-navy-deep sm:text-xl">
                {book.subtitle}
              </p>
            ) : null}
          </div>

          <DialogDescription className="text-base leading-relaxed text-pretty text-foreground">
            {book.description}
          </DialogDescription>

          <section className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {heading}
            </h3>
            <div className="space-y-6">
              {profiles.map(({ name, author }) => (
                <AuthorBlock key={name} name={name} author={author} />
              ))}
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
