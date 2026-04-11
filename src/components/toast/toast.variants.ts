import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "relative flex items-center gap-[var(--space-md)]",
    "w-full max-w-[380px]",
    "rounded-[var(--bloom-radius-lg)]",
    "p-[var(--space-lg)]",
    "shadow-[var(--bloom-shadow-hover)]",
    "border",
    "font-[family-name:var(--bloom-font)]",
    "overflow-hidden",
    "animate-in fade-in-0 slide-in-from-bottom-4",
  ],
  {
    variants: {
      variant: {
        info: "bg-[var(--bloom-surface)] border-[var(--bloom-surface2)]",
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

export type ToastVariants = Parameters<typeof toastVariants>[0];

export const toastIconColors = {
  info: "color-[var(--bloom-accent3-deep)]",
  success: "color-[var(--bloom-accent1-deep)]",
  warning: "color-[var(--bloom-accent2-deep)]",
  error: "color-[var(--bloom-accent4-deep)]",
} as const;
