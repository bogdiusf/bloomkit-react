import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Label text shown above the field. */
  label?: string;
  /** Associates the label with an input via `htmlFor`. Should match the input's `id`. */
  htmlFor?: string;
  /** Helper text shown below the field in a muted tone. Hidden when `error` is present. */
  hint?: string;
  /** Error message shown below the field. Overrides `hint` and styles the label red. */
  error?: string;
  /** Whether the field is required — appends an asterisk to the label. */
  required?: boolean;
  /** The form control(s). */
  children?: ReactNode;
}

// ─── FormField ────────────────────────────────────────────────────────────────

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, htmlFor, hint, error, required, children, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div ref={ref} className={cn("flex flex-col gap-[var(--space-xs)]", className)} {...props}>
        {label && (
          <label
            htmlFor={htmlFor}
            className={cn(
              "text-[length:var(--bloom-text-body)] font-medium font-[family-name:var(--bloom-font)]",
              hasError ? "color-[var(--bloom-accent4-deep)]" : "color-[var(--bloom-text)]"
            )}
          >
            {label}
            {required && (
              <span aria-hidden="true" className="ml-[var(--space-xs)] color-[var(--bloom-accent4-deep)]">
                *
              </span>
            )}
          </label>
        )}

        {children}

        {hasError ? (
          <p role="alert" className="text-[length:var(--bloom-text-body)] color-[var(--bloom-accent4-deep)] m-0">
            {error}
          </p>
        ) : hint ? (
          <p className="text-[length:var(--bloom-text-body)] color-[var(--bloom-text-secondary)] m-0">{hint}</p>
        ) : null}
      </div>
    );
  }
);

FormField.displayName = "FormField";
