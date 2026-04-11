import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasClass = document.documentElement.classList.contains("bloom-reduced-motion");
    return mq.matches || hasClass;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      const hasClass = document.documentElement.classList.contains("bloom-reduced-motion");
      setReduced(mq.matches || hasClass);
    };

    mq.addEventListener("change", handleChange);

    const observer = new MutationObserver(() => {
      const hasClass = document.documentElement.classList.contains("bloom-reduced-motion");
      setReduced(mq.matches || hasClass);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mq.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  return reduced;
}
