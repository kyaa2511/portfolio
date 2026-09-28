import type { Transition, Variants } from "motion/react";

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealTransition: Transition = { duration: 0.65, ease: easeOut };

/** Small offset on purpose: entrances should be felt, not watched. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const wordUp: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

export const viewportOnce = {
  once: true,
  amount: "some",
  margin: "0px 0px -8% 0px",
} as const;
