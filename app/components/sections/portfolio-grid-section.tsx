import { BookCard } from "@/components/brand/book-card";
import type { Book } from "@/lib/types";

type PortfolioGridSectionProps = {
  books: Book[];
};

export function PortfolioGridSection({ books }: PortfolioGridSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </section>
  );
}
