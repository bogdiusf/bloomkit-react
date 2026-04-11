import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useIsMobile } from "../../src/hooks/use-is-mobile";

describe("useIsMobile", () => {
  function createMatchMediaMock(matches: boolean) {
    const listeners: Array<(e: { matches: boolean }) => void> = [];
    const mock = {
      matches,
      listeners,
      addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
        listeners.push(fn);
      },
      removeEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
        const idx = listeners.indexOf(fn);
        if (idx > -1) listeners.splice(idx, 1);
      },
      dispatch(next: boolean) {
        mock.matches = next;
        for (const fn of listeners) fn({ matches: next });
      },
    };
    return mock;
  }

  let matchMediaMock: ReturnType<typeof createMatchMediaMock>;

  beforeEach(() => {
    matchMediaMock = createMatchMediaMock(false);
    window.matchMedia = () => matchMediaMock as unknown as MediaQueryList;
  });

  it("returns false on wide viewports", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true on narrow viewports", () => {
    matchMediaMock = createMatchMediaMock(true);
    window.matchMedia = () => matchMediaMock as unknown as MediaQueryList;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when the viewport crosses the breakpoint", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      matchMediaMock.dispatch(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      matchMediaMock.dispatch(false);
    });
    expect(result.current).toBe(false);
  });

  it("queries the 768px breakpoint", () => {
    let queried = "";
    window.matchMedia = (query: string) => {
      queried = query;
      return matchMediaMock as unknown as MediaQueryList;
    };
    renderHook(() => useIsMobile());
    expect(queried).toContain("767px");
  });
});
