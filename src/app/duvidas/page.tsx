import type { Metadata } from "next";
import { faq } from "@/config/site";
import { BotaoInstagram } from "@/components/BotaoInstagram";
import { FAQ } from "@/components/FAQ";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Dúvidas frequentes",
  description:
    "Respostas para as dúvidas mais comuns sobre a criação do seu site: prévia grátis, prazo, mensalidade, alterações e mais.",
  alternates: { canonical: "/duvidas" },
};

export default function Duvidas() {
  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }} />
      <CabecalhoPagina selo="Dúvidas" titulo="Perguntas frequentes" subtitulo="Tudo o que você precisa saber antes de pedir a sua prévia." />

      <section className="mx-auto max-w-3xl px-4 sm:px-6" aria-label="Perguntas e respostas">
        <FAQ perguntas={faq} />
      </section>

      <section className="mx-auto mt-20 max-w-2xl px-4 text-center sm:px-6">
        <Revelar className="cartao flex flex-col items-center gap-5 px-6 py-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
            Ainda com dúvida? Me chama no Instagram
          </h2>
          <p className="text-suave">Respondo pessoalmente pelo Direct.</p>
          <BotaoInstagram tamanho="lg">Chamar no Direct</BotaoInstagram>
        </Revelar>
      </section>
    </>
  );
}
