import { cva } from "class-variance-authority";

export const progressTrackVariants = cva([
  "relative w-full overflow-hidden",
  "rounded-[var(--bloom-radius-pill)]",
  "bg-[var(--bloom-surface2)]",
  "h-[8px]",
]);

export const progressFillVariants = cva([
  "h-full rounded-[var(--bloom-radius-pill)]",
  "transition-[width] duration-[var(--bloom-duration-slow)] ease-[var(--bloom-ease)]",
  "bg-[var(--bloom-accent1-deep)]",
  "relative",
]);
