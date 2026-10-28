"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT } from "@/lib/motion";

/* Slow fade-in. With `inView` only once the block scrolls into view
   (once) — for sections that start below the fold. */
export default function Reveal({
  children,
  delay = 0,
  inView = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const shown = { opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0 }}
      {...(inView
        ? { whileInView: shown, viewport: { once: true, amount: 0.3 } }
        : { animate: shown })}
      transition={{ duration: 1.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
