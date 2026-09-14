import { describe, expect, it, vi } from "vitest";
import { authors, books, makeBook } from "@/tests/fixtures";
import {
  getAllCategories,
  getAuthorByName,
  getAuthorBySlug,
  getAuthorCredits,
  getBookBySlug,
  getFeaturedBooks,
  getRelatedBooks,
} from "@/lib/content";

vi.mock("@/content/authors.json", async () => ({
  default: (await import("@/tests/fixtures")).authors,
}));
vi.mock("@/content/books.json", async () => ({
  default: (await import("@/tests/fixtures")).books,
}));

describe("author lookup", () => {
  it("finds an author by slug", () => {
    expect(getAuthorBySlug("jose-silva")).toEqual(authors[0]);
  });

  it.each(["  JOSÉ SILVA  ", "  j. SILVA  "])(
    "resolves names and aliases ignoring case and outer whitespace: %s",
    (name) => {
      expect(getAuthorByName(name)).toEqual(authors[0]);
    },
  );

  it("returns undefined for unknown authors", () => {
    expect(getAuthorBySlug("missing")).toBeUndefined();
    expect(getAuthorByName("Unknown Author")).toBeUndefined();
  });
});

describe("author credits", () => {
  it("replaces an alias with the canonical name and profile", () => {
    expect(getAuthorCredits("J. Silva")).toEqual([
      { name: "José Silva", author: authors[0] },
    ]);
  });

  it.each(["Maria e Silva", "M. e Silva"])(
    "matches a full name or alias before splitting on 'e': %s",
    (credit) => {
      expect(getAuthorCredits(credit)).toEqual([
        { name: "Maria e Silva", author: authors[2] },
      ]);
    },
  );

  it("splits mixed separators, preserves order, and keeps unknown coauthors", () => {
    expect(getAuthorCredits(" J. Silva,  Ana Costa e Autor convidado ")).toEqual([
      { name: "José Silva", author: authors[0] },
      { name: "Ana Costa", author: authors[1] },
      { name: "Autor convidado", author: undefined },
    ]);
  });

  it("keeps an unknown single credit without inventing a profile", () => {
    expect(getAuthorCredits("Autor convidado")).toEqual([
      { name: "Autor convidado" },
    ]);
  });
});

describe("book catalog", () => {
  it("looks up a book by slug and returns undefined for a missing book", () => {
    expect(getBookBySlug("second")).toEqual(books[2]);
    expect(getBookBySlug("missing")).toBeUndefined();
  });

  it("returns the first four featured books in catalog order by default", () => {
    expect(getFeaturedBooks().map((book) => book.slug)).toEqual([
      "first", "second", "third", "fourth",
    ]);
  });

  it.each<[number, string[]]>([
    [0, []],
    [2, ["first", "second"]],
    [10, ["first", "second", "third", "fourth", "fifth"]],
  ])("respects the featured limit %i", (limit, expected) => {
    expect(getFeaturedBooks(limit).map((book) => book.slug)).toEqual(expected);
  });

  it("resolves related books in requested order and skips missing slugs", () => {
    const book = makeBook({ relatedSlugs: ["second", "missing", "first"] });
    expect(getRelatedBooks(book)).toEqual([books[2], books[1]]);
  });

  it("returns no related books when none are configured or found", () => {
    expect(getRelatedBooks(makeBook())).toEqual([]);
    expect(getRelatedBooks(makeBook({ relatedSlugs: [] }))).toEqual([]);
    expect(getRelatedBooks(makeBook({ relatedSlugs: ["missing"] }))).toEqual([]);
  });

  it("returns sorted, unique categories across books", () => {
    expect(getAllCategories()).toEqual(["academico", "literario", "religioso"]);
  });
});
