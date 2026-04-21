import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { IconArrowRight, IconMinus, IconPlus } from "@/components/Icons";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Sacola — Amore" },
      { name: "description", content: "Revise os itens da sua sacola e finalize sua compra." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove, itemKey } = useCart();
  const shipping = subtotal >= 299 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  return (
    <div className="container-x py-14">
      <h1 className="font-display text-4xl text-ink lg:text-5xl">Sua sacola</h1>

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-ink">Sua sacola está vazia</p>
          <Link
            to="/categoria/$slug"
            params={{ slug: "feminino" }}
            className="mt-6 inline-flex items-center gap-2 bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-background"
          >
            Explorar coleção <IconArrowRight width={16} height={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => {
                const k = itemKey(item);
                return (
                  <li key={k} className="flex gap-6 py-6">
                    <Link
                      to="/produto/$slug"
                      params={{ slug: item.product.slug }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-32 w-26 object-cover bg-surface-2"
                        style={{ width: 104 }}
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                            {item.product.categoryLabel}
                          </p>
                          <Link
                            to="/produto/$slug"
                            params={{ slug: item.product.slug }}
                            className="mt-1 block text-base font-medium text-ink hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-ink-soft">
                            {item.color} · Tamanho {item.size}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-ink">
                          {formatBRL(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <div className="inline-flex items-center border border-line">
                          <button
                            onClick={() => setQty(k, item.quantity - 1)}
                            className="p-2 text-ink-soft hover:text-ink"
                            aria-label="Diminuir"
                          >
                            <IconMinus width={14} height={14} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => setQty(k, item.quantity + 1)}
                            className="p-2 text-ink-soft hover:text-ink"
                            aria-label="Aumentar"
                          >
                            <IconPlus width={14} height={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(k)}
                          className="text-[11px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-line bg-surface p-6">
              <h2 className="font-display text-2xl text-ink">Resumo</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="text-ink">{formatBRL(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Frete</span>
                  <span className="text-ink">
                    {shipping === 0 ? "Grátis" : formatBRL(shipping)}
                  </span>
                </div>
                <div className="hairline my-3" />
                <div className="flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>
                <p className="text-xs text-ink-soft">
                  ou 6x de {formatBRL(total / 6)} sem juros
                </p>
              </div>
              <Link
                to="/checkout"
                className="mt-6 flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
              >
                Finalizar compra <IconArrowRight width={16} height={16} />
              </Link>
              <Link
                to="/"
                className="mt-3 block text-center text-[12px] uppercase tracking-[0.2em] text-ink link-underline"
              >
                Continuar comprando
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
