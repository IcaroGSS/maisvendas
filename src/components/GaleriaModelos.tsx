import { MockupEsqueleto } from "./mockup/MockupEsqueleto";
import { INFO_LAYOUTS as LAYOUTS } from "./mockup/info";

type Props = {
  /** Quais layouts mostrar (1 a 4). */
  layouts?: (1 | 2 | 3 | 4)[];
  /** Colunas no desktop. */
  colunas?: 2 | 3;
};

/** Galeria de mockups: carrossel deslizável no celular, grade no desktop. */
export function GaleriaModelos({ layouts = [1, 2, 3, 4], colunas = 2 }: Props) {
  return (
    <div>
      <ul
        className={`sem-barra -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 ${
          colunas === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
        aria-label="Modelos de site"
      >
        {layouts.map((n) => (
          <li key={n} className="cartao relative flex w-[86%] shrink-0 snap-center flex-col items-center gap-5 px-4 pt-6 pb-6 md:w-auto">
            <div className="flex w-full items-baseline justify-between gap-3 px-1">
              <h3 className="text-lg font-bold text-white">{LAYOUTS[n - 1].nome}</h3>
              <span className="text-xs text-suave">{LAYOUTS[n - 1].descricao}</span>
            </div>
            <MockupEsqueleto layout={n} larguraCelular={240} larguraNotebook={520} />
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center justify-center gap-2 text-xs text-suave md:hidden" aria-hidden="true">
        Deslize para o lado para ver mais →
      </p>
    </div>
  );
}
