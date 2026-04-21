import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/atendimento/trocas")({
  head: () => ({
    meta: [
      { title: "Trocas e devoluções — Amore" },
      {
        name: "description",
        content: "Política de trocas e devoluções da Amore: prazos, condições e como solicitar.",
      },
    ],
  }),
  component: () => (
    <div className="container-x py-16 max-w-3xl">
      <span className="eyebrow">Atendimento</span>
      <h1 className="font-display mt-3 text-5xl text-ink">Trocas e devoluções</h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-ink-soft">
        <p>
          Você tem até 30 dias após o recebimento para solicitar troca ou devolução de qualquer
          peça, contanto que esteja em perfeito estado, sem uso, com etiqueta e embalagem original.
        </p>
        <h2 className="font-display text-2xl text-ink mt-8">Como solicitar</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Entre em contato pelo nosso WhatsApp ou e-mail.</li>
          <li>Receberá o código de postagem em até um dia útil.</li>
          <li>Despache a peça em qualquer agência dos Correios.</li>
          <li>Após avaliação, processamos a troca ou estorno em até 5 dias úteis.</li>
        </ol>
        <h2 className="font-display text-2xl text-ink mt-8">Custos</h2>
        <p>
          Trocas por defeito de fabricação têm frete por nossa conta. Trocas por arrependimento ou
          tamanho seguem a política dos Correios.
        </p>
      </div>
    </div>
  ),
});
