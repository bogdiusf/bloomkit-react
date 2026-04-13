import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed via props by the consumer
  <label
    ref={ref}
    className={cn(
      "text-[length:var(--bloom-text-body)] font-medium font-[family-name:var(--bloom-font)]",
      "color-[var(--bloom-text)] leading-none",
      "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
));

Label.displayName = "Label";
