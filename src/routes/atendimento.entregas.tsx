import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/atendimento/entregas")({
  head: () => ({
    meta: [
      { title: "Entregas — Amore" },
      {
        name: "description",
        content: "Prazos e condições de entrega da Amore para todo o Brasil.",
      },
    ],
  }),
  component: () => (
    <div className="container-x py-16 max-w-3xl">
      <span className="eyebrow">Atendimento</span>
      <h1 className="font-display mt-3 text-5xl text-ink">Entregas</h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-ink-soft">
        <p>
          Realizamos entregas para todo o Brasil pelos Correios e transportadoras parceiras.
          Pedidos confirmados até 14h são despachados no mesmo dia útil.
        </p>
        <h2 className="font-display text-2xl text-ink mt-8">Prazos estimados</h2>
        <ul className="space-y-2">
          <li>Nordeste · 2 a 5 dias úteis</li>
          <li>Sudeste · 4 a 7 dias úteis</li>
          <li>Sul · 5 a 8 dias úteis</li>
          <li>Norte e Centro-Oeste · 6 a 10 dias úteis</li>
        </ul>
        <h2 className="font-display text-2xl text-ink mt-8">Frete grátis</h2>
        <p>Em compras acima de R$ 299, o frete é por nossa conta para qualquer região do país.</p>
      </div>
    </div>
  ),
});
