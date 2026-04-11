import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

export type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  placeholder?: string;
  className?: string;
};

export const Select = SelectPrimitive.Root;

export type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-between gap-[var(--space-sm)]",
        "h-[44px] w-full px-[var(--space-lg)]",
        "rounded-[var(--bloom-radius)] bg-[var(--bloom-surface)]",
        "border border-[var(--bloom-surface2)]",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)]",
        "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
        "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/20 focus-visible:border-[var(--bloom-accent1-deep)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder]:color-[var(--bloom-text-secondary)]",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = SelectPrimitive.Value;

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={8}
        className={cn(
          "bloom z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          "rounded-[var(--bloom-radius)]",
          "bg-[var(--bloom-surface)] p-[var(--space-xs)]",
          "shadow-[var(--bloom-shadow-hover)]",
          "border border-[var(--bloom-surface2)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]")}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center",
      "rounded-[var(--bloom-radius-sm)]",
      "px-[var(--space-md)] py-[var(--space-sm)] pl-[var(--space-2xl)]",
      "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)]",
      "cursor-pointer select-none outline-none",
      "transition-colors duration-[var(--bloom-duration-fast)]",
      "data-[highlighted]:bg-[var(--bloom-surface2)]",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    <span className="absolute left-[var(--space-sm)] flex h-[16px] w-[16px] items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 6l2.5 2.5 4.5-5" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("h-px my-[var(--space-xs)] bg-[var(--bloom-surface2)]", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
