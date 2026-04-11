import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { type TabsListVariants, tabsListVariants } from "./tabs.variants";

export const Tabs = TabsPrimitive.Root;

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List> & TabsListVariants;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ variant }), className)} {...props} />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "px-[var(--space-lg)] py-[var(--space-sm)]",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)]",
        "color-[var(--bloom-text-secondary)]",
        "rounded-[var(--bloom-radius-pill)]",
        "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
        "hover:text-[var(--bloom-text)]",
        "data-[state=active]:text-[var(--bloom-text)]",
        "data-[state=active]:bg-[var(--bloom-surface2)]",
        "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("mt-[var(--space-lg)]", "focus-visible:outline-none", className)}
      {...props}
    />
  )
);
TabsContent.displayName = "TabsContent";
