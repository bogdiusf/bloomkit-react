import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Dropdown({ trigger, children, className }: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={8}
          className={cn(
            "bloom z-50 min-w-[180px] overflow-hidden",
            "rounded-[var(--bloom-radius)]",
            "bg-[var(--bloom-surface)] p-[var(--space-xs)]",
            "shadow-[var(--bloom-shadow-hover)]",
            "border border-[var(--bloom-surface2)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export interface DropdownItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {}

export function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex items-center",
        "rounded-[var(--bloom-radius-sm)]",
        "px-[var(--space-md)] py-[var(--space-sm)]",
        "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)]",
        "cursor-pointer select-none outline-none",
        "transition-colors duration-[var(--bloom-duration-fast)]",
        "data-[highlighted]:bg-[var(--bloom-surface2)]",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export interface DropdownSeparatorProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}

export function DropdownSeparator({ className, ...props }: DropdownSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("h-px my-[var(--space-xs)] bg-[var(--bloom-surface2)]", className)}
      {...props}
    />
  );
}
