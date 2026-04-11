import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  ["inline-flex items-center gap-[var(--space-xs)]", "font-[family-name:var(--bloom-font)]"],
  {
    variants: {
      variant: {
        default: "border-b border-[var(--bloom-surface2)]",
        pill: ["bg-[var(--bloom-surface)] p-[var(--space-xs)]", "rounded-[var(--bloom-radius-pill)]"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TabsListVariants = Parameters<typeof tabsListVariants>[0];
