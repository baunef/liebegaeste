"use client";

import { motion, useReducedMotion } from "framer-motion";
import { theme } from "@/config/theme";
import { site } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";

const tracking = theme.type.labelTracking;

export default function Eyebrow() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 300 112"
      width="300"
      height="112"
      role="img"
      aria-label={site.invite.eyebrow}
    >
      <defs>
        <path id="eyebrow-arc" d="M 22 120 A 165 165 0 0 1 278 120" fill="none" />
      </defs>
      <motion.text
        className="fill-current"
        initial={reduceMotion ? false : { letterSpacing: `${tracking + 0.06}em`, opacity: 0 }}
        animate={{ letterSpacing: `${tracking}em`, opacity: 1 }}
        transition={{ duration: 2, ease: EASE_OUT }}
      >
        <textPath
          href="#eyebrow-arc"
          startOffset="50%"
          textAnchor="middle"
          className="text-base uppercase"
        >
          {site.invite.eyebrow}
        </textPath>
      </motion.text>
    </svg>
  );
}
