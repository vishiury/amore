import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, searchProducts, formatBRL } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { IconBag, IconClose, IconMenu, IconSearch } from "./Icons";

export function Header() {
  const { count, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = query.trim().length > 1 ? searchProducts(query).slice(0, 6) : [];

  const submitSearch = () => {
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate({ to: "/busca", search: { q: query.trim() } });
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-background">
        <div className="container-x flex h-9 items-center justify-center text-[11px] uppercase tracking-[0.22em]">
          Frete grátis para todo o Brasil em compras acima de R$ 299
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden"
            aria-label="Abrir menu"
          >
            <IconMenu width={22} height={22} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
                activeProps={{ className: "text-ink" }}
              >
                {c.label}
              </Link>
            ))}
            <Link
              to="/ofertas"
              className="text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              Ofertas
            </Link>
          </nav>

          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-ink lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            Amore
          </Link>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="text-ink transition-opacity hover:opacity-60"
            >
              <IconSearch width={20} height={20} />
            </button>
            <Link
              to="/conta"
              aria-label="Conta"
              className="hidden text-ink transition-opacity hover:opacity-60 sm:block"
            >
              <IconUserSmall />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Sacola"
              className="relative text-ink transition-opacity hover:opacity-60"
            >
              <IconBag width={20} height={20} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-x flex h-20 items-center gap-4">
              <IconSearch width={22} height={22} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Procure por produto, categoria ou estilo..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-ink-soft"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Fechar busca">
                <IconClose width={22} height={22} />
              </button>
            </div>

            {results.length > 0 && (
              <div className="border-t border-line">
                <div className="container-x grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to="/produto/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="flex gap-4 group"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-20 w-16 object-cover bg-surface-2"
                      />
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                          {p.categoryLabel}
                        </p>
                        <h4 className="text-sm font-medium text-ink group-hover:underline">
                          {p.name}
                        </h4>
                        <p className="mt-1 text-sm text-ink">{formatBRL(p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="container-x pb-6">
                  <button
                    onClick={submitSearch}
                    className="text-[12px] uppercase tracking-[0.2em] link-underline text-ink"
                  >
                    Ver todos os resultados
                  </button>
                </div>
              </div>
            )}

            {query.trim().length > 1 && results.length === 0 && (
              <div className="container-x py-12 text-center text-ink-soft">
                Nenhum resultado para "{query}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-ink/50" onClick={() => setMenuOpen(false)}>
          <aside
            className="absolute inset-y-0 left-0 w-[80%] max-w-sm bg-background p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">Amore</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fechar">
                <IconClose width={22} height={22} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-ink"
                >
                  {c.label}
                </Link>
              ))}
              <Link
                to="/ofertas"
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-ink"
              >
                Ofertas
              </Link>
              <div className="hairline my-4" />
              <Link
                to="/sobre"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-ink-soft"
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-ink-soft"
              >
                Contato
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function IconUserSmall() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
