import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { IconCheck } from "@/components/Icons";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar compra — Amore" },
      { name: "description", content: "Conclua sua compra com pagamento seguro." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const shipping = subtotal >= 299 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  if (items.length === 0 && !done) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-3xl text-ink">Sua sacola está vazia</h1>
        <Link to="/" className="mt-6 inline-block link-underline text-ink">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AMR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setDone(true);
    clear();
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  if (done) {
    return (
      <div className="container-x py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-ink">
            <IconCheck width={28} height={28} />
          </div>
          <h1 className="font-display mt-8 text-4xl text-ink">Pedido confirmado</h1>
          <p className="mt-4 text-sm text-ink-soft">
            Obrigado pela compra. Você receberá um e-mail com os detalhes em instantes.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-ink-soft">
            Número do pedido
          </p>
          <p className="mt-2 font-display text-2xl text-ink">{orderId}</p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-10 inline-flex bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-background"
          >
            Continuar comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-14">
      <h1 className="font-display text-4xl text-ink lg:text-5xl">Finalizar compra</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <Section title="Contato">
            <Field label="E-mail" type="email" name="email" required />
            <Field label="Telefone" type="tel" name="phone" required />
          </Section>

          <Section title="Endereço de entrega">
            <Field label="Nome completo" name="name" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CEP" name="cep" required />
              <Field label="Cidade" name="city" required />
            </div>
            <Field label="Endereço" name="address" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Número" name="number" required />
              <Field label="Complemento" name="complement" />
            </div>
          </Section>

          <Section title="Pagamento">
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 border border-ink bg-surface p-4">
                <input type="radio" name="pay" defaultChecked className="accent-current" />
                <span className="text-sm font-medium">Cartão de crédito — até 6x sem juros</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 border border-line p-4">
                <input type="radio" name="pay" className="accent-current" />
                <span className="text-sm">Pix — 5% de desconto</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 border border-line p-4">
                <input type="radio" name="pay" className="accent-current" />
                <span className="text-sm">Boleto bancário</span>
              </label>
            </div>
          </Section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 border border-line bg-surface p-6">
            <h2 className="font-display text-2xl text-ink">Seu pedido</h2>
            <ul className="mt-6 divide-y divide-line">
              {items.map((it, i) => (
                <li key={i} className="flex gap-3 py-3">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-16 w-14 object-cover bg-surface-2"
                    style={{ width: 56 }}
                  />
                  <div className="flex flex-1 justify-between text-sm">
                    <div>
                      <p className="font-medium text-ink">{it.product.name}</p>
                      <p className="text-xs text-ink-soft">
                        {it.color} · {it.size} · Qtd {it.quantity}
                      </p>
                    </div>
                    <p className="text-ink">{formatBRL(it.product.price * it.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-soft">Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Frete</span>
                <span>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</span>
              </div>
              <div className="hairline my-2" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>{formatBRL(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-ink px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
            >
              Confirmar pedido
            </button>
            <p className="mt-3 text-center text-xs text-ink-soft">
              Pagamento processado em ambiente seguro.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
