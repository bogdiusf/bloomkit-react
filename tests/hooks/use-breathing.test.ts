import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBreathing } from "../../src/hooks/use-breathing";

describe("useBreathing", () => {
  it("returns animation style with unique delay", () => {
    const { result } = renderHook(() => useBreathing());
    expect(result.current).toHaveProperty("animationDelay");
    expect(result.current).toHaveProperty("animationName", "bloom-breathe");
    expect(result.current).toHaveProperty("animationIterationCount", "infinite");
  });

  it("accepts custom duration", () => {
    const { result } = renderHook(() => useBreathing({ duration: 8 }));
    expect(result.current.animationDuration).toBe("8s");
  });

  it("generates different delays for different instances", () => {
    const { result: r1 } = renderHook(() => useBreathing());
    const { result: r2 } = renderHook(() => useBreathing());
    expect(r1.current.animationDelay).toBeDefined();
    expect(r2.current.animationDelay).toBeDefined();
  });
});
