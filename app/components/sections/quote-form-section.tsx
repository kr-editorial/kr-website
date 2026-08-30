import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { site } from "@/lib/content";

export function QuoteFormSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_320px]">
      <QuoteForm />

      <aside className="flex h-fit flex-col gap-6 rounded-xl bg-navy p-7 text-cream lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Prefere falar direto conosco?</h2>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4.5 shrink-0 text-cream/70" />
            <div>
              <p className="font-semibold">E-mail</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-cream/80 hover:text-cream hover:underline"
              >
                {site.contact.email}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4.5 shrink-0 text-cream/70" />
            <div>
              <p className="font-semibold">Telefone / WhatsApp</p>
              <p className="text-cream/80">{site.contact.phone}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4.5 shrink-0 text-cream/70" />
            <div>
              <p className="font-semibold">Prazo de resposta</p>
              <p className="text-cream/80">Até 2 dias úteis</p>
            </div>
          </li>
        </ul>
        <div className="rounded-lg bg-cream/10 p-4 text-sm leading-relaxed text-cream/85">
          <MessageCircle className="mb-2 size-4.5 text-cream/70" />
          Quanto mais detalhes você compartilhar sobre a obra — tipo, extensão,
          prazo — mais preciso será o orçamento.
        </div>
      </aside>
    </section>
  );
}
