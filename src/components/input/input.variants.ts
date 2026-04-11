import { cva } from "class-variance-authority";

export const inputVariants = cva([
  "w-full",
  "rounded-[var(--bloom-radius)] bg-[var(--bloom-surface)]",
  "color-[var(--bloom-text)] text-[length:var(--bloom-text-body)]",
  "font-[family-name:var(--bloom-font)]",
  "px-[var(--space-lg)] py-[var(--space-md)]",
  "border border-[var(--bloom-surface2)]",
  "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
  "placeholder:color-[var(--bloom-text-secondary)]/60",
  "focus:outline-none focus:ring-[4px] focus:ring-[var(--bloom-accent1)]/20 focus:border-[var(--bloom-accent1-deep)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
]);
