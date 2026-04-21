import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatBRL, getProductBySlug, PRODUCTS, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { IconArrowRight, IconCheck, IconReturn, IconShield, IconTruck } from "@/components/Icons";

type LoaderData = { product: Product; related: Product[] };

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }): LoaderData => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    const related = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id,
    ).slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Amore` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Amore` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-4xl text-ink">Produto não encontrado</h1>
      <Link to="/" className="mt-4 inline-block link-underline text-ink">
        Voltar à loja
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add, openCart } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, { size, color, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    add(product, { size, color, quantity: 1 });
    openCart();
  };

  return (
    <div>
      <div className="container-x py-6 text-xs text-ink-soft">
        <Link to="/" className="hover:text-ink">Início</Link>
        <span className="mx-2">/</span>
        <Link to="/categoria/$slug" params={{ slug: product.category }} className="hover:text-ink">
          {product.categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="container-x grid gap-12 pb-16 lg:grid-cols-2 lg:gap-20">
        <div className="bg-surface-2">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="lg:py-8">
          <span className="eyebrow">{product.categoryLabel}</span>
          <h1 className="font-display mt-3 text-4xl leading-tight text-ink lg:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-ink">{formatBRL(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-ink-soft line-through">
                {formatBRL(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            ou 6x de {formatBRL(product.price / 6)} sem juros
          </p>

          <p className="mt-8 text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-10">
            <p className="eyebrow">Cor — {color}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full border transition-all ${
                    color === c.name ? "ring-2 ring-ink ring-offset-2 ring-offset-background" : ""
                  }`}
                  style={{ backgroundColor: c.hex, borderColor: "var(--color-line)" }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Tamanho</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 border px-4 py-3 text-sm transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-background"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 border border-ink bg-background px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-surface"
            >
              {added ? (
                <>
                  <IconCheck width={16} height={16} /> Adicionado
                </>
              ) : (
                "Adicionar à sacola"
              )}
            </button>
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
            >
              Comprar agora <IconArrowRight width={16} height={16} />
            </button>
          </div>

          <div className="mt-10 grid gap-4 border-y border-line py-6">
            {[
              { Icon: IconTruck, t: "Frete grátis acima de R$ 299" },
              { Icon: IconReturn, t: "Trocas e devoluções em 30 dias" },
              { Icon: IconShield, t: "Pagamento 100% seguro" },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-3 text-sm text-ink-soft">
                <s.Icon width={20} height={20} />
                <span>{s.t}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="eyebrow">Detalhes</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {product.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-ink-soft" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-16 lg:py-24">
          <h2 className="font-display text-3xl text-ink lg:text-4xl">Você também pode gostar</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
