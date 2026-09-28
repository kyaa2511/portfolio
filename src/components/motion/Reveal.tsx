"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { fadeUp, revealTransition, viewportOnce } from "./variants";

const tags = { div: m.div, li: m.li, article: m.article } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  as?: keyof typeof tags;
}

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = tags[as] as typeof m.div;

  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </Tag>
  );
}
