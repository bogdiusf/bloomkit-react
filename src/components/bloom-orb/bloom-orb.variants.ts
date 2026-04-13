import { cva } from "class-variance-authority";

export const bloomOrbVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "font-[family-name:var(--bloom-font)]",
    "color-[var(--bloom-text)]",
    "select-none",
    "shadow-[var(--bloom-shadow)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[40px] w-[40px] text-[length:var(--bloom-text-caption)]",
        md: "h-[64px] w-[64px] text-[length:var(--bloom-text-body)]",
        lg: "h-[96px] w-[96px] text-[length:var(--bloom-text-subheading)]",
        xl: "h-[140px] w-[140px] text-[length:var(--bloom-text-heading)]",
      },
      color: {
        accent1: "bg-[linear-gradient(135deg,var(--bloom-accent1-deep),var(--bloom-accent1))] text-white",
        accent2: "bg-[linear-gradient(135deg,var(--bloom-accent2-deep),var(--bloom-accent2))] text-white",
        accent3: "bg-[linear-gradient(135deg,var(--bloom-accent3-deep),var(--bloom-accent3))] text-white",
        accent4: "bg-[linear-gradient(135deg,var(--bloom-accent4-deep),var(--bloom-accent4))] text-white",
      },
    },
    defaultVariants: {
      size: "md",
      color: "accent1",
    },
  }
);

export type BloomOrbVariants = Parameters<typeof bloomOrbVariants>[0];
