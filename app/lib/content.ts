import authorsData from "@/content/authors.json";
import booksData from "@/content/books.json";
import servicesData from "@/content/services.json";
import siteData from "@/content/site.json";
import type { Author, Book, Service, SiteContent } from "@/lib/types";

export const site = siteData as SiteContent;

export const services = servicesData as Service[];

export const books = booksData as Book[];

export const authors = authorsData as Author[];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorByName(name: string): Author | undefined {
  const needle = name.trim().toLocaleLowerCase("pt-BR");
  return authors.find(
    (author) =>
      author.name.toLocaleLowerCase("pt-BR") === needle ||
      author.aliases.some((alias) => alias.toLocaleLowerCase("pt-BR") === needle),
  );
}

export function getAuthorCredits(credit: string): {
  name: string;
  author?: Author;
}[] {
  const exact = getAuthorByName(credit);
  if (exact) return [{ name: exact.name, author: exact }];

  const parts = credit
    .split(/\s+e\s+|,\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length > 1) {
    return parts.map((part) => {
      const author = getAuthorByName(part);
      return { name: author?.name ?? part, author };
    });
  }

  return [{ name: credit }];
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBooks(limit = 4): Book[] {
  return books.filter((book) => book.featured).slice(0, limit);
}

export function getRelatedBooks(book: Book): Book[] {
  if (!book.relatedSlugs?.length) return [];
  return book.relatedSlugs
    .map((slug) => getBookBySlug(slug))
    .filter((related): related is Book => Boolean(related));
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const book of books) {
    for (const category of book.categories) categories.add(category);
  }
  return [...categories].sort();
}

export const categoryLabels: Record<string, string> = {
  academico: "Acadêmico",
  escrita: "Escrita",
  guias: "Guias",
  institucional: "Institucional",
  literario: "Literário",
  religioso: "Religioso",
};
