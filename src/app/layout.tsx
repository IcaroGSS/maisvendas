import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotaoFlutuante } from "@/components/BotaoInstagram";
import { Provedores } from "@/components/Provedores";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Sites para micro empresas | ${site.slogan}`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  applicationName: site.nome,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.nome} — ${site.slogan}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable} style={{ "--destaque": site.corDestaque } as CSSProperties}>
      <body className="font-sans">
        <Provedores>
          <Header />
          <main id="conteudo" className="relative isolate">
            {children}
          </main>
          <Footer />
          <BotaoFlutuante />
        </Provedores>
      </body>
    </html>
  );
}
