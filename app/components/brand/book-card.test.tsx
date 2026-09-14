import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BookCard } from "@/components/brand/book-card";
import { makeBook } from "@/tests/fixtures";

vi.mock("@/content/authors.json", async () => ({
  default: (await import("@/tests/fixtures")).authors,
}));

describe("book details", () => {
  it("opens the selected book with its details and resolved author biography", async () => {
    const user = userEvent.setup();
    const book = makeBook({ subtitle: "Um subtítulo", badge: "lançamento" });
    render(<BookCard book={book} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Primeiro livro/ }));

    const dialog = within(await screen.findByRole("dialog", { name: book.title }));
    expect(dialog.getByText(book.subtitle!)).toBeVisible();
    expect(dialog.getByText(book.description)).toBeVisible();
    expect(dialog.getByText("Lançamento")).toBeVisible();
    expect(dialog.getByRole("img", { name: `Capa do livro ${book.title}` })).toBeVisible();
    expect(dialog.getByRole("heading", { name: "Sobre o autor" })).toBeVisible();
    expect(dialog.getByText("José Silva")).toBeVisible();
    expect(dialog.getAllByRole("img", { name: "Retrato de José Silva" }).length).toBeGreaterThan(0);
    expect(dialog.getByText("Escritor · Professor · Curitiba/PR")).toBeVisible();
    expect(dialog.getByText("José escreve sobre literatura.")).toBeVisible();
    expect(dialog.getByText("Também ensina escrita.")).toBeVisible();
  });

  it.each(["close button", "Escape"])("closes via %s and returns focus to the card", async (method) => {
    const user = userEvent.setup();
    render(<BookCard book={makeBook()} />);
    const trigger = screen.getByRole("button", { name: /Primeiro livro/ });
    await user.click(trigger);
    await screen.findByRole("dialog");

    if (method === "Escape") {
      await user.keyboard("{Escape}");
    } else {
      await user.click(screen.getByRole("button", { name: "Fechar" }));
    }

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("opens with the keyboard and displays multiple authors, including unknown credits", async () => {
    const user = userEvent.setup();
    render(<BookCard book={makeBook({ author: "J. Silva e Autor convidado" })} />);
    await user.tab();
    await user.keyboard("{Enter}");

    const dialog = within(await screen.findByRole("dialog"));
    expect(dialog.getByRole("heading", { name: "Sobre os autores" })).toBeVisible();
    expect(dialog.getByText("José Silva")).toBeVisible();
    expect(dialog.getByText("Autor convidado")).toBeVisible();
    expect(dialog.getByRole("img", { name: "Retrato de José Silva" })).toBeVisible();
    expect(dialog.queryByRole("img", { name: "Retrato de Autor convidado" })).not.toBeInTheDocument();
  });

  it("shows a book when its author has no biography or roles", async () => {
    const user = userEvent.setup();
    const book = makeBook({ author: "Ana Costa" });
    render(<BookCard book={book} />);
    await user.click(screen.getByRole("button", { name: /Primeiro livro/ }));

    const dialog = within(await screen.findByRole("dialog", { name: book.title }));
    expect(dialog.getByText("Ana Costa")).toBeVisible();
    expect(dialog.getByText(book.description)).toBeVisible();
    expect(dialog.getByRole("heading", { name: "Sobre o autor" })).toBeVisible();
    expect(dialog.queryByRole("img", { name: "Retrato de Ana Costa" })).not.toBeInTheDocument();
  });

  it("shows an author avatar on the card when a portrait exists", () => {
    render(<BookCard book={makeBook()} />);
    expect(screen.getByRole("img", { name: "Retrato de José Silva" })).toBeVisible();
    expect(screen.getByText("J. Silva")).toBeVisible();
  });

  it("keeps the author credit as text when nobody has a portrait", () => {
    render(<BookCard book={makeBook({ author: "Ana Costa" })} />);
    expect(screen.getByText("Ana Costa")).toBeVisible();
    expect(screen.queryByRole("img", { name: "Retrato de Ana Costa" })).not.toBeInTheDocument();
  });
});
