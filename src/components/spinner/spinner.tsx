import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type SpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
};

const strokeMap: Record<SpinnerSize, number> = {
  sm: 2,
  md: 2.5,
  lg: 3,
};

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", label = "Loading", ...props }, ref) => {
    const pixelSize = sizeMap[size];
    const strokeWidth = strokeMap[size];
    const radius = (pixelSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // Draw ~75% of the circle — leaves a gap that creates the spinning illusion
    const dashLength = circumference * 0.75;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox={`0 0 ${pixelSize} ${pixelSize}`}
          className="animate-[bloom-spin_var(--bloom-duration-slow)_linear_infinite]"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke="var(--bloom-surface2)"
            strokeWidth={strokeWidth}
          />
          {/* Moving arc */}
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke="var(--bloom-accent1-deep)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dashLength} ${circumference}`}
            transform={`rotate(-90 ${pixelSize / 2} ${pixelSize / 2})`}
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";
