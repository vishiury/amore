import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";
import { IconInstagram, IconWhats } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="font-display text-3xl text-ink">
            Amore
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Moda contemporânea com curadoria atenta, peças atemporais e atendimento próximo.
            Desde 2018 em Passa-e-Fica, Rio Grande do Norte.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-background"
            >
              <IconInstagram width={18} height={18} />
            </a>
            <a
              href="https://wa.me/5584900000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-background"
            >
              <IconWhats width={18} height={18} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="eyebrow">Coleções</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/ofertas" className="text-ink-soft transition-colors hover:text-ink">
                Ofertas
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="eyebrow">Atendimento</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/contato" className="text-ink-soft transition-colors hover:text-ink">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="text-ink-soft transition-colors hover:text-ink">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/atendimento/trocas" className="text-ink-soft transition-colors hover:text-ink">
                Trocas e devoluções
              </Link>
            </li>
            <li>
              <Link to="/atendimento/entregas" className="text-ink-soft transition-colors hover:text-ink">
                Entregas
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="eyebrow">Receba novidades</h4>
          <p className="mt-4 text-sm text-ink-soft">
            Cadastre seu e-mail e tenha acesso antecipado aos lançamentos e ofertas exclusivas.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex border border-line bg-background"
          >
            <input
              type="email"
              required
              placeholder="seu@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink-soft"
            />
            <button
              type="submit"
              className="bg-ink px-5 text-[11px] uppercase tracking-[0.22em] text-background"
            >
              Assinar
            </button>
          </form>
          <p className="mt-6 text-xs text-ink-soft">
            Loja física: Rua Principal, Centro · Passa e Fica — RN, 59218-000
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Amore. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00 · Pagamento seguro</p>
        </div>
      </div>
    </footer>
  );
}
