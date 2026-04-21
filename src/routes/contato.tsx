import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IconCheck } from "@/components/Icons";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Amore" },
      {
        name: "description",
        content: "Fale com a Amore. Atendimento de segunda a sábado, presencial ou via WhatsApp.",
      },
      { property: "og:title", content: "Contato — Amore" },
      { property: "og:description", content: "Fale com nossa equipe." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="container-x py-16 lg:py-20">
          <span className="eyebrow">Contato</span>
          <h1 className="font-display mt-3 text-5xl text-ink lg:text-6xl">Fale conosco</h1>
        </div>
      </header>

      <section className="container-x grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div>
            <p className="eyebrow">Loja física</p>
            <p className="mt-3 text-base text-ink">
              Rua Principal, Centro<br />
              Passa e Fica — Rio Grande do Norte<br />
              CEP 59218-000
            </p>
          </div>
          <div>
            <p className="eyebrow">Atendimento</p>
            <p className="mt-3 text-base text-ink">
              Segunda a sexta · 9h às 18h<br />
              Sábado · 9h às 14h
            </p>
          </div>
          <div>
            <p className="eyebrow">WhatsApp</p>
            <a
              href="https://wa.me/5584900000000"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-base text-ink link-underline"
            >
              +55 (84) 90000-0000
            </a>
          </div>
          <div>
            <p className="eyebrow">E-mail</p>
            <a
              href="mailto:contato@amore.com.br"
              className="mt-3 inline-block text-base text-ink link-underline"
            >
              contato@amore.com.br
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-line bg-surface p-10 text-center">
              <IconCheck width={28} height={28} className="mx-auto" />
              <p className="font-display mt-4 text-2xl text-ink">Mensagem enviada</p>
              <p className="mt-2 text-sm text-ink-soft">
                Obrigado. Nossa equipe responderá em até um dia útil.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <Field label="Nome" required />
              <Field label="E-mail" type="email" required />
              <Field label="Assunto" />
              <label className="block">
                <span className="eyebrow">Mensagem</span>
                <textarea
                  required
                  rows={6}
                  className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
                />
              </label>
              <button
                type="submit"
                className="bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90"
              >
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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
