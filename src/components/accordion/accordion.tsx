import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

export type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn("w-full", className)} {...props} />
));
Accordion.displayName = "Accordion";

export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-[var(--bloom-surface2)]", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between",
          "py-[var(--space-lg)]",
          "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] font-medium color-[var(--bloom-text)]",
          "cursor-pointer",
          "transition-all duration-[var(--bloom-duration-fast)]",
          "hover:color-[var(--bloom-accent1-deep)]",
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
          <path d="M4 6l4 4 4-4" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text-secondary)]",
        "data-[state=open]:animate-[bloom-accordion-open_var(--bloom-duration-fast)_var(--bloom-ease)]",
        "data-[state=closed]:animate-[bloom-accordion-close_var(--bloom-duration-fast)_var(--bloom-ease)]",
        className
      )}
      {...props}
    >
      <div className="pb-[var(--space-lg)]">{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = "AccordionContent";
