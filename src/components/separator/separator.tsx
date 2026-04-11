import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "shrink-0 bg-[var(--bloom-surface2)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";
