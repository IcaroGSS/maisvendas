"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { site } from "@/config/site";
import { Icone, type NomeIcone } from "../Icone";
import { LAYOUTS, variantesGrupo } from "./layouts";

export type Dispositivo = "celular" | "notebook";

export const CORES_MOCKUP = [
  { nome: "Destaque", valor: site.corDestaque },
  { nome: "Roxo", valor: "#8B5CF6" },
  { nome: "Azul", valor: "#3B82F6" },
  { nome: "Rosa", valor: "#EC4899" },
  { nome: "Laranja", valor: "#F59E0B" },
  { nome: "Prata", valor: "#D4D8DE" },
];

type Props = {
  /** Layout inicial: 1 destaque, 2 produtos, 3 cardápio, 4 agendamento. */
  layout?: 1 | 2 | 3 | 4;
  dispositivo?: Dispositivo;
  /** Ícone de nicho que aparece dentro dos blocos (tesoura, garfo, patinha...). */
  icone?: NomeIcone;
  /** Troca o layout sozinho a cada N segundos (para quando o usuário interage). */
  autoTrocar?: number;
  /** Mostra as bolinhas de cor, os botões 1-4 e a troca celular/notebook. */
  controles?: boolean;
  /** Largura máxima do celular, em px. */
  larguraCelular?: number;
  /** Largura máxima do notebook, em px. */
  larguraNotebook?: number;
  className?: string;
  /** Prioridade de montagem: monta imediatamente (ex.: topo da página). */
  imediato?: boolean;
};

const PROPORCAO_CELULAR = 2.05;
const PROPORCAO_NOTEBOOK = 0.63;

function limitar(v: number, min = -0.5, max = 0.5) {
  return Math.min(max, Math.max(min, v));
}

export function MockupEsqueleto({
  layout = 1,
  dispositivo: dispositivoInicial = "celular",
  icone,
  autoTrocar,
  controles = true,
  larguraCelular = 260,
  larguraNotebook = 620,
  className = "",
  imediato = false,
}: Props) {
  const id = useId();
  const reduzir = useReducedMotion();
  const palco = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLDivElement>(null);
  const visivel = useInView(palco, { amount: 0.25 });
  const jaApareceu = useInView(palco, { once: true, amount: 0.2 });

  const [indice, setIndice] = useState<number>(layout - 1);
  const [cor, setCor] = useState(CORES_MOCKUP[0].valor);
  const [dispositivo, setDispositivo] = useState<Dispositivo>(dispositivoInicial);
  const [interagiu, setInteragiu] = useState(false);
  const [largura, setLargura] = useState<number | null>(null);
  const [aviso, setAviso] = useState("");

  /* ---------- Medidas (para animar celular ↔ notebook em px) ---------- */
  useLayoutEffect(() => {
    const el = palco.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setLargura(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wCel = largura ? Math.min(largura * 0.8, larguraCelular) : 0;
  const hCel = wCel * PROPORCAO_CELULAR;
  const wNote = largura ? Math.min(largura, larguraNotebook) : 0;
  const hNote = wNote * PROPORCAO_NOTEBOOK;
  const ehCelular = dispositivo === "celular";

  /* ---------- Inclinação 3D + reflexo cromado ---------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 110, damping: 16, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const reflexoX = useTransform(sx, [-0.5, 0.5], [100, 0]);
  const reflexoY = useTransform(sy, [-0.5, 0.5], [80, 20]);
  const reflexoPos = useMotionTemplate`${reflexoX}% ${reflexoY}%`;
  const ultimaEntrada = useRef(0);

  const aoMover = (e: PointerEvent<HTMLDivElement>) => {
    if (reduzir || !palco.current) return;
    const r = palco.current.getBoundingClientRect();
    mx.set(limitar((e.clientX - r.left) / r.width - 0.5));
    my.set(limitar((e.clientY - r.top) / r.height - 0.5));
    ultimaEntrada.current = Date.now();
  };
  const aoSair = () => {
    mx.set(0);
    my.set(0);
  };

  // Giroscópio (celular). No iPhone precisa de permissão, pedida no primeiro toque.
  const pedirGiroscopio = useCallback(() => {
    const DOE = (globalThis as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
    if (DOE?.requestPermission) DOE.requestPermission().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (reduzir || !visivel) return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const aoOrientar = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      mx.set(limitar(e.gamma / 50));
      my.set(limitar((e.beta - 45) / 50));
      ultimaEntrada.current = Date.now();
    };
    window.addEventListener("deviceorientation", aoOrientar);

    // Sem giroscópio: balanço suave automático, para o mockup não ficar parado.
    let t = 0;
    const balanco = window.setInterval(() => {
      if (Date.now() - ultimaEntrada.current < 2500) return;
      t += 1;
      animate(mx, Math.sin(t / 2) * 0.28, { duration: 1.6, ease: "easeInOut" });
      animate(my, Math.cos(t / 3) * 0.18, { duration: 1.6, ease: "easeInOut" });
    }, 1600);

    return () => {
      window.removeEventListener("deviceorientation", aoOrientar);
      window.clearInterval(balanco);
    };
  }, [reduzir, visivel, mx, my]);

  /* ---------- Troca automática de layouts ---------- */
  useEffect(() => {
    if (!autoTrocar || reduzir || interagiu || !visivel) return;
    const t = window.setInterval(() => setIndice((i) => (i + 1) % LAYOUTS.length), autoTrocar * 1000);
    return () => window.clearInterval(t);
  }, [autoTrocar, reduzir, interagiu, visivel]);

  // Volta a rolagem interna para o topo ao trocar de layout
  useEffect(() => {
    tela.current?.scrollTo({ top: 0 });
  }, [indice]);

  const irPara = (i: number) => {
    const novo = (i + LAYOUTS.length) % LAYOUTS.length;
    setInteragiu(true);
    setIndice(novo);
    setAviso(`Layout ${novo + 1}: ${LAYOUTS[novo].nome}`);
  };

  const { Componente } = LAYOUTS[indice];
  const montar = imediato || jaApareceu;

  const estiloInicial: CSSProperties | undefined = largura
    ? undefined
    : { width: `min(80%, ${larguraCelular}px)`, aspectRatio: `1 / ${PROPORCAO_CELULAR}` };

  return (
    <figure className={`relative flex w-full flex-col items-center ${className}`}>
      <figcaption className="sr-only">
        Exemplo ilustrativo de site, sem informações reais, no layout {LAYOUTS[indice].nome} ({LAYOUTS[indice].descricao}), em{" "}
        {ehCelular ? "celular" : "notebook"}.
      </figcaption>

      {/* Palco: área que recebe o mouse/toque e define o espaço do mockup */}
      <div
        ref={palco}
        onPointerMove={aoMover}
        onPointerLeave={aoSair}
        onPointerDown={pedirGiroscopio}
        className="relative flex w-full items-center justify-center [perspective:1100px]"
        style={largura ? { height: hCel } : undefined}
      >
        <motion.div
          className="relative transition-[width,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] will-change-transform"
          style={{
            rotateX,
            rotateY,
            ...(largura ? { width: ehCelular ? wCel : wNote, height: ehCelular ? hCel : hNote } : estiloInicial),
          }}
        >
          {/* Moldura com borda cromada */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(145deg,#f4f5f7,#8b919b_30%,#2a2e35_55%,#c9cdd3_80%,#5c626b)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]"
            initial={false}
            animate={{ borderRadius: ehCelular ? 38 : 14 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-[1.5px] bg-[#07080a]"
            initial={false}
            animate={ehCelular ? { borderRadius: 36.5, padding: 7 } : { borderRadius: 12.5, padding: 9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Tela */}
            <motion.div
              className="mk-tela relative h-full w-full overflow-hidden"
              style={{ ["--mk" as string]: cor }}
              initial={false}
              animate={{ borderRadius: ehCelular ? 30 : 6 }}
              transition={{ duration: 0.5 }}
            >
              <div
                ref={tela}
                tabIndex={0}
                role="region"
                aria-label="Tela do exemplo — role para ver o site"
                className="sem-barra @container h-full overflow-y-auto overscroll-contain px-3 pt-7 pb-3 focus-visible:outline-offset-[-2px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={indice}
                    aria-hidden="true"
                    variants={variantesGrupo}
                    initial="hidden"
                    animate={montar ? "show" : "hidden"}
                    exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  >
                    <Componente icone={icone} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Notch do celular / câmera do notebook */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-2 left-1/2 h-[18px] -translate-x-1/2 rounded-full bg-[#07080a]"
                initial={false}
                animate={{ width: ehCelular ? 72 : 6, height: ehCelular ? 18 : 6, top: ehCelular ? 8 : 4 }}
                transition={{ duration: 0.5 }}
              />

              {/* Reflexo cromado passando por cima */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0.05) 52%, transparent 62%)",
                  backgroundSize: "260% 260%",
                  backgroundPosition: reflexoPos,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Base do notebook */}
          <motion.div
            aria-hidden="true"
            className="absolute top-full left-1/2 h-3 w-[116%] -translate-x-1/2 rounded-b-2xl bg-[linear-gradient(180deg,#d6d9de,#7d838c)] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.8)]"
            initial={false}
            animate={{ opacity: ehCelular ? 0 : 1, scaleX: ehCelular ? 0.4 : 1 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mx-auto h-1.5 w-16 rounded-b-lg bg-black/25" />
          </motion.div>
        </motion.div>
      </div>

      {controles ? (
        <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {/* Cores */}
          <div role="radiogroup" aria-label="Cor do exemplo" className="flex items-center gap-1.5">
            {CORES_MOCKUP.map((c) => {
              const selecionada = c.valor === cor;
              return (
                <button
                  key={c.valor}
                  type="button"
                  role="radio"
                  aria-checked={selecionada}
                  aria-label={`Cor ${c.nome}`}
                  onClick={() => {
                    setCor(c.valor);
                    setInteragiu(true);
                  }}
                  className={`grid size-8 place-items-center rounded-full transition ${selecionada ? "ring-2 ring-white/80" : "hover:ring-2 hover:ring-white/30"}`}
                >
                  <span className="size-5 rounded-full shadow-inner" style={{ background: c.valor }} />
                </button>
              );
            })}
          </div>

          {/* Layouts */}
          <div className="flex items-center gap-1 rounded-full border border-linha bg-white/[0.03] p-1" role="group" aria-label="Escolher layout">
            <button type="button" onClick={() => irPara(indice - 1)} aria-label="Layout anterior" className="grid size-8 place-items-center rounded-full text-suave hover:bg-white/10 hover:text-white">
              <Icone nome="esquerda" className="size-4" strokeWidth={2.4} />
            </button>
            {LAYOUTS.map((l, i) => (
              <button
                key={l.nome}
                type="button"
                onClick={() => irPara(i)}
                aria-pressed={i === indice}
                aria-label={`Layout ${i + 1}: ${l.nome}`}
                title={l.nome}
                className={`grid size-8 place-items-center rounded-full text-sm font-bold transition ${
                  i === indice ? "bg-white text-fundo" : "text-suave hover:bg-white/10 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" onClick={() => irPara(indice + 1)} aria-label="Próximo layout" className="grid size-8 place-items-center rounded-full text-suave hover:bg-white/10 hover:text-white">
              <Icone nome="direita" className="size-4" strokeWidth={2.4} />
            </button>
          </div>

          {/* Dispositivo */}
          <div className="flex items-center gap-1 rounded-full border border-linha bg-white/[0.03] p-1" role="group" aria-label="Dispositivo">
            {(["celular", "notebook"] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={dispositivo === d}
                aria-label={d === "celular" ? "Ver no celular" : "Ver no notebook"}
                onClick={() => {
                  setDispositivo(d);
                  setInteragiu(true);
                  setAviso(d === "celular" ? "Vendo no celular" : "Vendo no notebook");
                }}
                className={`grid h-8 w-10 place-items-center rounded-full transition ${
                  dispositivo === d ? "bg-white text-fundo" : "text-suave hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icone nome={d} className="size-4" strokeWidth={2.2} />
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite" id={`${id}-aviso`}>
            {aviso}
          </p>
        </div>
      ) : null}
    </figure>
  );
}
