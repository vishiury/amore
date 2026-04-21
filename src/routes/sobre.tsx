import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Amore" },
      {
        name: "description",
        content:
          "A história da Amore: curadoria de moda contemporânea com origem em Passa-e-Fica, Rio Grande do Norte.",
      },
      { property: "og:title", content: "Sobre — Amore" },
      {
        property: "og:description",
        content: "Curadoria atenta. Atendimento próximo. Desde 2018.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">Nossa história</span>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-tight text-ink lg:text-7xl">
            Curadoria atenta para um guarda-roupa essencial.
          </h1>
        </div>
      </header>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <img
            src={heroImg}
            alt="Atelier Amore"
            loading="lazy"
            width={1080}
            height={1920}
            className="h-full w-full object-cover bg-surface-2"
          />
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <p className="font-display text-3xl leading-snug text-ink">
            A Amore nasceu em 2018, no coração de Passa-e-Fica, com uma convicção:
            <em className="not-italic text-ink-soft"> peças bem feitas duram mais que tendências.</em>
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              Selecionamos cada coleção pensando em quem busca presença sem ostentação.
              Trabalhamos com tecidos naturais, marcas de produção responsável e fornecedores
              que compartilham nosso compromisso com qualidade.
            </p>
            <p>
              Mais que vender roupas, queremos ajudar a construir um repertório pessoal — onde
              cada peça conversa com a próxima, e onde o tempo é aliado.
            </p>
            <p>Bem-vindas e bem-vindos à Amore.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-x grid gap-12 py-20 sm:grid-cols-3">
          {[
            { num: "07", t: "Anos de história" },
            { num: "120+", t: "Marcas curadas" },
            { num: "12k", t: "Clientes atendidas" },
          ].map((s) => (
            <div key={s.t}>
              <p className="font-display text-6xl text-ink">{s.num}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-soft">{s.t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
