import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Returns `true` when the viewport is narrower than 768px (Tailwind's `md` breakpoint).
 *
 * Uses `matchMedia` with a change listener so it reacts to browser resize and
 * device rotation without polling. Renders as `false` on the server and updates
 * on first client effect — safe to use inside any component without hydration
 * mismatches, as long as your server-rendered layout is the desktop variant.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = () => {
      setIsMobile(mq.matches);
    };

    handleChange();
    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobile;
}
