"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** reducedMotion="user": desliga movimentos (mantém só fades) para quem pediu menos movimento no sistema. */
export function Provedores({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
