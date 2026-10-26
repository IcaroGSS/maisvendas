import type { Metadata } from "next";
import Link from "next/link";
import { nichos, site } from "@/config/site";
import { Botao } from "@/components/Botao";
import { CardNicho } from "@/components/CardNicho";
import { GaleriaModelos } from "@/components/GaleriaModelos";
import { Icone, type NomeIcone } from "@/components/Icone";
import { MockupEsqueleto } from "@/components/mockup/MockupEsqueleto";
import { Revelar } from "@/components/Revelar";
import { ChamadaFinal, Depoimentos, FundoCromado, Marquee, TituloSecao } from "@/components/Secoes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const perdas: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "lupa", titulo: "Não aparece no Google", texto: "Quem procura o que você vende encontra outro negócio primeiro." },
  { icone: "instagram", titulo: "Depende só do Instagram", texto: "Se o algoritmo não entrega, o cliente simplesmente não te vê." },
  { icone: "escudo", titulo: "Passa menos confiança", texto: "Negócio com site parece mais sério, estabelecido e profissional." },
  { icone: "lua", titulo: "Perde clientes fora do horário", texto: "De madrugada, o site continua mostrando e vendendo por você." },
];

export default function Inicio() {
  return (
    <>
      {/* ---------- Topo ---------- */}
      <section className="relative isolate overflow-hidden">
        <FundoCromado forte />
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="flex min-h-[100svh] flex-col justify-center gap-6 pt-20 pb-8 lg:min-h-0 lg:py-28">
            <Link
              href="/previa-gratis"
              className="borda-cromada inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2 text-[0.8rem] font-bold text-[#e6e8ec] transition hover:bg-white/[0.09]"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-destaque opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-destaque" />
              </span>
              Veio do Instagram? Sua prévia é grátis ✦
            </Link>

            <h1 className="text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-white min-[400px]:text-5xl sm:text-6xl lg:text-[4.4rem]">
              Seu cliente te procurou no Google.{" "}
              <span className="texto-cromado">Encontrou seu concorrente.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-pretty text-suave sm:text-xl">
              Receba uma prévia grátis do site do seu negócio em até{" "}
              <strong className="font-bold text-white">{site.prazoPrevia}</strong>. Só paga se gostar.
            </p>

            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Botao href="/previa-gratis" tamanho="lg" iconeFim="seta">
                Quero minha prévia grátis
              </Botao>
              <Botao href="/modelos" tamanho="lg" variante="secundario">
                Ver modelos
              </Botao>
            </div>

            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-suave">
              {["Sem compromisso", "Atendimento direto pelo Direct", "Feito para micro empresas"].map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true" className="hidden text-white/25 sm:inline">·</span> : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Icone nome="check" className="size-3.5 text-destaque" strokeWidth={3} />
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-16 lg:pb-0">
            <MockupEsqueleto layout={1} autoTrocar={site.segundosTrocaMockup} controles={false} larguraCelular={300} imediato />
          </div>
        </div>
      </section>

      {/* ---------- Faixa de nichos ---------- */}
      <Marquee itens={["Barbearias", "Restaurantes", "Salões", "Clínicas", "Lojas", "Pet shops", "Academias"]} />

      {/* ---------- O que seu negócio perde ---------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <TituloSecao selo="Sem site, você fica invisível" titulo="O que seu negócio perde sem site" />
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {perdas.map((p, i) => (
            <Revelar como="li" key={p.titulo} atraso={i * 0.07} className="cartao flex flex-col gap-4 p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/[0.05] text-white">
                <Icone nome={p.icone} className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-white">{p.titulo}</h3>
              <p className="text-sm leading-relaxed text-suave">{p.texto}</p>
            </Revelar>
          ))}
        </ul>
      </section>

      {/* ---------- Prévia da galeria ---------- */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <TituloSecao
          selo="Modelos"
          titulo="Toque, gire e troque as cores"
          texto="Esses são esqueletos de sites: só formas e cores. Teste os layouts, veja no celular e no notebook e imagine o seu negócio ali."
        />
        <div className="mt-10">
          <GaleriaModelos layouts={[2, 3, 4]} colunas={3} />
        </div>
        <div className="mt-6 flex justify-center">
          <Botao href="/modelos" variante="secundario" iconeFim="seta">
            Ver todos os modelos
          </Botao>
        </div>
      </section>

      {/* ---------- Nichos ---------- */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <TituloSecao selo="Nichos" titulo="Escolha seu nicho" texto="Veja como um site pode ajudar o seu tipo de negócio." />
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {nichos.map((n, i) => (
            <Revelar como="li" key={n.slug} atraso={(i % 4) * 0.06}>
              <CardNicho nicho={n} />
            </Revelar>
          ))}
          <Revelar como="li" atraso={0.18}>
            <Link
              href="/previa-gratis"
              className="flex h-full min-h-44 flex-col justify-between gap-4 rounded-3xl border border-dashed border-white/15 p-5 transition hover:border-white/30"
            >
              <span className="text-lg font-bold text-white">Seu ramo não está aqui?</span>
              <span className="text-sm leading-relaxed text-suave">Tudo bem: o site é feito sob medida para qualquer micro empresa.</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
                Pedir prévia grátis <Icone nome="seta" className="size-4 text-destaque" strokeWidth={2.4} />
              </span>
            </Link>
          </Revelar>
        </ul>
      </section>

      <Depoimentos />

      <ChamadaFinal />
    </>
  );
}
