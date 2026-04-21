import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import catFeminino from "@/assets/cat-feminino.jpg";
import catMasculino from "@/assets/cat-masculino.jpg";
import catCalcados from "@/assets/cat-calcados.jpg";
import catAcessorios from "@/assets/cat-acessorios.jpg";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { getFeatured, getOnSale } from "@/lib/products";
import { IconArrowRight, IconReturn, IconShield, IconTruck } from "@/components/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amore — Moda contemporânea em Passa-e-Fica, RN" },
      {
        name: "description",
        content:
          "Curadoria de roupas e acessórios atemporais. Peças selecionadas para um guarda-roupa essencial. Frete para todo o Brasil.",
      },
      { property: "og:title", content: "Amore — Moda contemporânea" },
      {
        property: "og:description",
        content: "Curadoria atenta de moda contemporânea. Frete para todo o Brasil.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const CATEGORY_CARDS = [
  { slug: "feminino" as const, label: "Feminino", img: catFeminino },
  { slug: "masculino" as const, label: "Masculino", img: catMasculino },
  { slug: "calcados" as const, label: "Calçados", img: catCalcados },
  { slug: "acessorios" as const, label: "Acessórios", img: catAcessorios },
];

function Home() {
  const featured = getFeatured();
  const sale = getOnSale().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 lg:min-h-[80vh]">
          <div className="lg:col-span-5 flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-24 reveal">
            <span className="eyebrow">Coleção Outono · 2025</span>
            <h1 className="font-display mt-6 text-5xl leading-[1.05] text-ink lg:text-7xl">
              O essencial,<br />
              <em className="not-italic text-ink-soft">com presença.</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Peças cuidadosamente selecionadas para compor um guarda-roupa atemporal — onde
              tecidos nobres encontram caimento preciso.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/categoria/$slug"
                params={{ slug: "feminino" }}
                className="inline-flex items-center gap-2 bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
              >
                Ver coleção <IconArrowRight width={16} height={16} />
              </Link>
              <Link
                to="/ofertas"
                className="text-[12px] uppercase tracking-[0.22em] text-ink link-underline"
              >
                Ofertas da estação
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <img
              src={heroImg}
              alt="Modelo vestindo coleção Amore"
              width={1080}
              height={1920}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-line bg-surface py-5">
        <div className="marquee whitespace-nowrap font-display text-2xl text-ink">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              <span>Linho</span>
              <span>·</span>
              <span>Algodão Pima</span>
              <span>·</span>
              <span>Couro Legítimo</span>
              <span>·</span>
              <span>Cashmere</span>
              <span>·</span>
              <span>Viscose</span>
              <span>·</span>
              <span>Tricô</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Coleções</span>
            <h2 className="font-display mt-3 text-4xl text-ink lg:text-5xl">Compre por categoria</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/40 to-transparent p-5 text-background">
                  <span className="font-display text-2xl">{c.label}</span>
                  <IconArrowRight width={18} height={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Selecionado</span>
            <h2 className="font-display mt-3 text-4xl text-ink lg:text-5xl">Edição da semana</h2>
          </div>
          <Link
            to="/categoria/$slug"
            params={{ slug: "feminino" }}
            className="hidden text-[12px] uppercase tracking-[0.22em] text-ink link-underline sm:inline"
          >
            Ver tudo
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="bg-surface">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Manifesto</span>
            <h3 className="font-display mt-4 text-4xl leading-tight text-ink lg:text-5xl">
              Vestir com intenção é uma forma silenciosa de cuidado.
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Acreditamos em peças que duram — em construção, em estilo, em significado. Nossa
              curadoria reúne marcas que compartilham essa mesma convicção: menos, melhor.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-ink link-underline"
            >
              Conheça a Amore <IconArrowRight width={16} height={16} />
            </Link>
          </div>
          <div className="order-1 aspect-[5/6] overflow-hidden bg-surface-2 lg:order-2">
            <img
              src={catFeminino}
              alt="Editorial Amore"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sale */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Em promoção</span>
            <h2 className="font-display mt-3 text-4xl text-ink lg:text-5xl">Últimas peças</h2>
          </div>
          <Link
            to="/ofertas"
            className="hidden text-[12px] uppercase tracking-[0.22em] text-ink link-underline sm:inline"
          >
            Ver todas as ofertas
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {sale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Service strip */}
      <section className="border-t border-line bg-surface">
        <div className="container-x grid gap-10 py-14 sm:grid-cols-3">
          {[
            { Icon: IconTruck, title: "Frete grátis", desc: "Acima de R$ 299 para todo o Brasil" },
            { Icon: IconReturn, title: "Trocas em 30 dias", desc: "Sem complicação, do seu jeito" },
            { Icon: IconShield, title: "Pagamento seguro", desc: "Cartão, Pix e até 6x sem juros" },
          ].map((s) => (
            <div key={s.title} className="flex items-start gap-4">
              <s.Icon width={28} height={28} />
              <div>
                <p className="text-sm font-medium text-ink">{s.title}</p>
                <p className="text-xs text-ink-soft">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
