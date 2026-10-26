"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Pergunta } from "@/config/site";
import { Icone } from "./Icone";

/** Perguntas frequentes em acordeão (abre/fecha com animação). */
export function FAQ({ perguntas }: { perguntas: Pergunta[] }) {
  const [aberta, setAberta] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="flex flex-col gap-3">
      {perguntas.map((p, i) => {
        const estaAberta = aberta === i;
        const idBotao = `${base}-b${i}`;
        const idPainel = `${base}-p${i}`;
        return (
          <div
            key={p.pergunta}
            className={`cartao overflow-hidden transition-colors ${estaAberta ? "border-white/20 bg-white/[0.04]" : ""}`}
          >
            <h3>
              <button
                id={idBotao}
                type="button"
                aria-expanded={estaAberta}
                aria-controls={idPainel}
                onClick={() => setAberta(estaAberta ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold text-white sm:px-6 sm:text-lg"
              >
                {p.pergunta}
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-linha transition duration-300 ${
                    estaAberta ? "rotate-180 bg-destaque text-fundo" : "text-suave"
                  }`}
                >
                  <Icone nome="baixo" className="size-4" strokeWidth={2.6} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {estaAberta ? (
                <motion.div
                  id={idPainel}
                  role="region"
                  aria-labelledby={idBotao}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-6 leading-relaxed text-suave sm:px-6">{p.resposta}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
