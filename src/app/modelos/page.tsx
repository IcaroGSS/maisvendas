import type { Metadata } from "next";
import { GaleriaModelos } from "@/components/GaleriaModelos";
import { CabecalhoPagina, ChamadaFinal } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Modelos de site",
  description:
    "Veja modelos de site para micro empresas: página com destaque, grade de produtos, cardápio digital e agendamento. Troque cores e veja no celular e no notebook.",
  alternates: { canonical: "/modelos" },
};

export default function Modelos() {
  return (
    <>
      <CabecalhoPagina
        selo="Modelos"
        titulo="Do jeito que o seu negócio precisa"
        subtitulo="Troque as cores, alterne entre celular e notebook e role a tela de cada modelo. O seu site é feito sob medida a partir do que combinar com você."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6" aria-label="Galeria de modelos">
        <GaleriaModelos layouts={[1, 2, 3, 4]} colunas={2} />
      </section>
      <ChamadaFinal />
    </>
  );
}
