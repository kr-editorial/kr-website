import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { QuoteFormSection } from "@/components/sections/quote-form-section";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description:
    "Solicite um orçamento para o seu projeto editorial: livro, e-book, trabalho acadêmico, revisão ou normalização ABNT.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <PageShell
      pill="Vamos conversar?"
      title="Solicite um orçamento"
      lede="Conte sobre o seu projeto e retornaremos com uma proposta personalizada em até 2 dias úteis."
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Contato" }]}
    >
      <QuoteFormSection />
    </PageShell>
  );
}
