import type { Metadata } from "next";
import { site } from "@/config/site";
import { BotaoInstagram } from "@/components/BotaoInstagram";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { ListaPlanos } from "@/components/CardPlano";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Planos",
  description: `Prévia grátis do site do seu negócio. Gostou? O site completo sai por R$ ${site.precoSite}, pago só quando você fechar.`,
  alternates: { canonical: "/planos" },
};

export default function Planos() {
  return (
    <>
      <CabecalhoPagina
        selo="Planos"
        titulo="Primeiro você vê. Depois decide."
        subtitulo={`Comece pela prévia grátis. Gostou? O site completo sai por R$ ${site.precoSite}, pago só quando você fechar.`}
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Planos">
        <ListaPlanos />
      </section>

      <section className="mx-auto mt-20 max-w-2xl px-4 text-center sm:px-6">
        <Revelar className="cartao flex flex-col items-center gap-5 px-6 py-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
            Ficou alguma dúvida? Me chama
          </h2>
          <p className="text-suave">Respondo pessoalmente, pelo Direct ou pelo WhatsApp.</p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <BotaoInstagram>Chamar no Direct</BotaoInstagram>
            <BotaoWhatsApp texto="Olá! Vim pela página de planos da MaisVendas." />
          </div>
        </Revelar>
      </section>
    </>
  );
}
