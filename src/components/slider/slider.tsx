import * as SliderPrimitive from "@radix-ui/react-slider";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(({ className, disabled, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    disabled={disabled}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-[6px] w-full grow overflow-hidden",
        "rounded-[var(--bloom-radius-pill)]",
        "bg-[var(--bloom-surface2)]"
      )}
    >
      <SliderPrimitive.Range
        className={cn("absolute h-full", "bg-[var(--bloom-accent1-deep)]", "rounded-[var(--bloom-radius-pill)]")}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-disabled={disabled ? true : undefined}
      className={cn(
        "block h-[24px] w-[24px] rounded-full",
        "bg-white border-[2px] border-[var(--bloom-accent1-deep)]",
        "shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
        "transition-transform duration-[var(--bloom-duration-fast)] ease-[var(--bloom-ease)]",
        "hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/30",
        "cursor-grab active:cursor-grabbing"
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
