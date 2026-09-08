import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetailSection } from "@/components/sections/book-detail-section";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { RelatedBooksSection } from "@/components/sections/related-books-section";
import { books, getBookBySlug, site } from "@/lib/content";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};

  return {
    title: `${book.title} — ${book.author}`,
    description: book.excerpt,
    alternates: { canonical: `/portfolio/${book.slug}` },
    openGraph: {
      title: `${book.title} — ${book.author}`,
      description: book.excerpt,
      images: [{ url: book.cover, width: 1080, height: 1617 }],
    },
  };
}

export default async function BookPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    bookFormat:
      book.format === "ebook"
        ? "https://schema.org/EBook"
        : "https://schema.org/Paperback",
    publisher: { "@type": "Organization", name: site.name },
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.pages ? { numberOfPages: book.pages } : {}),
    ...(book.year ? { datePublished: String(book.year) } : {}),
    image: `${site.url}${book.cover}`,
    description: book.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookDetailSection book={book} />
      <RelatedBooksSection book={book} />
      <CtaBandSection />
    </>
  );
}
