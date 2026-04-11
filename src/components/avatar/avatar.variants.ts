import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full overflow-hidden",
    "bg-[var(--bloom-accent1)]/20 text-[var(--bloom-accent1-deep)]",
    "font-[family-name:var(--bloom-font)] font-medium",
    "select-none shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "h-[32px] w-[32px] text-[var(--bloom-text-micro)]",
        md: "h-[40px] w-[40px] text-[var(--bloom-text-caption)]",
        lg: "h-[56px] w-[56px] text-[var(--bloom-text-body)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type AvatarVariants = Parameters<typeof avatarVariants>[0];
