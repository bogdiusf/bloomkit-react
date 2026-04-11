import "@testing-library/jest-dom/vitest";

// Polyfill ResizeObserver for jsdom (used by @radix-ui/react-slider and others)
if (typeof ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
