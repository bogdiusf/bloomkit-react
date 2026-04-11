import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        style={{ borderRadius: "var(--bloom-radius-checkbox)" }}
        className={cn(
          "peer h-[20px] w-[20px] shrink-0 cursor-pointer",
          "border border-[var(--bloom-surface2)]",
          "bg-[var(--bloom-surface)]",
          "transition-all duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]",
          "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--bloom-accent1-deep)] data-[state=checked]:border-[var(--bloom-accent1-deep)]",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 6l2.5 2.5 4.5-5" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label) return checkbox;

    return (
      <div className="inline-flex items-center gap-[var(--space-sm)]">
        {checkbox}
        <label
          htmlFor={id}
          className="text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)] cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
