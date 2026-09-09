"use client";

import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/brand/book-cover";
import { BookDialogContent } from "@/components/brand/book-dialog";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Book } from "@/lib/types";

const badgeLabels: Record<NonNullable<Book["badge"]>, string> = {
  lançamento: "Lançamento",
  novo: "Novo",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <Dialog>
      <DialogTrigger className="group relative flex w-full flex-col gap-3 rounded-lg p-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-navy-deep/50">
        <div className="relative w-full">
          <BookCover
            src={book.cover}
            alt={`Capa do livro ${book.title}`}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl"
          />
          {book.badge ? (
            <Badge className="absolute top-2 left-2 bg-navy-deep text-cream shadow-sm">
              {badgeLabels[book.badge]}
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-col gap-0.5 px-1">
          <span className="leading-snug font-semibold text-navy">
            {book.title}
          </span>
          {book.subtitle ? (
            <span className="text-sm text-pretty text-navy/65">
              {book.subtitle}
            </span>
          ) : null}
          <span className="text-sm text-muted-foreground">{book.author}</span>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-navy-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            Saiba mais
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </DialogTrigger>
      <BookDialogContent book={book} />
    </Dialog>
  );
}
