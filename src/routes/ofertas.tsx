import { createFileRoute } from "@tanstack/react-router";
import { getOnSale } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas — Amore" },
      {
        name: "description",
        content: "Peças selecionadas com preços especiais. Aproveite enquanto durarem.",
      },
      { property: "og:title", content: "Ofertas — Amore" },
      { property: "og:description", content: "Peças selecionadas com preços especiais." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const sale = getOnSale();
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="container-x py-16">
          <span className="eyebrow">Edição limitada</span>
          <h1 className="font-display mt-3 text-5xl text-ink lg:text-6xl">Ofertas da estação</h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            Uma seleção curada de peças com preços especiais. Estoques limitados.
          </p>
        </div>
      </header>
      <section className="container-x py-12 lg:py-16">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
