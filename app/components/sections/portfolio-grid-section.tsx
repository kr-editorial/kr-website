"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookX } from "lucide-react";
import { BookCard } from "@/components/brand/book-card";
import { categoryLabels } from "@/lib/content";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

const formatOptions = [
  { value: "todos", label: "Todos" },
  { value: "livro", label: "Livro impresso" },
  { value: "ebook", label: "E-book" },
] as const;

type PortfolioGridSectionProps = {
  books: Book[];
  categories: string[];
};

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-navy-deep/50",
        active
          ? "border-navy bg-navy text-cream"
          : "border-navy/25 bg-transparent text-navy hover:bg-navy/5",
      )}
    >
      {children}
    </button>
  );
}

export function PortfolioGridSection({
  books,
  categories,
}: PortfolioGridSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const format = searchParams.get("formato") ?? "todos";
  const category = searchParams.get("categoria") ?? "todas";

  const setFilter = useCallback(
    (key: "formato" | "categoria", value: string, defaultValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const filtered = useMemo(
    () =>
      books.filter((book) => {
        if (format !== "todos" && book.format !== format) return false;
        if (category !== "todas" && !book.categories.includes(category))
          return false;
        return true;
      }),
    [books, format, category],
  );

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por formato">
          <span className="mr-1 text-sm font-semibold text-muted-foreground">
            Formato:
          </span>
          {formatOptions.map((option) => (
            <FilterChip
              key={option.value}
              active={format === option.value}
              onClick={() => setFilter("formato", option.value, "todos")}
            >
              {option.label}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
          <span className="mr-1 text-sm font-semibold text-muted-foreground">
            Categoria:
          </span>
          <FilterChip
            active={category === "todas"}
            onClick={() => setFilter("categoria", "todas", "todas")}
          >
            Todas
          </FilterChip>
          {categories.map((value) => (
            <FilterChip
              key={value}
              active={category === value}
              onClick={() => setFilter("categoria", value, "todas")}
            >
              {categoryLabels[value] ?? value}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {filtered.length === 1
          ? "1 obra encontrada"
          : `${filtered.length} obras encontradas`}
      </p>

      {filtered.length ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-navy/25 bg-card/60 px-6 py-16 text-center">
          <BookX className="size-8 text-muted-foreground" strokeWidth={1.5} />
          <p className="font-medium text-navy">
            Nenhuma obra encontrada com esses filtros.
          </p>
          <p className="text-sm text-muted-foreground">
            Experimente combinar outros formatos e categorias.
          </p>
        </div>
      )}
    </section>
  );
}
