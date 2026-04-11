import { cva } from "class-variance-authority";

export const alertVariants = cva(
  [
    "relative flex gap-[var(--space-md)] items-start",
    "rounded-[var(--bloom-radius-lg)] p-[var(--space-lg)]",
    "font-[family-name:var(--bloom-font)]",
    "border",
  ],
  {
    variants: {
      variant: {
        info: "bg-[var(--bloom-accent3)]/10 border-[var(--bloom-accent3)]/20",
        success: "bg-[var(--bloom-accent1)]/10 border-[var(--bloom-accent1)]/20",
        warning: "bg-[var(--bloom-accent2)]/10 border-[var(--bloom-accent2)]/20",
        error: "bg-[var(--bloom-accent4)]/10 border-[var(--bloom-accent4)]/20",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export const alertIconColors = {
  info: "color-[var(--bloom-accent3-deep)]",
  success: "color-[var(--bloom-accent1-deep)]",
  warning: "color-[var(--bloom-accent2-deep)]",
  error: "color-[var(--bloom-accent4-deep)]",
} as const;

export type AlertVariants = Parameters<typeof alertVariants>[0];
