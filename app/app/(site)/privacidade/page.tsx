import type { Metadata } from "next";
import { LegalArticle } from "@/components/brand/legal-article";
import { PageShell } from "@/components/layout/page-shell";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: legal.privacy.title,
  description: legal.privacy.description,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <PageShell
      title={legal.privacy.title}
      lede={legal.privacy.lede}
      breadcrumbs={[
        { label: "Início", href: "/" },
        { label: legal.privacy.title },
      ]}
    >
      <LegalArticle page={legal.privacy} />
    </PageShell>
  );
}
