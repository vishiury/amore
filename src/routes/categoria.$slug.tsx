import { createFileRoute, notFound } from "@tanstack/react-router";
import { CATEGORIES, getProductsByCategory, type Product, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type LoaderData = {
  category: (typeof CATEGORIES)[number];
  products: Product[];
};

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }): LoaderData => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { category: cat, products: getProductsByCategory(params.slug as ProductCategory) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.label} — Amore` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: `${loaderData.category.label} — Amore` },
          { property: "og:description", content: loaderData.category.description },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-4xl text-ink">Categoria não encontrada</h1>
    </div>
  ),
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData() as LoaderData;
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="container-x py-16 lg:py-20">
          <span className="eyebrow">Coleção</span>
          <h1 className="font-display mt-3 text-5xl text-ink lg:text-6xl">{category.label}</h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft">{category.description}</p>
        </div>
      </header>
      <section className="container-x py-12 lg:py-16">
        <div className="mb-8 flex items-center justify-between text-sm text-ink-soft">
          <span>{products.length} peças</span>
          <span className="hidden sm:inline">Ordenar por: Mais recentes</span>
        </div>
        {products.length === 0 ? (
          <p className="py-20 text-center text-ink-soft">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
