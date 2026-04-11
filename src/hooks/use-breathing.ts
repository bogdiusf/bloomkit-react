import { useMemo } from "react";

interface UseBreathingOptions {
  duration?: number;
  animation?: string;
}

interface BreathingStyle {
  animationName: string;
  animationDuration: string;
  animationDelay: string;
  animationTimingFunction: string;
  animationIterationCount: string;
}

export function useBreathing(options?: UseBreathingOptions): BreathingStyle {
  const { duration = 6, animation = "bloom-breathe" } = options ?? {};

  return useMemo(() => {
    const delay = Math.random() * duration;
    return {
      animationName: animation,
      animationDuration: `${duration}s`,
      animationDelay: `${delay.toFixed(2)}s`,
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    };
  }, [duration, animation]);
}
