import Link from "next/link";
import type { Nicho } from "@/config/site";
import { Icone } from "./Icone";

export function CardNicho({ nicho }: { nicho: Nicho }) {
  return (
    <Link
      href={`/nichos/${nicho.slug}`}
      className="cartao group relative flex h-full flex-col gap-4 overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 focus-visible:rounded-3xl"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-white/[0.04] blur-2xl transition group-hover:bg-white/[0.08]"
      />
      <span className="borda-cromada grid size-12 place-items-center rounded-2xl bg-white/[0.04] text-white">
        <Icone nome={nicho.icone} className="size-6" />
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="text-lg font-bold text-white">{nicho.nome}</span>
        <span className="text-sm leading-relaxed text-suave">{nicho.frase}</span>
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-white">
        Ver página
        <Icone nome="seta" className="size-4 text-destaque transition group-hover:translate-x-1" strokeWidth={2.4} />
      </span>
    </Link>
  );
}
