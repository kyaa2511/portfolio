"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { fadeUp, revealTransition } from "./variants";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Set false for opacity-only. */
  lift?: boolean;
}

/** On-mount entrance for above-the-fold content (no scroll trigger). */
export function FadeIn({ children, className, delay = 0, lift = true }: FadeInProps) {
  return (
    <m.div
      className={className}
      variants={
        lift ? fadeUp : { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      }
      initial="hidden"
      animate="visible"
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
