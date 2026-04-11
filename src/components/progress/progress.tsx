import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { progressFillVariants, progressTrackVariants } from "./progress.variants";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(progressTrackVariants(), className)}
      {...props}
    >
      <div className={progressFillVariants()} style={{ width: `${clampedValue}%` }}>
        {/* Animated glow sweep */}
        <div className="absolute inset-0 rounded-[var(--bloom-radius-pill)] overflow-hidden">
          <div className="absolute inset-y-0 w-[60%] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[bloom-sweep_2.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
});
Progress.displayName = "Progress";

export interface ProgressCircularProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
}

export const ProgressCircular = forwardRef<HTMLDivElement, ProgressCircularProps>(
  ({ className, value = 0, size = 48, strokeWidth = 4, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("inline-flex", className)}
        {...props}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <defs>
            <linearGradient
              id={`bloom-sweep-grad-${size}`}
              gradientUnits="userSpaceOnUse"
              x1={size / 2}
              y1="0"
              x2={size / 2}
              y2={size}
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values={`0 ${size / 2} ${size / 2};360 ${size / 2} ${size / 2}`}
                dur="2.5s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <mask id={`bloom-sweep-mask-${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </mask>
          </defs>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bloom-surface2)"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bloom-accent1-deep)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: `stroke-dashoffset var(--bloom-duration-slow) var(--bloom-ease)`,
            }}
          />
          {/* Sweep glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#bloom-sweep-grad-${size})`}
            strokeWidth={strokeWidth}
            mask={`url(#bloom-sweep-mask-${size})`}
          />
        </svg>
      </div>
    );
  }
);
ProgressCircular.displayName = "ProgressCircular";
