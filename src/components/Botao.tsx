import Link from "next/link";
import type { ReactNode } from "react";
import { Icone, type NomeIcone } from "./Icone";

type Props = {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario" | "fantasma";
  tamanho?: "sm" | "md" | "lg";
  icone?: NomeIcone;
  /** Ícone depois do texto (ex.: seta). */
  iconeFim?: NomeIcone;
  /** Abre em nova aba (links externos, como o Direct). */
  externo?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variantes = {
  primario:
    "bg-destaque text-fundo shadow-[0_8px_30px_-8px_var(--destaque)] hover:brightness-110 active:brightness-95",
  secundario:
    "borda-cromada bg-white/[0.04] text-texto hover:bg-white/[0.08]",
  fantasma: "text-texto hover:bg-white/[0.06]",
};

const tamanhos = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

export function Botao({
  href,
  children,
  variante = "primario",
  tamanho = "md",
  icone,
  iconeFim,
  externo,
  className = "",
  ariaLabel,
}: Props) {
  const classes = `inline-flex items-center justify-center rounded-full font-bold whitespace-nowrap transition duration-200 ${variantes[variante]} ${tamanhos[tamanho]} ${className}`;
  const conteudo = (
    <>
      {icone ? <Icone nome={icone} className="size-[1.15em] shrink-0" strokeWidth={2.2} /> : null}
      <span>{children}</span>
      {iconeFim ? <Icone nome={iconeFim} className="size-[1.05em] shrink-0" strokeWidth={2.4} /> : null}
    </>
  );

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel ? `${ariaLabel} (abre em nova aba)` : undefined}
      >
        {conteudo}
        {ariaLabel ? null : <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {conteudo}
    </Link>
  );
}
