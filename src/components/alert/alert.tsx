import { forwardRef, type HTMLAttributes } from "react";
import { variantIconMap } from "../../icons/variant-icons";
import { cn } from "../../utils/cn";
import { type AlertVariants, alertIconColors, alertVariants } from "./alert.variants";

export type AlertProps = HTMLAttributes<HTMLDivElement> & AlertVariants;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => {
    const Icon = variantIconMap[variant ?? "info"];
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <div className={cn("shrink-0 mt-px", alertIconColors[variant ?? "info"])}>
          <Icon />
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  }
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
