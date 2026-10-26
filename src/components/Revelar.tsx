"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  atraso?: number;
  className?: string;
  como?: "div" | "li" | "section";
};

/** Animação de entrada ao rolar: fade + subida leve. Respeita prefers-reduced-motion (via MotionConfig). */
export function Revelar({ children, atraso = 0, className, como = "div" }: Props) {
  const Comp = motion[como];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
