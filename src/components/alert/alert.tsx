import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { type AlertVariants, alertIconColors, alertVariants } from "./alert.variants";

export type AlertProps = HTMLAttributes<HTMLDivElement> & AlertVariants;

const variantIcons: Record<string, ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="alert-success-title">
      <title id="alert-success-title">Success</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.5L8.5 12.5L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="alert-error-title">
      <title id="alert-error-title">Error</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="alert-warning-title">
      <title id="alert-warning-title">Warning</title>
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-labelledby="alert-info-title">
      <title id="alert-info-title">Information</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <div className={cn("shrink-0 mt-px", alertIconColors[variant ?? "info"])}>{variantIcons[variant ?? "info"]}</div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        "font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-body)] font-medium color-[var(--bloom-text)]",
        className
      )}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-[length:var(--bloom-text-caption)] color-[var(--bloom-text-secondary)] mt-[var(--space-xs)]",
        className
      )}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";
