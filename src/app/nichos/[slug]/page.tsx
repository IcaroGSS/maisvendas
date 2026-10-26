import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { nichos, site } from "@/config/site";
import { Botao } from "@/components/Botao";
import { Icone } from "@/components/Icone";
import { MockupEsqueleto } from "@/components/mockup/MockupEsqueleto";
import { Revelar } from "@/components/Revelar";
import { ChamadaFinal, FundoCromado } from "@/components/Secoes";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return nichos.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const nicho = nichos.find((n) => n.slug === slug);
  if (!nicho) return {};
  return {
    title: nicho.seoTitulo,
    description: nicho.seoDescricao,
    alternates: { canonical: `/nichos/${nicho.slug}` },
    openGraph: {
      title: `${nicho.seoTitulo} | ${site.nome}`,
      description: nicho.seoDescricao,
      url: `/nichos/${nicho.slug}`,
      images: ["/og.png"],
    },
  };
}

export default async function PaginaNicho({ params }: Params) {
  const { slug } = await params;
  const nicho = nichos.find((n) => n.slug === slug);
  if (!nicho) notFound();

  const linkPrevia = `/previa-gratis?nicho=${nicho.slug}`;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <FundoCromado forte />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <nav aria-label="Você está em" className="text-sm text-suave">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/nichos" className="rounded hover:text-white">
                    Nichos
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-white">
                  {nicho.nome}
                </li>
              </ol>
            </nav>
            <span className="borda-cromada grid size-14 place-items-center rounded-2xl bg-white/[0.05] text-white">
              <Icone nome={nicho.icone} className="size-7" />
            </span>
            <h1 className="text-[2.4rem] leading-[1.04] font-extrabold tracking-[-0.04em] text-balance text-white sm:text-6xl">
              {nicho.titulo}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-suave">{nicho.subtitulo}</p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Botao href={linkPrevia} tamanho="lg" iconeFim="seta">
                Quero minha prévia grátis
              </Botao>
              <Botao href="/modelos" tamanho="lg" variante="secundario">
                Ver modelos
              </Botao>
            </div>
            <p className="text-sm text-suave">
              Prévia em até <strong className="text-white">{site.prazoPrevia}</strong> · Só paga se gostar
            </p>
          </div>
          <div>
            <MockupEsqueleto layout={nicho.layout} icone={nicho.icone} larguraCelular={280} imediato />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6" aria-labelledby="titulo-beneficios">
        <Revelar>
          <h2 id="titulo-beneficios" className="text-3xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl">
            O que o seu site vai ter
          </h2>
        </Revelar>
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {nicho.beneficios.map((b, i) => (
            <Revelar como="li" key={b.titulo} atraso={i * 0.07} className="cartao flex flex-col gap-4 p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/[0.05] text-destaque">
                <Icone nome={b.icone} className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-white">{b.titulo}</h3>
              <p className="text-sm leading-relaxed text-suave">{b.texto}</p>
            </Revelar>
          ))}
        </ul>
      </section>

      <ChamadaFinal href={linkPrevia} />
    </>
  );
}
