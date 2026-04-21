import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const schema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/busca")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Busca — Amore" },
      { name: "description", content: "Encontre as peças desejadas no acervo Amore." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="container-x py-14">
          <span className="eyebrow">Busca</span>
          <h1 className="font-display mt-3 text-4xl text-ink lg:text-5xl">
            {q ? <>Resultados para "{q}"</> : "O que você procura?"}
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            {q ? `${results.length} peças encontradas` : "Use a busca no topo da página."}
          </p>
        </div>
      </header>

      <section className="container-x py-12 lg:py-16">
        {q && results.length === 0 ? (
          <p className="py-16 text-center text-ink-soft">
            Não encontramos resultados. Tente outras palavras.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
