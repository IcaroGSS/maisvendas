import Link from "next/link";
import { menuRodape, site } from "@/config/site";
import { Logo } from "./Logo";
import { BotaoInstagram } from "./BotaoInstagram";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-linha">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Logo tamanho="lg" />
          <p className="texto-cromado text-2xl font-extrabold tracking-tight">{site.slogan}</p>
          <div className="flex flex-col items-start gap-3">
            <BotaoInstagram>Fale comigo no Instagram</BotaoInstagram>
            <a
              href={site.instagram.perfil}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-sm font-semibold text-suave underline-offset-4 hover:text-white hover:underline"
            >
              Siga @{site.instagram.usuario}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {menuRodape.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded text-sm font-semibold text-suave hover:text-white">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-linha">
        <p className="mx-auto max-w-6xl px-4 py-6 pb-24 text-xs text-suave sm:px-6 md:pb-6">
          © {new Date().getFullYear()} {site.nome}. Sites para micro empresas.
        </p>
      </div>
    </footer>
  );
}
