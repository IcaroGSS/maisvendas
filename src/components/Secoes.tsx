import type { ReactNode } from "react";
import { depoimentos, site } from "@/config/site";
import { Botao } from "./Botao";
import { Revelar } from "./Revelar";

/** Faixa de nichos rolando sozinha. */
export function Marquee({ itens }: { itens: string[] }) {
  const linha = (oculta?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {itens.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-5 text-xl font-extrabold tracking-tight text-white/85 sm:px-7 sm:text-3xl">{item}</span>
          <span className="texto-cromado text-lg" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-linha bg-white/[0.015] py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-marquee">
        {linha()}
        {linha(true)}
      </div>
    </div>
  );
}

/** Cabeçalho padrão das páginas internas. */
export function CabecalhoPagina({
  selo,
  titulo,
  subtitulo,
  children,
}: {
  selo?: string;
  titulo: ReactNode;
  subtitulo?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate">
      <FundoCromado />
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 pt-32 pb-12 text-center sm:px-6 sm:pt-40">
      {selo ? (
        <span className="borda-cromada rounded-full bg-white/[0.04] px-4 py-1.5 text-xs font-bold tracking-wide text-[#dfe2e7] uppercase">
          {selo}
        </span>
      ) : null}
      <h1 className="text-[2.35rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-6xl">{titulo}</h1>
      {subtitulo ? <p className="max-w-xl text-lg leading-relaxed text-pretty text-suave">{subtitulo}</p> : null}
      {children}
      </header>
    </div>
  );
}

/** Brilho cromado se movendo devagar no fundo. */
export function FundoCromado({ forte }: { forte?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(#000_65%,transparent)]"
    >
      <div
        className={`absolute top-[-10%] left-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.16),transparent_65%)] blur-2xl animate-flutuar ${
          forte ? "" : "opacity-70"
        }`}
      />
      <div className="absolute top-[20%] right-[-5%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.14),transparent_65%)] blur-2xl animate-flutuar-2" />
      {forte ? (
        <div className="absolute bottom-[-10%] left-[30%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--destaque)_22%,transparent),transparent_70%)] blur-2xl animate-flutuar-2" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
    </div>
  );
}

/** Título de seção. */
export function TituloSecao({ selo, titulo, texto, centro = true }: { selo?: string; titulo: ReactNode; texto?: ReactNode; centro?: boolean }) {
  return (
    <Revelar className={`flex flex-col gap-3 ${centro ? "items-center text-center" : ""}`}>
      {selo ? <span className="text-xs font-bold tracking-[0.18em] text-suave uppercase">{selo}</span> : null}
      <h2 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl">{titulo}</h2>
      {texto ? <p className="max-w-xl text-base leading-relaxed text-pretty text-suave sm:text-lg">{texto}</p> : null}
    </Revelar>
  );
}

/** Chamada final para a prévia grátis. */
export function ChamadaFinal({
  titulo = "Imagine o seu negócio aqui.",
  texto = `Receba uma prévia grátis do seu site em até ${site.prazoPrevia}. Só paga se gostar.`,
  href = "/previa-gratis",
}: {
  titulo?: string;
  texto?: string;
  href?: string;
}) {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
      <Revelar className="borda-cromada relative overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#171a20,#0d0f13)] px-6 py-14 text-center sm:px-12 sm:py-20">
        <FundoCromado forte />
        <h2 className="texto-cromado mx-auto max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-balance sm:text-6xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-pretty text-suave">{texto}</p>
        <div className="mt-8 flex justify-center">
          <Botao href={href} tamanho="lg" iconeFim="seta">
            Quero minha prévia grátis
          </Botao>
        </div>
      </Revelar>
    </section>
  );
}

/** Depoimentos — só aparece se `depoimentos.ativo` for true no arquivo de configuração. */
export function Depoimentos() {
  if (!depoimentos.ativo || depoimentos.itens.length === 0) return null;
  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6" aria-labelledby="titulo-depoimentos">
      <div id="titulo-depoimentos">
        <TituloSecao titulo={depoimentos.titulo} />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {depoimentos.itens.map((d, i) => (
          <Revelar como="li" key={d.nome + i} atraso={i * 0.08} className="cartao flex flex-col gap-4 p-6">
            <p className="leading-relaxed text-[#d6d9df]">“{d.texto}”</p>
            <p className="mt-auto text-sm">
              <span className="font-bold text-white">{d.nome}</span>
              <span className="text-suave"> · {d.negocio}</span>
            </p>
          </Revelar>
        ))}
      </ul>
    </section>
  );
}
