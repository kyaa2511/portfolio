"use client";

import * as m from "motion/react-m";
import { easeOut, fadeUp, revealTransition, viewportOnce } from "@/components/motion/variants";

export interface JourneyStep {
  title: string;
  /** Where in the real site this step happens. */
  where: string;
  detail: string;
}

const drawLine = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1 },
};

/** Vertical path whose segments draw in as each step scrolls into view. Readable without motion. */
export function JourneyTimeline({ steps }: { steps: readonly JourneyStep[] }) {
  return (
    <ol>
      {steps.map((step, index) => (
        <m.li
          key={step.title}
          className="relative pb-10 pl-14 last:pb-0 sm:pl-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={revealTransition}
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-xs text-accent"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {index < steps.length - 1 ? (
            <>
              <span
                aria-hidden="true"
                className="absolute top-12 bottom-2 left-[calc(1.25rem-0.5px)] w-px bg-line"
              />
              <m.span
                aria-hidden="true"
                className="absolute top-12 bottom-2 left-[calc(1.25rem-0.5px)] w-px origin-top bg-accent/70"
                variants={drawLine}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
              />
            </>
          ) : null}

          <p className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">{step.where}</p>
          <h3 className="mt-1 text-xl font-medium tracking-tight">{step.title}</h3>
          <p className="mt-2 max-w-xl text-muted">{step.detail}</p>
        </m.li>
      ))}
    </ol>
  );
}
