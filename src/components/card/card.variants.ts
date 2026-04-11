import { cva } from "class-variance-authority";

export const cardVariants = cva(
  [
    "rounded-[var(--bloom-radius-lg)] bg-[var(--bloom-surface)]",
    "shadow-[var(--bloom-shadow)]",
    "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "",
        interactive: [
          "cursor-pointer",
          "border border-transparent",
          "hover:border-[var(--bloom-surface2)]",
          "hover:-translate-y-[4px] hover:shadow-[var(--bloom-shadow-hover)]",
        ],
        featured: [
          "border border-[var(--bloom-accent1)]/30",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type CardVariants = Parameters<typeof cardVariants>[0];
