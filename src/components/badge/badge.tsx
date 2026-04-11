import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { type BadgeVariants, badgeVariants } from "./badge.variants";

const dotColorMap = {
  sage: "bg-[var(--bloom-accent1-deep)]",
  sand: "bg-[var(--bloom-accent2-deep)]",
  lavender: "bg-[var(--bloom-accent3-deep)]",
  rose: "bg-[var(--bloom-accent4-deep)]",
} as const;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  BadgeVariants & {
    dot?: boolean;
  };

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "sage", dot = false, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          data-bloom-dot=""
          className={cn(
            "h-[6px] w-[6px] rounded-full",
            "animate-[bloom-breathe_5s_ease-in-out_infinite]",
            dotColorMap[variant ?? "sage"]
          )}
        />
      )}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";
