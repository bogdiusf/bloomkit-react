import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("flex flex-col gap-[var(--space-sm)]", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  label?: string;
};

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, label, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const item = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        className={cn(
          "h-[20px] w-[20px] shrink-0 cursor-pointer",
          "rounded-full",
          "border border-[var(--bloom-surface2)]",
          "bg-[var(--bloom-surface)]",
          "transition-all duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]",
          "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-[var(--bloom-accent1-deep)]",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full">
          <span className="block h-[8px] w-[8px] rounded-full bg-[var(--bloom-accent1-deep)]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );

    if (!label) return item;

    return (
      <div className="inline-flex items-center gap-[var(--space-sm)]">
        {item}
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
RadioGroupItem.displayName = "RadioGroupItem";
