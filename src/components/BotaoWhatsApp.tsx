import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Botao } from "./Botao";

/** Link do WhatsApp (wa.me), com mensagem opcional já escrita. */
export function linkWhatsApp(texto?: string) {
  const base = `https://wa.me/${site.whatsapp.internacional}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

type Props = {
  children?: ReactNode;
  texto?: string;
  variante?: "primario" | "secundario";
  tamanho?: "sm" | "md" | "lg";
  className?: string;
};

/** Botão que abre uma conversa no WhatsApp em nova aba. */
export function BotaoWhatsApp({
  children = `WhatsApp ${site.whatsapp.numero}`,
  texto = "Olá! Vim pelo site da MaisVendas.",
  variante = "secundario",
  tamanho = "md",
  className,
}: Props) {
  return (
    <Botao href={linkWhatsApp(texto)} externo icone="whatsapp" variante={variante} tamanho={tamanho} className={className}>
      {children}
    </Botao>
  );
}
