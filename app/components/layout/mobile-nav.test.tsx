import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileNav } from "@/components/layout/mobile-nav";

describe("mobile navigation", () => {
  it("opens the menu and exposes the main page links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const nav = within(await screen.findByRole("navigation", { name: "Navegação principal" }));
    expect(nav.getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(nav.getByRole("link", { name: "Serviços" })).toHaveAttribute("href", "/servicos");
    expect(nav.getByRole("link", { name: "Livros publicados" })).toHaveAttribute("href", "/portfolio");
    expect(nav.getByRole("link", { name: "Quem Somos" })).toHaveAttribute("href", "/quem-somos");
  });

  it("closes the menu after choosing a page", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const link = await screen.findByRole("link", { name: "Livros publicados" });
    // Keep jsdom on this page while exercising the component's click handler.
    link.addEventListener("click", (event) => event.preventDefault());
    await user.click(link);

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
