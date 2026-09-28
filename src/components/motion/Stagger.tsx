"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { fadeUp, revealTransition, viewportOnce } from "./variants";

const containerTags = { div: m.div, ul: m.ul, ol: m.ol } as const;
const itemTags = { div: m.div, li: m.li } as const;

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof containerTags;
  /** Seconds between children. */
  stagger?: number;
  /** Seconds before the first child. */
  delay?: number;
}

/** Reveals its `StaggerItem` children in sequence once scrolled into view. */
export function StaggerContainer({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  const Tag = containerTags[as] as typeof m.div;

  return (
    <Tag
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof itemTags;
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Tag = itemTags[as] as typeof m.div;

  return (
    <Tag className={className} variants={fadeUp} transition={revealTransition}>
      {children}
    </Tag>
  );
}
