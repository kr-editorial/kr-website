import type { Author, Book } from "@/lib/types";

export const authors: Author[] = [
  {
    slug: "jose-silva",
    name: "José Silva",
    aliases: ["J. Silva"],
    roles: ["Escritor", "Professor", "Editor"],
    location: "Curitiba/PR",
    bio: ["José escreve sobre literatura.", "Também ensina escrita."],
  },
  {
    slug: "ana-costa",
    name: "Ana Costa",
    aliases: [],
    roles: [],
    bio: [],
  },
  {
    slug: "maria-silva",
    name: "Maria e Silva",
    aliases: ["M. e Silva"],
    roles: [],
    bio: [],
  },
];

export function makeBook(overrides: Partial<Book> = {}): Book {
  return {
    slug: "primeiro-livro",
    title: "Primeiro livro",
    author: "J. Silva",
    cover: "/covers/primeiro-livro.webp",
    format: "livro",
    categories: ["religioso", "literario"],
    excerpt: "Uma breve apresentação.",
    description: "Uma descrição completa do primeiro livro.",
    ...overrides,
  };
}

export const books: Book[] = [
  makeBook({ slug: "unfeatured", featured: false }),
  makeBook({ slug: "first", featured: true }),
  makeBook({ slug: "second", featured: true, categories: ["academico"] }),
  makeBook({ slug: "third", featured: true }),
  makeBook({ slug: "fourth", featured: true }),
  makeBook({ slug: "fifth", featured: true, categories: [] }),
];
