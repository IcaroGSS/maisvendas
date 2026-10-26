"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { Icone, type NomeIcone } from "../Icone";
import { INFO_LAYOUTS } from "./info";

/*
 * Blocos do mockup esqueleto: só formas e cores, nenhuma informação real.
 * - Barra  = onde seria texto
 * - Img    = onde seria foto
 * - Circulo = ícone
 * - Btn    = botão na cor escolhida
 * A "montagem" acontece pelos variants: cada Grupo revela os filhos um por um.
 */

const ease = [0.22, 1, 0.36, 1] as const;

const grupo: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const bloco: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } },
};

type Cls = { className?: string };

function Grupo({ className = "", children }: Cls & { children: ReactNode }) {
  return (
    <motion.div variants={grupo} className={className}>
      {children}
    </motion.div>
  );
}

function Barra({ className = "", clara }: Cls & { clara?: boolean }) {
  return <motion.div variants={bloco} className={`${clara ? "mk-barra-clara" : "mk-barra"} h-2 rounded-full ${className}`} />;
}

function Img({ className = "", icone, children }: Cls & { icone?: NomeIcone; children?: ReactNode }) {
  return (
    <motion.div variants={bloco} className={`mk-img relative grid place-items-center overflow-hidden rounded-xl ${className}`}>
      {icone ? <Icone nome={icone} className="size-[28%] max-h-12 max-w-12 min-w-5" strokeWidth={1.5} /> : null}
      {children}
    </motion.div>
  );
}

function Circulo({ className = "", icone, cor }: Cls & { icone?: NomeIcone; cor?: boolean }) {
  return (
    <motion.div
      variants={bloco}
      className={`${cor ? "mk-cor text-[#0f1216]" : "mk-suave mk-texto-cor"} grid shrink-0 place-items-center rounded-full ${className}`}
    >
      {icone ? <Icone nome={icone} className="size-[55%]" strokeWidth={2} /> : null}
    </motion.div>
  );
}

function Btn({ className = "" }: Cls) {
  return (
    <motion.div variants={bloco} className={`mk-cor grid place-items-center rounded-full ${className}`}>
      <div className="h-1.5 w-1/3 rounded-full bg-black/25" />
    </motion.div>
  );
}

function Nav({ icone }: { icone?: NomeIcone }) {
  return (
    <Grupo className="flex items-center gap-2 pb-3">
      <Circulo cor icone={icone} className="size-6" />
      <Barra clara className="w-14" />
      <div className="ml-auto hidden items-center gap-2 @sm:flex">
        <Barra className="w-8" />
        <Barra className="w-8" />
        <Barra className="w-8" />
        <Btn className="h-5 w-14" />
      </div>
      <motion.div variants={bloco} className="ml-auto flex flex-col gap-[3px] @sm:hidden">
        <span className="mk-barra-clara h-[2px] w-4 rounded-full" />
        <span className="mk-barra-clara h-[2px] w-4 rounded-full" />
        <span className="mk-barra-clara h-[2px] w-3 rounded-full" />
      </motion.div>
    </Grupo>
  );
}

function Rodape() {
  return (
    <Grupo className="mt-5 flex flex-col items-center gap-2 border-t border-white/5 pt-4 pb-2">
      <Barra clara className="w-16" />
      <Barra className="w-28" />
      <div className="flex gap-2 pt-1">
        <Circulo className="size-4" />
        <Circulo className="size-4" />
        <Circulo className="size-4" />
      </div>
    </Grupo>
  );
}

/* ---------- Layout 1: foto grande no topo + seções ---------- */
function LayoutDestaque({ icone }: { icone?: NomeIcone }) {
  return (
    <>
      <Nav icone={icone} />
      <Grupo>
        <Img icone={icone} className="h-44 @sm:h-56">
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/50 to-transparent p-3 pt-10">
            <div className="h-3 w-3/4 rounded-full bg-white/70 @sm:w-1/2" />
            <div className="h-2 w-1/2 rounded-full bg-white/40 @sm:w-1/3" />
            <div className="mk-cor mt-1 h-6 w-20 rounded-full" />
          </div>
        </Img>
      </Grupo>
      <Grupo className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} variants={bloco} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] p-2.5">
            <Circulo icone={icone} className="size-7" />
            <div className="mk-barra-clara h-1.5 w-10 rounded-full" />
            <div className="mk-barra h-1.5 w-8 rounded-full" />
          </motion.div>
        ))}
      </Grupo>
      <Grupo className="mt-5 flex flex-col items-center gap-2">
        <Barra clara className="h-2.5 w-2/3" />
        <Barra className="w-1/2" />
      </Grupo>
      <Grupo className="mt-4 grid gap-3 @sm:grid-cols-2">
        <Img icone={icone} className="h-28" />
        <div className="flex flex-col justify-center gap-2">
          <Barra clara className="h-2.5 w-3/4" />
          <Barra className="w-full" />
          <Barra className="w-5/6" />
          <Barra className="w-2/3" />
          <Btn className="mt-1 h-6 w-24" />
        </div>
      </Grupo>
      <Grupo className="mt-4 grid grid-cols-2 gap-2 @sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Img key={i} className="aspect-square" />
        ))}
      </Grupo>
      <Grupo className="mt-4">
        <Img className="h-24">
          <div className="mk-cor absolute grid size-6 place-items-center rounded-full">
            <Icone nome="mapa" className="size-3.5 text-black/60" strokeWidth={2.4} />
          </div>
        </Img>
      </Grupo>
      <Grupo className="mt-4">
        <Btn className="h-9 w-full" />
      </Grupo>
      <Rodape />
    </>
  );
}

/* ---------- Layout 2: grade de produtos ---------- */
function LayoutProdutos({ icone }: { icone?: NomeIcone }) {
  return (
    <>
      <Nav icone={icone} />
      <Grupo className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-2">
        <Icone nome="lupa" className="size-3 text-white/30" strokeWidth={2.5} />
        <Barra className="w-20" />
      </Grupo>
      <Grupo className="mt-3 flex gap-1.5 overflow-hidden">
        <motion.div variants={bloco} className="mk-cor h-5 w-12 shrink-0 rounded-full" />
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} variants={bloco} className="h-5 w-12 shrink-0 rounded-full bg-white/[0.06]" />
        ))}
      </Grupo>
      <Grupo className="mt-3">
        <Img icone={icone} className="h-24 @sm:h-32">
          <div className="absolute top-1/2 left-3 flex -translate-y-1/2 flex-col gap-1.5">
            <div className="h-2.5 w-20 rounded-full bg-white/70" />
            <div className="h-1.5 w-14 rounded-full bg-white/40" />
            <div className="mk-cor mt-1 h-5 w-14 rounded-full" />
          </div>
        </Img>
      </Grupo>
      <Grupo className="mt-4 grid grid-cols-2 gap-2.5 @sm:grid-cols-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div key={i} variants={grupo} className="flex flex-col gap-1.5 rounded-xl bg-white/[0.03] p-1.5">
            <Img icone={icone} className="aspect-square rounded-lg" />
            <Barra clara className="h-1.5 w-4/5" />
            <div className="flex items-center justify-between">
              <motion.div variants={bloco} className="mk-cor h-2 w-8 rounded-full" />
              <Circulo cor className="size-4" />
            </div>
          </motion.div>
        ))}
      </Grupo>
      <Grupo className="mt-4">
        <Btn className="h-9 w-full" />
      </Grupo>
      <Rodape />
    </>
  );
}

/* ---------- Layout 3: cardápio em lista ---------- */
function LayoutCardapio({ icone }: { icone?: NomeIcone }) {
  const item = (i: number) => (
    <motion.div key={i} variants={grupo} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-2">
      <Img icone={icone} className="size-12 shrink-0 rounded-lg @sm:size-14" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Barra clara className="w-3/4" />
        <Barra className="h-1.5 w-full" />
        <Barra className="h-1.5 w-1/2" />
      </div>
      <motion.div variants={bloco} className="mk-cor h-2.5 w-9 shrink-0 rounded-full" />
    </motion.div>
  );
  return (
    <>
      <Nav icone={icone} />
      <Grupo className="relative">
        <Img className="h-24 @sm:h-28" />
        <Circulo cor icone={icone} className="absolute -bottom-5 left-1/2 size-11 -translate-x-1/2 ring-4 ring-[#0f1216]" />
      </Grupo>
      <Grupo className="mt-7 flex flex-col items-center gap-1.5">
        <Barra clara className="h-2.5 w-28" />
        <Barra className="h-1.5 w-20" />
      </Grupo>
      <Grupo className="mt-4 flex justify-center gap-1.5">
        <motion.div variants={bloco} className="mk-cor h-5 w-14 rounded-full" />
        <motion.div variants={bloco} className="h-5 w-14 rounded-full bg-white/[0.06]" />
        <motion.div variants={bloco} className="h-5 w-14 rounded-full bg-white/[0.06]" />
      </Grupo>
      <Grupo className="mt-4 flex flex-col gap-2">
        <Barra clara className="mb-1 h-2.5 w-24" />
        <div className="grid gap-2 @sm:grid-cols-2">{[0, 1, 2, 3].map(item)}</div>
      </Grupo>
      <Grupo className="mt-4 flex flex-col gap-2">
        <Barra clara className="mb-1 h-2.5 w-20" />
        <div className="grid gap-2 @sm:grid-cols-2">{[4, 5, 6, 7].map(item)}</div>
      </Grupo>
      <Rodape />
      <div className="sticky bottom-0 -mx-3 mt-2 bg-gradient-to-t from-[#0f1216] via-[#0f1216]/90 to-transparent px-3 pt-4 pb-3">
        <Grupo>
          <Btn className="h-9 w-full" />
        </Grupo>
      </div>
    </>
  );
}

/* ---------- Layout 4: agendamento / serviços em cards ---------- */
function LayoutAgendamento({ icone }: { icone?: NomeIcone }) {
  return (
    <>
      <Nav icone={icone} />
      <Grupo className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
        <Circulo cor icone={icone} className="size-12" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Barra clara className="h-2.5 w-3/4" />
          <Barra className="h-1.5 w-1/2" />
          <motion.div variants={bloco} className="flex gap-1 pt-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icone key={i} nome="estrela" className="mk-texto-cor size-2.5 fill-current" strokeWidth={0} />
            ))}
          </motion.div>
        </div>
      </Grupo>
      <Grupo className="mt-4 grid gap-2 @sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} variants={grupo} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-2.5">
            <Circulo icone={icone} className="size-8" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Barra clara className="w-2/3" />
              <Barra className="h-1.5 w-1/3" />
            </div>
            <Btn className="h-5 w-12" />
          </motion.div>
        ))}
      </Grupo>
      <Grupo className="mt-4 rounded-2xl bg-white/[0.03] p-3">
        <div className="mb-3 flex items-center justify-between">
          <Barra clara className="w-16" />
          <div className="flex gap-1.5">
            <Circulo className="size-4" />
            <Circulo className="size-4" />
          </div>
        </div>
        <motion.div variants={grupo} className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, i) => (
            <motion.div
              key={i}
              variants={bloco}
              className={`aspect-square rounded-md ${i === 10 ? "mk-cor" : i % 6 === 0 ? "bg-white/[0.02]" : "bg-white/[0.07]"}`}
            />
          ))}
        </motion.div>
      </Grupo>
      <Grupo className="mt-3 grid grid-cols-3 gap-1.5 @sm:grid-cols-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            variants={bloco}
            className={`h-6 rounded-full ${i === 1 ? "mk-cor" : "border border-white/10 bg-white/[0.03]"}`}
          />
        ))}
      </Grupo>
      <Grupo className="mt-4">
        <Btn className="h-9 w-full" />
      </Grupo>
      <Grupo className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <Img key={i} icone={icone} className="aspect-[4/5]" />
        ))}
      </Grupo>
      <Rodape />
    </>
  );
}

export const LAYOUTS = [
  { ...INFO_LAYOUTS[0], Componente: LayoutDestaque },
  { ...INFO_LAYOUTS[1], Componente: LayoutProdutos },
  { ...INFO_LAYOUTS[2], Componente: LayoutCardapio },
  { ...INFO_LAYOUTS[3], Componente: LayoutAgendamento },
] as const;

export const variantesGrupo = grupo;
