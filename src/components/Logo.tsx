type Props = { className?: string; tamanho?: "sm" | "md" | "lg" };

const tamanhos = {
  sm: { texto: "text-[1.6rem]", brilho: "size-2.5 -right-2.5 top-0.5" },
  md: { texto: "text-[2rem]", brilho: "size-3 -right-3 top-0.5" },
  lg: { texto: "text-[3.25rem]", brilho: "size-5 -right-5 top-1" },
};

/** Logo "mv" em branco, minúsculo, com um brilho ✦ no canto superior direito. */
export function Logo({ className = "", tamanho = "md" }: Props) {
  const t = tamanhos[tamanho];
  return (
    <span className={`relative inline-flex select-none items-start leading-none ${className}`}>
      <span className={`${t.texto} font-extrabold lowercase tracking-[-0.06em] text-white`}>mv</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute ${t.brilho} drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]`}
      >
        <path
          fill="#fff"
          d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
        />
      </svg>
    </span>
  );
}
