"use client";

import * as m from "motion/react-m";
import { easeOut, wordUp } from "./variants";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
  /** Words (exactly as they appear in `text`) rendered in the accent color. */
  accentWords?: readonly string[];
}

/**
 * Word-by-word masked entrance. The full text stays in the DOM as
 * screen-reader text, so the animation is presentation only.
 */
export function TextReveal({ text, className, delay = 0, accentWords = [] }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              <m.span
                className={
                  accentWords.includes(word) ? "inline-block text-accent" : "inline-block"
                }
                variants={wordUp}
                transition={{ duration: 0.75, ease: easeOut }}
              >
                {word}
              </m.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </span>
  );
}
