import type { LegalPage } from "@/lib/types";

type LegalArticleProps = {
  page: LegalPage;
};

export function LegalArticle({ page }: LegalArticleProps) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      {page.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-relaxed text-pretty text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
