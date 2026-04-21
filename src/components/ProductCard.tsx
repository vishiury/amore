import { Link } from "@tanstack/react-router";
import { formatBRL, type Product } from "@/lib/products";

export function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink">
            {product.badge === "novo" && "Novidade"}
            {product.badge === "oferta" && "Oferta"}
            {product.badge === "esgotando" && "Últimas peças"}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {product.categoryLabel}
          </p>
          <h3 className="mt-1 text-[15px] font-medium text-ink">{product.name}</h3>
        </div>
        <div className="text-right">
          {product.oldPrice && (
            <p className="text-xs text-ink-soft line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <p className="text-[15px] font-medium text-ink">{formatBRL(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
