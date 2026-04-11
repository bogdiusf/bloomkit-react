import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-[family-name:var(--bloom-font)] font-normal",
    "rounded-[var(--bloom-radius-pill)]",
    "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
    "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden cursor-pointer",
  ],
  {
    variants: {
      size: {
        sm: "h-[36px] px-[20px] text-[13px]",
        md: "h-[44px] px-[28px] text-[14px]",
        lg: "h-[52px] px-[36px] text-[16px]",
        icon: "h-[44px] w-[44px] p-0 text-[14px]",
      },
      variant: {
        primary: [
          "bg-[var(--bloom-accent1-deep)] text-white",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
        secondary: [
          "bg-[var(--bloom-surface)] text-[var(--bloom-text)]",
          "border border-[var(--bloom-surface2)]",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
        ghost: ["bg-transparent text-[var(--bloom-text)]", "hover:bg-[var(--bloom-surface)]", "active:scale-[0.98]"],
        accent: [
          "bg-[var(--bloom-accent3-deep)] text-white",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
        danger: [
          "bg-[var(--bloom-accent4-deep)] text-white",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
        warning: [
          "bg-[var(--bloom-accent2-deep)] text-white",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
        success: [
          "bg-[var(--bloom-accent1-deep)] text-white",
          "hover:-translate-y-[2px] hover:shadow-[var(--bloom-shadow-hover)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = Parameters<typeof buttonVariants>[0];
