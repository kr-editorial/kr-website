import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { TripleStripe } from "@/components/brand/triple-stripe";
import { site } from "@/lib/content";

const footerLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Livros publicados", href: "/portfolio" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Solicitar orçamento", href: "/contato" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo variant="light" size="md" />
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            Do rascunho à publicação, cuidamos de cada etapa com zelo, excelência e propósito.
          </p>
          <TripleStripe orientation="horizontal" className="opacity-60" />
        </div>

        <nav aria-label="Links do rodapé" className="space-y-3">
          <h2 className="text-sm font-bold tracking-widest text-cream/60 uppercase">
            Navegação
          </h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/85 transition-colors hover:text-cream hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="text-sm font-bold tracking-widest text-cream/60 uppercase">
            Contato
          </h2>
          <ul className="space-y-2.5 text-sm text-cream/85">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
              >
                <Mail className="size-4 shrink-0" />
                {site.contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <Phone className="size-4 shrink-0" />
              {site.contact.phone}
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0" />
              {site.contact.city}
            </li>
          </ul>
          {site.contact.instagram ? (
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da KR Editorial"
              className="inline-flex size-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            >
              <Instagram className="size-4" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.tagline}. Todos os
            direitos reservados.
          </p>
          <p>
            {site.founders.map((founder) => founder.name).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
