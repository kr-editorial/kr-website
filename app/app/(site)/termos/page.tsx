import type { Metadata } from "next";
import { LegalArticle } from "@/components/brand/legal-article";
import { PageShell } from "@/components/layout/page-shell";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: legal.terms.title,
  description: legal.terms.description,
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <PageShell
      title={legal.terms.title}
      lede={legal.terms.lede}
      breadcrumbs={[{ label: "Início", href: "/" }, { label: legal.terms.title }]}
    >
      <LegalArticle page={legal.terms} />
    </PageShell>
  );
}
