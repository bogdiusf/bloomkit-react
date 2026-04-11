import * as SwitchPrimitive from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface ToggleProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({ className, label, id: idProp, ...props }, ref) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const toggle = (
    <SwitchPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        "peer inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer items-center",
        "rounded-[var(--bloom-radius-pill)]",
        "border border-transparent",
        "bg-[var(--bloom-surface2)]",
        "transition-colors duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
        "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-[var(--bloom-accent1-deep)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-[22px] w-[22px] rounded-full bg-white",
          "shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
          "transition-transform duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]",
          "data-[state=unchecked]:translate-x-[3px]",
          "data-[state=checked]:translate-x-[25px]"
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (!label) return toggle;

  return (
    <div className="inline-flex items-center gap-[var(--space-md)]">
      {toggle}
      <label
        htmlFor={id}
        className="text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)] cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
});
Toggle.displayName = "Toggle";
