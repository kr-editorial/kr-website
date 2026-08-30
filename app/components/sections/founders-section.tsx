import { FounderCard } from "@/components/brand/founder-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { site } from "@/lib/content";

export function FoundersSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        pill="Quem somos"
        title="Pessoas que amam livros e respeitam autores"
        subtitle="A KR Editorial nasceu do encontro entre a paixão pela palavra escrita e o rigor técnico da edição profissional."
      />
      <div className="mx-auto grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        {site.founders.map((founder) => (
          <FounderCard key={founder.name} name={founder.name} role={founder.role} />
        ))}
      </div>
      <div className="mx-auto max-w-3xl space-y-4 text-center text-lg leading-relaxed text-muted-foreground">
        <p>
          Acreditamos que cada manuscrito carrega uma voz única — e que o
          trabalho editorial existe para amplificá-la, nunca para substituí-la.
          Por isso, cada projeto é conduzido em diálogo constante com o autor,
          da primeira leitura à arte final.
        </p>
        <p>
          Unimos sensibilidade literária e rigor acadêmico: revisamos com
          cuidado, diagramamos com estética profissional e normalizamos com
          precisão, para que sua obra seja publicada com a qualidade que ela
          merece.
        </p>
      </div>
    </section>
  );
}
