"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menuPrincipal, site } from "@/config/site";
import { Logo } from "./Logo";
import { Icone } from "./Icone";

function ativo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Fecha o menu ao trocar de página
  useEffect(() => setAberto(false), [pathname]);

  // Esc fecha o menu
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const fundo = rolou || aberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        fundo ? "border-b border-linha bg-fundo/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-destaque focus:px-4 focus:py-2 focus:font-bold focus:text-fundo"
      >
        Pular para o conteúdo
      </a>
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" aria-label={`${site.nome} — página inicial`} className="mr-auto rounded-lg py-1 pr-3">
          <Logo tamanho="sm" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {menuPrincipal.map((item) => {
            const atual = ativo(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={atual ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    atual ? "bg-white/[0.07] text-white" : "text-suave hover:text-white"
                  }`}
                >
                  {item.rotulo}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/previa-gratis"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-destaque px-4 text-sm font-bold text-fundo shadow-[0_6px_24px_-8px_var(--destaque)] transition hover:brightness-110 md:ml-3"
        >
          Prévia grátis
        </Link>

        <button
          ref={botaoMenu}
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-celular"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="grid size-10 place-items-center rounded-full border border-linha text-white md:hidden"
        >
          <Icone nome={aberto ? "fechar" : "menu"} className="size-5" strokeWidth={2.2} />
        </button>
      </nav>

      <AnimatePresence>
        {aberto ? (
          <motion.div
            id="menu-celular"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-linha md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {[...menuPrincipal, { rotulo: "Como funciona", href: "/como-funciona" }].map((item) => {
                const atual = ativo(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={atual ? "page" : undefined}
                      onClick={() => setAberto(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold ${
                        atual ? "bg-white/[0.07] text-white" : "text-suave"
                      }`}
                    >
                      {item.rotulo}
                      <Icone nome="direita" className="size-4 opacity-60" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
