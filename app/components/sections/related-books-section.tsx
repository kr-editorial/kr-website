import { BookCard } from "@/components/brand/book-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getRelatedBooks } from "@/lib/content";
import type { Book } from "@/lib/types";

export function RelatedBooksSection({ book }: { book: Book }) {
  const related = getRelatedBooks(book);
  if (!related.length) return null;

  return (
    <section className="bg-cream-warm">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6">
        <SectionHeading align="left" title="Títulos relacionados" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {related.map((item) => (
            <BookCard key={item.slug} book={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
