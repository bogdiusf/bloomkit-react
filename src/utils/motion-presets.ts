import type { Transition, Variants } from "motion/react";

export const bloomTransition: Transition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
};

export const bloomTransitionSlow: Transition = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1],
};

export const bloomTransitionFast: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

export const bloomSpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

export const hoverLift: Variants = {
  initial: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1 },
  tap: { y: 0, scale: 0.98 },
};

export const cardHoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -4 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};
