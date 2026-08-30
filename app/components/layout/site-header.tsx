import Link from "next/link";
import { CtaButton } from "@/components/brand/cta-button";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

export const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Livros publicados", href: "/portfolio" },
  { label: "Quem Somos", href: "/quem-somos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
          aria-label="KR Editorial — página inicial"
        >
          <Logo variant="light" size="sm" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-cream/85 transition-colors outline-none hover:bg-cream/10 hover:text-cream focus-visible:ring-2 focus-visible:ring-cream/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton href="/contato" variant="inverted" size="sm">
            Solicitar orçamento
          </CtaButton>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
