import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-[var(--space-xs)]",
    "rounded-[var(--bloom-radius-pill)]",
    "px-[var(--space-md)] py-[var(--space-xs)]",
    "text-[var(--bloom-text-micro)] font-medium font-[family-name:var(--bloom-font)]",
    "tracking-[var(--bloom-letter-wide)] uppercase",
  ],
  {
    variants: {
      variant: {
        sage: "bg-[var(--bloom-accent1)]/20 text-[var(--bloom-accent1-deep)]",
        sand: "bg-[var(--bloom-accent2)]/20 text-[var(--bloom-accent2-deep)]",
        lavender: "bg-[var(--bloom-accent3)]/20 text-[var(--bloom-accent3-deep)]",
        rose: "bg-[var(--bloom-accent4)]/20 text-[var(--bloom-accent4-deep)]",
      },
    },
    defaultVariants: {
      variant: "sage",
    },
  }
);

export type BadgeVariants = Parameters<typeof badgeVariants>[0];
