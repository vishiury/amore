import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha conta — Amore" },
      { name: "description", content: "Acesse sua conta Amore." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-4xl text-ink">Minha conta</h1>
        <p className="mt-3 text-sm text-ink-soft">
          Entre com seu e-mail para acessar pedidos e endereços.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 space-y-4"
        >
          <label className="block">
            <span className="eyebrow">E-mail</span>
            <input
              type="email"
              required
              className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Senha</span>
            <input
              type="password"
              required
              className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-ink px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-background"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Ainda não tem cadastro?{" "}
          <Link to="/contato" className="link-underline text-ink">
            Fale conosco
          </Link>
        </p>
      </div>
    </div>
  );
}
