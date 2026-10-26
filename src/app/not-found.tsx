import { Botao } from "@/components/Botao";
import { CabecalhoPagina } from "@/components/Secoes";

export default function NaoEncontrada() {
  return (
    <CabecalhoPagina selo="Erro 404" titulo="Essa página não existe" subtitulo="Mas o site do seu negócio pode existir. Que tal começar pela prévia grátis?">
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Botao href="/previa-gratis" iconeFim="seta">
          Quero minha prévia grátis
        </Botao>
        <Botao href="/" variante="secundario">
          Voltar ao início
        </Botao>
      </div>
    </CabecalhoPagina>
  );
}
