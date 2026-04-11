import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, title, description, children, className }: ModalProps) {
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
            "bloom fixed left-1/2 top-1/2 z-50",
            "-translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[480px]",
            "rounded-[var(--bloom-radius-lg)]",
            "bg-[var(--bloom-surface)] p-[var(--space-xl)]",
            "shadow-[var(--bloom-shadow-hover)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
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
              "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30"
            )}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
Modal.displayName = "Modal";
