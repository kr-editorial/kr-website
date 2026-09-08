import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookCover } from "@/components/brand/book-cover";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/types";

const badgeLabels: Record<NonNullable<Book["badge"]>, string> = {
  lançamento: "Lançamento",
  novo: "Novo",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/portfolio/${book.slug}`}
      className="group relative flex flex-col gap-3 rounded-lg p-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-navy-deep/50"
    >
      <div className="relative">
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
        <h3 className="leading-snug font-semibold text-navy">{book.title}</h3>
        {book.subtitle ? (
          <p className="text-sm text-pretty text-navy/65">{book.subtitle}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-navy-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Saiba mais
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
