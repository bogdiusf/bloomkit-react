import { Slot } from "@radix-ui/react-slot";
import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface BreathingBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** The content to breathe. */
  children: ReactNode;
  /**
   * Peak scale factor at the top of the breath. Wins over `intensity` if both
   * are passed. Defaults to the value implied by `intensity` (1.02 when
   * `intensity` is unspecified).
   */
  scale?: number;
  /**
   * Preset shortcut for common scale values. `subtle` = 1.01, `soft` = 1.02,
   * `bold` = 1.04. Ignored when `scale` is passed explicitly.
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

const INTENSITY_SCALE: Record<NonNullable<BreathingBoxProps["intensity"]>, number> = {
  subtle: 1.01,
  soft: 1.02,
  bold: 1.04,
};

export const BreathingBox = forwardRef<HTMLDivElement, BreathingBoxProps>(
  (
    { children, scale, intensity = "soft", duration = 6, delay = 0, asChild = false, className, style, ...props },
    ref
  ) => {
    const resolvedScale = scale ?? INTENSITY_SCALE[intensity];

    const animationStyle: CSSProperties = {
      animationName: "bloom-breathe-soft",
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      // CSS custom property consumed by the bloom-breathe-soft keyframe.
      ["--bloom-breathe-scale" as string]: String(resolvedScale),
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
