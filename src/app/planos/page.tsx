import type { Metadata } from "next";
import { planos } from "@/config/site";
import { Botao } from "@/components/Botao";
import { CardPlano } from "@/components/CardPlano";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Planos",
  description:
    "Planos de criação de site para micro empresas: Essencial, Profissional e Loja/Cardápio. Peça uma prévia grátis antes de decidir.",
  alternates: { canonical: "/planos" },
};

export default function Planos() {
  return (
    <>
      <CabecalhoPagina
        selo="Planos"
        titulo="Um plano para cada momento do seu negócio"
        subtitulo="O valor é combinado com você pelo Direct, de acordo com o que o seu site vai ter — e você vê a prévia antes de pagar qualquer coisa."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Planos">
        <ul className="grid items-stretch gap-6 pt-3 md:grid-cols-3">
          {planos.map((p, i) => (
            <Revelar como="li" key={p.nome} atraso={i * 0.08} className={p.destaque ? "md:-translate-y-3" : ""}>
              <CardPlano plano={p} />
            </Revelar>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-2xl px-4 text-center sm:px-6">
        <Revelar className="cartao flex flex-col items-center gap-5 px-6 py-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
            Não sabe qual escolher? Peça sua prévia grátis
          </h2>
          <p className="text-suave">Eu te ajudo a decidir depois que você vir como o seu site pode ficar.</p>
          <Botao href="/previa-gratis" tamanho="lg" iconeFim="seta">
            Quero minha prévia grátis
          </Botao>
        </Revelar>
      </section>
    </>
  );
}
