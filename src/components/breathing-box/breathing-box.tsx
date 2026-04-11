import { Slot } from "@radix-ui/react-slot";
import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface BreathingBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** The content to breathe. */
  children: ReactNode;
  /**
   * How pronounced the breathing scale is. `subtle` = 1.01, `soft` = 1.02,
   * `bold` = 1.04. Opacity never changes.
   * @default "soft"
   */
  intensity?: "subtle" | "soft" | "bold";
  /**
   * Length of one full breath cycle in seconds.
   * @default 6
   */
  duration?: number;
  /**
   * Delay before the animation starts, in seconds. Use this to stagger
   * multiple BreathingBoxes so they don't pulse in unison.
   * @default 0
   */
  delay?: number;
  /**
   * When `true`, merge the animation style into the child element via
   * Radix Slot instead of rendering a wrapper div. Same pattern as Button.
   * @default false
   */
  asChild?: boolean;
}

export const BreathingBox = forwardRef<HTMLDivElement, BreathingBoxProps>(
  ({ children, intensity = "soft", duration = 6, delay = 0, asChild = false, className, style, ...props }, ref) => {
    const animationStyle: CSSProperties = {
      animationName: `bloom-breathe-${intensity}`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    };

    const mergedStyle: CSSProperties = { ...style, ...animationStyle };

    if (asChild) {
      return (
        <Slot ref={ref} className={cn(className)} style={mergedStyle} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <div ref={ref} className={cn("inline-block", className)} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

BreathingBox.displayName = "BreathingBox";
