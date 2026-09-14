import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/lib/content";

describe("SiteFooter contact", () => {
  it("keeps the email and links WhatsApp and Instagram", () => {
    render(<SiteFooter />);
    const contact = screen.getByRole("heading", { name: "Contato" }).parentElement!;

    expect(screen.getByRole("link", { name: site.contact.email })).toHaveAttribute(
      "href",
      `mailto:${site.contact.email}`,
    );
    expect(screen.getByRole("link", { name: `WhatsApp ${site.contact.phone}` })).toHaveAttribute(
      "href",
      site.contact.whatsapp,
    );
    expect(screen.getByRole("link", { name: "@kr_editorial" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/kr_editorial/",
    );
    expect(contact).not.toHaveTextContent(site.contact.city);
  });
});
