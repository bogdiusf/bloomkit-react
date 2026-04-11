import { type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";

export type DrawerSide = "right" | "left" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  side?: DrawerSide;
  className?: string;
}

const slideIn: Record<DrawerSide, string> = {
  right: "data-[state=open]:slide-in-from-right",
  left: "data-[state=open]:slide-in-from-left",
  top: "data-[state=open]:slide-in-from-top",
  bottom: "data-[state=open]:slide-in-from-bottom",
};

const slideOut: Record<DrawerSide, string> = {
  right: "data-[state=closed]:slide-out-to-right",
  left: "data-[state=closed]:slide-out-to-left",
  top: "data-[state=closed]:slide-out-to-top",
  bottom: "data-[state=closed]:slide-out-to-bottom",
};

const sidePosition: Record<DrawerSide, string> = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const sideSize: Record<DrawerSide, string> = {
  right: "h-full w-full max-w-[400px]",
  left: "h-full w-full max-w-[400px]",
  top: "w-full",
  bottom: "w-full",
};

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
  className,
}: DrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "bloom fixed z-50",
            sidePosition[side],
            sideSize[side],
            "bg-[var(--bloom-surface)] p-[var(--space-xl)]",
            "shadow-[var(--bloom-shadow-hover)]",
            "border-[var(--bloom-surface2)]",
            side === "right" && "border-l",
            side === "left" && "border-r",
            side === "top" && "border-b",
            side === "bottom" && "border-t",
            "data-[state=open]:animate-in data-[state=open]:duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:duration-200",
            slideIn[side],
            slideOut[side],
            "focus:outline-none",
            className
          )}
        >
          {title && (
            <DialogPrimitive.Title className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)] mb-[var(--space-sm)]">
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className="text-[length:var(--bloom-text-body)] color-[var(--bloom-text-secondary)] mb-[var(--space-lg)]">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close
            className={cn(
              "absolute top-[var(--space-lg)] right-[var(--space-lg)]",
              "inline-flex items-center justify-center",
              "h-[32px] w-[32px] rounded-full",
              "color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)]",
              "hover:bg-[var(--bloom-surface2)]",
              "transition-colors duration-[var(--bloom-duration-fast)]",
              "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/30"
            )}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
