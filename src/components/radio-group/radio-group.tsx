import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-[var(--space-sm)]", className)}
      {...props}
    />
  )
);
RadioGroup.displayName = "RadioGroup";

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  label?: string;
};

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, label, ...props }, ref) => {
    const item = (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "h-[20px] w-[20px] shrink-0 cursor-pointer",
          "rounded-full",
          "border border-[var(--bloom-surface2)]",
          "bg-[var(--bloom-surface)]",
          "transition-all duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]",
          "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/30",
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
      <label className="inline-flex items-center gap-[var(--space-sm)] cursor-pointer">
        {item}
        <span className="text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)]">
          {label}
        </span>
      </label>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
