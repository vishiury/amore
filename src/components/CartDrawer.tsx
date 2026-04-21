import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { IconClose, IconMinus, IconPlus, IconArrowRight } from "./Icons";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, setQty, remove, itemKey } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl">Sua sacola</h2>
          <button onClick={closeCart} aria-label="Fechar sacola">
            <IconClose width={22} height={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl text-ink">Sua sacola está vazia</p>
            <p className="text-sm text-ink-soft">
              Descubra peças cuidadosamente selecionadas para o seu guarda-roupa.
            </p>
            <Link
              to="/categoria/$slug"
              params={{ slug: "feminino" }}
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 bg-ink px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
            >
              Explorar coleção <IconArrowRight width={16} height={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const k = itemKey(item);
                  return (
                    <li key={k} className="flex gap-4 py-5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-28 w-22 flex-shrink-0 object-cover bg-surface-2"
                        style={{ width: 88 }}
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                              {item.product.categoryLabel}
                            </p>
                            <h3 className="mt-1 text-sm font-medium text-ink">
                              {item.product.name}
                            </h3>
                            <p className="mt-1 text-xs text-ink-soft">
                              {item.color} · {item.size}
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
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
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

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-medium text-ink">{formatBRL(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Frete e impostos calculados na finalização.
              </p>
              <div className="mt-5 grid gap-2">
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
                >
                  Finalizar compra <IconArrowRight width={16} height={16} />
                </Link>
                <Link
                  to="/carrinho"
                  onClick={closeCart}
                  className="flex items-center justify-center px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-ink link-underline"
                >
                  Ver sacola completa
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
