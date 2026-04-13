import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} className={cn("w-full", className)} {...props} />
));
Collapsible.displayName = "Collapsible";

export type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between",
        "py-[var(--space-md)]",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] font-medium color-[var(--bloom-text)]",
        "cursor-pointer",
        "transition-all duration-[var(--bloom-duration-fast)]",
        "hover:color-[var(--bloom-accent1-deep)]",
        "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 transition-transform duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]"
        aria-hidden="true"
      >
        <title>Toggle</title>
        <path d="M4 6l4 4 4-4" />
      </svg>
    </CollapsiblePrimitive.Trigger>
  )
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text-secondary)]",
        "data-[state=open]:animate-[bloom-collapsible-open_var(--bloom-duration-fast)_var(--bloom-ease)]",
        "data-[state=closed]:animate-[bloom-collapsible-close_var(--bloom-duration-fast)_var(--bloom-ease)]",
        className
      )}
      {...props}
    >
      <div className="pb-[var(--space-md)]">{children}</div>
    </CollapsiblePrimitive.Content>
  )
);
CollapsibleContent.displayName = "CollapsibleContent";
