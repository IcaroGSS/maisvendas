import { site, type Plano } from "@/config/site";
import { Botao } from "./Botao";
import { Icone } from "./Icone";

export function CardPlano({ plano }: { plano: Plano }) {
  return (
    <article
      className={`relative flex h-full flex-col gap-6 rounded-3xl p-6 sm:p-7 ${
        plano.destaque
          ? "borda-cromada bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_30px_80px_-40px_rgba(255,255,255,0.35)]"
          : "cartao"
      }`}
    >
      {plano.destaque ? (
        <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1 rounded-full bg-destaque px-3 py-1 text-xs font-extrabold text-fundo">
          <Icone nome="estrela" className="size-3 fill-current" strokeWidth={0} />
          Mais escolhido
        </span>
      ) : null}

      <header className="flex flex-col gap-2">
        <h3 className={`text-xl font-extrabold ${plano.destaque ? "texto-cromado" : "text-white"}`}>{plano.nome}</h3>
        <p className="text-sm text-suave">{plano.descricao}</p>
      </header>

      {/^\d/.test(plano.preco) ? (
        <p className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-suave uppercase">a partir de</span>
          <span className="text-4xl font-extrabold tracking-tight text-white">
            <span className="mr-1 text-xl align-top">R$</span>
            {plano.preco}
          </span>
        </p>
      ) : (
        <p className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-suave uppercase">Valor</span>
          <span className="text-3xl font-extrabold tracking-tight text-white">{plano.preco}</span>
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {plano.itens.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-[#d6d9df]">
            <Icone nome="check" className="mt-0.5 size-4 shrink-0 text-destaque" strokeWidth={2.6} />
            {item}
          </li>
        ))}
      </ul>

      <Botao
        href={site.instagram.direct}
        externo
        icone="instagram"
        variante={plano.destaque ? "primario" : "secundario"}
        className="mt-auto w-full"
        ariaLabel={`Quero o plano ${plano.nome}`}
      >
        Quero este plano
      </Botao>
    </article>
  );
}
