import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../button";

export interface AlertDialogProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the open state should change. */
  onOpenChange: (open: boolean) => void;
  /** Title shown at the top of the dialog. Required — alerts must have a title. */
  title: string;
  /** Optional secondary description under the title. */
  description?: string;
  /**
   * Optional custom body rendered between the description and the action row.
   * Use for rare cases where title + description isn't enough; most alerts
   * should leave this empty.
   */
  children?: ReactNode;
  /** Text on the confirm button. Defaults to "Confirm". */
  confirmLabel?: string;
  /** Text on the cancel button. Defaults to "Cancel". */
  cancelLabel?: string;
  /**
   * Visual variant of the confirm action. `"default"` = primary button,
   * `"danger"` = destructive red button. Use `"danger"` for delete/remove
   * confirmations.
   * @default "default"
   */
  variant?: "default" | "danger";
  /** Called when the user confirms. */
  onConfirm?: () => void;
  /** Called when the user cancels. */
  onCancel?: () => void;
  /** Extra Tailwind classes merged onto the dialog content. */
  className?: string;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  className,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <AlertDialogPrimitive.Content
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
          <AlertDialogPrimitive.Title className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)] mb-[var(--space-sm)]">
            {title}
          </AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="text-[length:var(--bloom-text-body)] color-[var(--bloom-text-secondary)] mb-[var(--space-lg)]">
              {description}
            </AlertDialogPrimitive.Description>
          )}
          {children}
          <div className="flex justify-end gap-[var(--space-sm)] mt-[var(--space-lg)]">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="ghost" onClick={onCancel}>
                {cancelLabel}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button variant={variant === "danger" ? "danger" : "primary"} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
AlertDialog.displayName = "AlertDialog";
