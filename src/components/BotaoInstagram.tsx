import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Botao } from "./Botao";
import { Icone } from "./Icone";

type Props = {
  children?: ReactNode;
  variante?: "primario" | "secundario";
  tamanho?: "sm" | "md" | "lg";
  className?: string;
};

/** Botão de ação que abre o Direct do Instagram em nova aba. */
export function BotaoInstagram({
  children = "Fale comigo no Instagram",
  variante = "primario",
  tamanho = "md",
  className,
}: Props) {
  return (
    <Botao href={site.instagram.direct} externo icone="instagram" variante={variante} tamanho={tamanho} className={className}>
      {children}
    </Botao>
  );
}

/** Botão flutuante fixo no canto inferior direito (todas as páginas). */
export function BotaoFlutuante() {
  return (
    <a
      href={site.instagram.direct}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${site.nome} no Direct do Instagram (abre em nova aba)`}
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-destaque text-fundo shadow-[0_10px_30px_-6px_var(--destaque)] transition hover:scale-105 hover:brightness-110 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-destaque opacity-40 motion-safe:animate-ping [animation-duration:2.8s]" aria-hidden="true" />
      <Icone nome="instagram" className="relative size-7" strokeWidth={2.1} />
    </a>
  );
}
