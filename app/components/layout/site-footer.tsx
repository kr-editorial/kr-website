import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { TripleStripe } from "@/components/brand/triple-stripe";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { site } from "@/lib/content";

function instagramHandle(url: string) {
  const handle = new URL(url).pathname.replaceAll("/", "");
  return handle ? `@${handle}` : url;
}

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
            {site.contact.whatsapp ? (
              <li>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${site.contact.phone}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  {site.contact.phone}
                </a>
              </li>
            ) : null}
            {site.contact.instagram ? (
              <li>
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
                >
                  <Instagram className="size-4 shrink-0" />
                  {instagramHandle(site.contact.instagram)}
                </a>
              </li>
            ) : null}
          </ul>
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
