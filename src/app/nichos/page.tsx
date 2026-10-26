import type { Metadata } from "next";
import { nichos } from "@/config/site";
import { CardNicho } from "@/components/CardNicho";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina, ChamadaFinal } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Sites por nicho",
  description:
    "Sites para barbearia, restaurante, salão de beleza, clínica, loja, pet shop e academia. Escolha o seu ramo e peça uma prévia grátis pelo Instagram.",
  alternates: { canonical: "/nichos" },
};

export default function Nichos() {
  return (
    <>
      <CabecalhoPagina
        selo="Nichos"
        titulo="Um site que fala a língua do seu negócio"
        subtitulo="Escolha o seu ramo e veja o que um site pode fazer por você."
      />
      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Lista de nichos">
        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {nichos.map((n, i) => (
            <Revelar como="li" key={n.slug} atraso={(i % 3) * 0.06}>
              <CardNicho nicho={n} />
            </Revelar>
          ))}
        </ul>
      </section>
      <ChamadaFinal titulo="Não achou o seu ramo?" texto="O site é feito sob medida para qualquer micro empresa. Peça sua prévia grátis e me conte sobre o seu negócio." />
    </>
  );
}
