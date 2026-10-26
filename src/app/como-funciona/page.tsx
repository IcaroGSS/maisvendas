import type { Metadata } from "next";
import { site } from "@/config/site";
import { Botao } from "@/components/Botao";
import { Icone, type NomeIcone } from "@/components/Icone";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina, ChamadaFinal, TituloSecao } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Do pedido da prévia grátis ao site no ar: veja como funciona a criação do seu site. Domínio, hospedagem, ajustes e suporte inclusos.",
  alternates: { canonical: "/como-funciona" },
};

const etapas: { icone: NomeIcone; titulo: string; texto: string }[] = [
  {
    icone: "enviar",
    titulo: "Pedido da prévia",
    texto: "Você me manda pelo Direct o nome do negócio, o ramo e o que mais quiser contar. Leva menos de um minuto.",
  },
  {
    icone: "olho",
    titulo: "Prévia pronta",
    texto: `Em até ${site.prazoPrevia} você recebe uma prévia de como o seu site pode ficar. Sem pagar nada.`,
  },
  {
    icone: "ajustes",
    titulo: "Ajustes",
    texto: "Gostou? A gente ajusta cores, textos, fotos e seções até ficar com a cara do seu negócio.",
  },
  {
    icone: "foguete",
    titulo: "Site no ar",
    texto: "Publico o site com o seu endereço na internet. Agora é só divulgar e receber clientes.",
  },
];

const inclusos: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "globo", titulo: "Domínio", texto: "O endereço do seu site na internet, configurado para você." },
  { icone: "nuvem", titulo: "Hospedagem", texto: "Seu site no ar, rápido e seguro, sem você se preocupar." },
  { icone: "ajustes", titulo: "Ajustes", texto: "Mudanças de texto, foto ou preço quando você precisar." },
  { icone: "suporte", titulo: "Suporte", texto: "Atendimento direto pelo Direct do Instagram, sem robô." },
];

export default function ComoFunciona() {
  return (
    <>
      <CabecalhoPagina
        selo="Como funciona"
        titulo="Do Direct ao site no ar"
        subtitulo="Um caminho simples, sem burocracia e sem termos técnicos."
      />

      {/* Linha do tempo */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6" aria-label="Etapas">
        <ol className="relative flex flex-col gap-6">
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-6 w-px bg-[linear-gradient(180deg,var(--destaque),rgba(255,255,255,0.2)_40%,rgba(255,255,255,0.05))]"
          />
          {etapas.map((e, i) => (
            <Revelar como="li" key={e.titulo} atraso={i * 0.06} className="relative flex gap-5">
              <span className="borda-cromada relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-[#14171c] text-white">
                <Icone nome={e.icone} className="size-5" />
              </span>
              <div className="cartao flex-1 p-5">
                <p className="text-xs font-bold tracking-[0.16em] text-suave uppercase">Etapa {i + 1}</p>
                <h2 className="mt-1 text-xl font-extrabold text-white">{e.titulo}</h2>
                <p className="mt-2 leading-relaxed text-suave">{e.texto}</p>
              </div>
            </Revelar>
          ))}
        </ol>
      </section>

      {/* Inclusos */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <TituloSecao selo="Sem surpresa" titulo="O que está incluso" />
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {inclusos.map((item, i) => (
            <Revelar como="li" key={item.titulo} atraso={i * 0.07} className="cartao flex flex-col gap-4 p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/[0.05] text-destaque">
                <Icone nome={item.icone} className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
              <p className="text-sm leading-relaxed text-suave">{item.texto}</p>
            </Revelar>
          ))}
        </ul>
      </section>

      {/* Destaque */}
      <section className="mx-auto mt-24 max-w-4xl px-4 text-center sm:px-6">
        <Revelar>
          <p className="text-3xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl">
            Você não precisa entender nada de tecnologia.{" "}
            <span className="texto-cromado">A gente cuida de tudo.</span>
          </p>
          <div className="mt-8 flex justify-center">
            <Botao href="/previa-gratis" tamanho="lg" iconeFim="seta">
              Quero minha prévia grátis
            </Botao>
          </div>
        </Revelar>
      </section>

      <ChamadaFinal />
    </>
  );
}
