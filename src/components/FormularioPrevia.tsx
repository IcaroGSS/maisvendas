"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { nichos, site } from "@/config/site";
import { linkWhatsApp } from "./BotaoWhatsApp";
import { Icone } from "./Icone";

const CORES = [
  { nome: "Verde", valor: "#22C55E" },
  { nome: "Azul", valor: "#3B82F6" },
  { nome: "Roxo", valor: "#8B5CF6" },
  { nome: "Rosa", valor: "#EC4899" },
  { nome: "Vermelho", valor: "#EF4444" },
  { nome: "Laranja", valor: "#F97316" },
  { nome: "Amarelo", valor: "#FACC15" },
  { nome: "Dourado", valor: "#C9A227" },
  { nome: "Preto", valor: "#111111" },
];

const SEM_PREFERENCIA = "sem-preferencia";
const OUTRA = "outra";

/** Copia texto. Tenta o jeito síncrono primeiro (mais confiável antes de abrir nova aba). */
function copiarSincrono(texto: string) {
  try {
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, texto.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

type Status = "inicial" | "copiado" | "falhou" | "whatsapp";

export function FormularioPrevia() {
  const [nome, setNome] = useState("");
  const [ramo, setRamo] = useState("");
  const [ramoOutro, setRamoOutro] = useState("");
  const [instagram, setInstagram] = useState("");
  const [cor, setCor] = useState(SEM_PREFERENCIA);
  const [corOutra, setCorOutra] = useState("#22C55E");
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState<Status>("inicial");
  const [mensagem, setMensagem] = useState("");
  const [copiouDeNovo, setCopiouDeNovo] = useState(false);
  const campoNome = useRef<HTMLInputElement>(null);
  const aviso = useRef<HTMLDivElement>(null);

  // Pré-seleciona o ramo quando vem de /previa-gratis?nicho=slug
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("nicho");
    if (slug && nichos.some((n) => n.slug === slug)) setRamo(slug);
  }, []);

  const montarMensagem = () => {
    const nomeRamo =
      ramo === OUTRA ? ramoOutro.trim() || "Outro" : nichos.find((n) => n.slug === ramo)?.nome ?? "não informado";
    const arroba = instagram.trim().replace(/^@+/, "");
    const corTexto =
      cor === SEM_PREFERENCIA
        ? "sem preferência"
        : cor === OUTRA
          ? corOutra.toUpperCase()
          : (CORES.find((c) => c.valor === cor)?.nome ?? cor);
    return `Olá! Quero minha prévia grátis. Negócio: ${nome.trim()}. Ramo: ${nomeRamo}. Instagram: ${arroba ? `@${arroba}` : "não informado"}. Cor preferida: ${corTexto}.`;
  };

  const validar = () => {
    if (!nome.trim()) {
      setErro("Escreva o nome do seu negócio.");
      campoNome.current?.focus();
      return false;
    }
    setErro("");
    return true;
  };

  // WhatsApp aceita a mensagem já escrita no link, então não precisa copiar.
  const enviarWhatsApp = () => {
    if (!validar()) return;
    const texto = montarMensagem();
    setMensagem(texto);
    setStatus("whatsapp");
    window.open(linkWhatsApp(texto), "_blank", "noopener,noreferrer");
  };

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    const texto = montarMensagem();
    setMensagem(texto);
    setCopiouDeNovo(false);

    let copiou = copiarSincrono(texto);
    if (!copiou && navigator.clipboard?.writeText) {
      copiou = true; // otimista; corrige se falhar
      navigator.clipboard.writeText(texto).catch(() => setStatus("falhou"));
    }
    setStatus(copiou ? "copiado" : "falhou");

    window.open(site.instagram.direct, "_blank", "noopener,noreferrer");
  };

  const copiarDeNovo = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(mensagem);
      ok = true;
    } catch {
      ok = copiarSincrono(mensagem);
    }
    if (ok) {
      setCopiouDeNovo(true);
      setStatus("copiado");
    }
  };

  useEffect(() => {
    if (status !== "inicial") aviso.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status, mensagem]);

  const campo =
    "h-13 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-base text-white placeholder:text-white/35 transition focus:border-white/40 focus:bg-white/[0.06] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={enviar} noValidate className="borda-cromada flex flex-col gap-6 rounded-[1.75rem] bg-[linear-gradient(180deg,#15181d,#0f1115)] p-5 sm:p-8">
        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-sm font-bold text-white">
            Nome do negócio <span className="text-destaque">*</span>
            <span className="sr-only"> (obrigatório)</span>
          </label>
          <input
            ref={campoNome}
            id="nome"
            name="nome"
            type="text"
            autoComplete="organization"
            required
            aria-required="true"
            aria-invalid={erro ? true : undefined}
            aria-describedby={erro ? "erro-nome" : undefined}
            placeholder="Ex.: Barbearia do Zé"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (erro) setErro("");
            }}
            className={`${campo} ${erro ? "border-red-400/70" : ""}`}
          />
          {erro ? (
            <p id="erro-nome" className="text-sm font-semibold text-red-300">
              {erro}
            </p>
          ) : null}
        </div>

        {/* Ramo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="ramo" className="text-sm font-bold text-white">
            Ramo
          </label>
          <div className="relative">
            <select
              id="ramo"
              name="ramo"
              value={ramo}
              onChange={(e) => setRamo(e.target.value)}
              className={`${campo} appearance-none pr-11 ${ramo ? "" : "text-white/50"}`}
            >
              <option value="">Selecione o seu ramo</option>
              {nichos.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.nome}
                </option>
              ))}
              <option value={OUTRA}>Outro</option>
            </select>
            <Icone nome="baixo" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-suave" strokeWidth={2.4} />
          </div>
          {ramo === OUTRA ? (
            <input
              id="ramo-outro"
              type="text"
              aria-label="Qual é o seu ramo?"
              placeholder="Qual é o seu ramo?"
              value={ramoOutro}
              onChange={(e) => setRamoOutro(e.target.value)}
              className={campo}
            />
          ) : null}
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2">
          <label htmlFor="instagram" className="text-sm font-bold text-white">
            @ do Instagram do negócio <span className="font-normal text-suave">(opcional)</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-white/50" aria-hidden="true">
              @
            </span>
            <input
              id="instagram"
              name="instagram"
              type="text"
              inputMode="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="seunegocio"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value.replace(/\s/g, ""))}
              className={`${campo} pl-9`}
            />
          </div>
        </div>

        {/* Cor */}
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-sm font-bold text-white">
            Cor preferida <span className="font-normal text-suave">(opcional)</span>
          </legend>
          <div className="flex flex-wrap items-center gap-2">
            <label
              className={`inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-destaque ${
                cor === SEM_PREFERENCIA ? "border-white bg-white text-fundo" : "border-white/15 text-suave hover:border-white/35"
              }`}
            >
              <input
                type="radio"
                name="cor"
                value={SEM_PREFERENCIA}
                checked={cor === SEM_PREFERENCIA}
                onChange={() => setCor(SEM_PREFERENCIA)}
                className="sr-only"
              />
              Sem preferência
            </label>
            {CORES.map((c) => (
              <label
                key={c.valor}
                title={c.nome}
                className={`grid size-10 cursor-pointer place-items-center rounded-full transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-destaque ${
                  cor === c.valor ? "ring-2 ring-white" : "hover:ring-2 hover:ring-white/30"
                }`}
              >
                <input
                  type="radio"
                  name="cor"
                  value={c.valor}
                  checked={cor === c.valor}
                  onChange={() => setCor(c.valor)}
                  className="sr-only"
                />
                <span className="sr-only">{c.nome}</span>
                <span className="size-7 rounded-full border border-white/15" style={{ background: c.valor }} aria-hidden="true" />
              </label>
            ))}
            <label
              className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border pr-1.5 pl-4 text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-destaque ${
                cor === OUTRA ? "border-white text-white" : "border-white/15 text-suave hover:border-white/35"
              }`}
            >
              <input type="radio" name="cor" value={OUTRA} checked={cor === OUTRA} onChange={() => setCor(OUTRA)} className="sr-only" />
              Outra
              <input
                type="color"
                aria-label="Escolher outra cor"
                value={corOutra}
                onChange={(e) => {
                  setCorOutra(e.target.value);
                  setCor(OUTRA);
                }}
                className="size-7 cursor-pointer rounded-full border-0 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-white/20 [&::-webkit-color-swatch-wrapper]:p-0 [&::-moz-color-swatch]:rounded-full"
              />
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-destaque px-6 text-base font-extrabold text-fundo shadow-[0_10px_34px_-10px_var(--destaque)] transition hover:brightness-110 active:brightness-95"
        >
          <Icone nome="instagram" className="size-5" strokeWidth={2.2} />
          Enviar pelo Direct
        </button>
        <button
          type="button"
          onClick={enviarWhatsApp}
          className="borda-cromada -mt-2 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white/[0.04] px-6 text-base font-bold text-white transition hover:bg-white/[0.08]"
        >
          <Icone nome="whatsapp" className="size-5" strokeWidth={2} />
          Enviar pelo WhatsApp
        </button>
        <p className="-mt-3 text-center text-xs leading-relaxed text-suave">
          Pelo Direct, a mensagem é copiada para você colar. Pelo WhatsApp, no {site.whatsapp.numero}, ela já vai escrita. Nenhum dado fica
          salvo neste site.
        </p>
      </form>

      {/* Aviso depois de enviar */}
      <div ref={aviso} role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "copiado" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 rounded-[1.5rem] border-2 border-destaque bg-[color-mix(in_oklab,var(--destaque)_14%,#0b0d10)] p-5 sm:p-6"
            >
              <p className="flex items-center gap-3 text-xl font-extrabold text-white">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-destaque text-fundo">
                  <Icone nome="check" className="size-5" strokeWidth={3} />
                </span>
                {copiouDeNovo ? "Copiada de novo!" : "Mensagem copiada!"} É só colar e enviar no Direct
              </p>
              <p className="rounded-2xl bg-black/30 p-4 text-sm leading-relaxed text-[#d6d9df]">{mensagem}</p>
              <p className="text-sm text-suave">
                O Direct não abriu?{" "}
                <a href={site.instagram.direct} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-4">
                  Abrir o Direct do @{site.instagram.usuario}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </p>
            </motion.div>
          ) : status === "whatsapp" ? (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 rounded-[1.5rem] border-2 border-destaque bg-[color-mix(in_oklab,var(--destaque)_14%,#0b0d10)] p-5 sm:p-6"
            >
              <p className="flex items-center gap-3 text-xl font-extrabold text-white">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-destaque text-fundo">
                  <Icone nome="check" className="size-5" strokeWidth={3} />
                </span>
                Mensagem pronta! É só tocar em enviar no WhatsApp
              </p>
              <p className="rounded-2xl bg-black/30 p-4 text-sm leading-relaxed text-[#d6d9df]">{mensagem}</p>
              <p className="text-sm text-suave">
                O WhatsApp não abriu?{" "}
                <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-4">
                  Abrir conversa com {site.whatsapp.numero}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </p>
            </motion.div>
          ) : status === "falhou" ? (
            <motion.div
              key="falhou"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 rounded-[1.5rem] border-2 border-white/30 bg-white/[0.04] p-5 sm:p-6"
            >
              <p className="text-lg font-extrabold text-white">Copie a mensagem abaixo e cole no Direct:</p>
              <p className="rounded-2xl bg-black/40 p-4 text-sm leading-relaxed text-[#e6e8ec] select-all">{mensagem}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copiarDeNovo}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-destaque px-6 font-extrabold text-fundo"
                >
                  <Icone nome="copiar" className="size-4" strokeWidth={2.4} />
                  Copiar
                </button>
                <a
                  href={site.instagram.direct}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="borda-cromada inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.04] px-6 font-bold text-white"
                >
                  <Icone nome="instagram" className="size-4" strokeWidth={2.2} />
                  Abrir o Direct
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
