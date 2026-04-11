import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "../../src/hooks/use-reduced-motion";

describe("useReducedMotion", () => {
  function createMatchMediaMock(matches: boolean) {
    const listeners: Array<(e: { matches: boolean }) => void> = [];
    return {
      matches,
      listeners,
      addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
        listeners.push(fn);
      },
      removeEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
        const idx = listeners.indexOf(fn);
        if (idx > -1) listeners.splice(idx, 1);
      },
    };
  }

  let matchMediaMock: ReturnType<typeof createMatchMediaMock>;

  beforeEach(() => {
    matchMediaMock = createMatchMediaMock(false);
    window.matchMedia = () => matchMediaMock as unknown as MediaQueryList;
  });

  it("returns false when OS prefers motion", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when OS prefers reduced motion", () => {
    matchMediaMock = createMatchMediaMock(true);
    window.matchMedia = () => matchMediaMock as unknown as MediaQueryList;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns true when .bloom-reduced-motion class is on root", () => {
    document.documentElement.classList.add("bloom-reduced-motion");
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
    document.documentElement.classList.remove("bloom-reduced-motion");
  });
});
