import { planos, type Plano } from "@/config/site";
import { Botao } from "./Botao";
import { Icone } from "./Icone";
import { Revelar } from "./Revelar";

/** Os cards de todos os planos do arquivo de configuração, lado a lado no desktop. */
export function ListaPlanos() {
  return (
    <ul className="mx-auto grid max-w-4xl items-stretch gap-6 pt-3 md:grid-cols-2">
      {planos.map((p, i) => (
        <Revelar como="li" key={p.nome} atraso={i * 0.08}>
          <CardPlano plano={p} />
        </Revelar>
      ))}
    </ul>
  );
}

export function CardPlano({ plano }: { plano: Plano }) {
  const temValor = /^\d/.test(plano.preco);
  const externo = plano.botao.href.startsWith("http");

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

      <p className="flex flex-col gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-white">
          {temValor ? <span className="mr-1 align-top text-xl">R$</span> : null}
          {plano.preco}
        </span>
        <span className="text-sm font-semibold text-suave">{plano.detalhePreco}</span>
      </p>

      <ul className="flex flex-col gap-3">
        {plano.itens.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-[#d6d9df]">
            <Icone nome="check" className="mt-0.5 size-4 shrink-0 text-destaque" strokeWidth={2.6} />
            {item}
          </li>
        ))}
      </ul>

      <Botao
        href={plano.botao.href}
        externo={externo}
        icone={externo ? "instagram" : undefined}
        iconeFim={externo ? undefined : "seta"}
        variante={plano.destaque ? "primario" : "secundario"}
        className="mt-auto w-full"
      >
        {plano.botao.texto}
      </Botao>
    </article>
  );
}
