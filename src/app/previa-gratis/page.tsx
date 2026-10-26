import type { Metadata } from "next";
import { site } from "@/config/site";
import { FormularioPrevia } from "@/components/FormularioPrevia";
import { Icone, type NomeIcone } from "@/components/Icone";
import { Revelar } from "@/components/Revelar";
import { CabecalhoPagina } from "@/components/Secoes";

export const metadata: Metadata = {
  title: "Prévia grátis do seu site",
  description: `Peça uma prévia grátis do site do seu negócio. Você recebe em até ${site.prazoPrevia} e só paga se gostar. Atendimento pelo Direct do Instagram.`,
  alternates: { canonical: "/previa-gratis" },
};

const passos: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "enviar", titulo: "Você manda os dados", texto: "Nome do negócio, ramo e, se quiser, seu Instagram e uma cor." },
  { icone: "olho", titulo: `Recebe a prévia em até ${site.prazoPrevia}`, texto: "Você vê como o seu site pode ficar, direto pelo Direct." },
  { icone: "check", titulo: "Só fecha se gostar", texto: "Gostou? A gente segue. Não gostou? Você não paga nada." },
];

export default function PreviaGratis() {
  return (
    <>
      <CabecalhoPagina
        selo="Prévia grátis ✦"
        titulo="Veja seu site antes de pagar qualquer coisa"
        subtitulo="Preencha em 30 segundos. A mensagem fica pronta para você só colar e enviar no Direct."
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6" aria-label="Como funciona a prévia">
        <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
          {passos.map((p, i) => (
            <Revelar como="li" key={p.titulo} atraso={i * 0.08} className="cartao relative flex items-start gap-4 p-5 md:flex-col">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-white/[0.05] text-white">
                <Icone nome={p.icone} className="size-5" />
                <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-destaque text-xs font-extrabold text-fundo">
                  {i + 1}
                </span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-bold text-white">{p.titulo}</span>
                <span className="text-sm leading-relaxed text-suave">{p.texto}</span>
              </span>
              {i < passos.length - 1 ? (
                <Icone
                  nome="seta"
                  className="absolute top-1/2 -right-3.5 hidden size-5 -translate-y-1/2 text-white/30 md:block"
                  strokeWidth={2.2}
                />
              ) : null}
            </Revelar>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-12 max-w-2xl px-4 sm:px-6" aria-label="Formulário da prévia grátis">
        <FormularioPrevia />
      </section>
    </>
  );
}
