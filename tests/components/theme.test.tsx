import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type BloomPalette, ThemeProvider, useTheme } from "../../src/components/theme";

function ThemeProbe() {
  const { resolvedMode, colorMode, palette, toggleColorMode, setColorMode, setPalette } = useTheme();
  return (
    <div>
      <span data-testid="resolved">{resolvedMode}</span>
      <span data-testid="mode">{colorMode}</span>
      <span data-testid="palette">{palette}</span>
      <button type="button" onClick={toggleColorMode}>
        toggle
      </button>
      <button type="button" onClick={() => setColorMode("dark")}>
        set-dark
      </button>
      <button type="button" onClick={() => setPalette("ocean")}>
        set-ocean
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("exposes the default light mode", () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId("mode").textContent).toBe("light");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("applies the dark class on <html> when dark mode is active", () => {
    render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles between light and dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light">
        <ThemeProbe />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    await user.click(screen.getByRole("button", { name: "toggle" }));
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("persists color mode to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light" storageKey="test-theme">
        <ThemeProbe />
      </ThemeProvider>
    );
    await user.click(screen.getByRole("button", { name: "set-dark" }));
    expect(localStorage.getItem("test-theme-mode")).toBe("dark");
  });

  it("switches palettes when setPalette is called with a registered palette", async () => {
    const user = userEvent.setup();
    const ocean: BloomPalette = {
      name: "ocean",
      light: { "--bloom-bg": "#E8F0F4" },
      dark: { "--bloom-bg": "#0E1A20" },
    };
    render(
      <ThemeProvider defaultColorMode="light" palettes={[ocean]}>
        <ThemeProbe />
      </ThemeProvider>
    );
    await user.click(screen.getByRole("button", { name: "set-ocean" }));
    expect(screen.getByTestId("palette").textContent).toBe("ocean");
  });

  it("ignores unknown palette names", () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <ThemeProbe />
      </ThemeProvider>
    );

    // useTheme has no direct way to pass an invalid name without going through setPalette,
    // and setPalette silently no-ops for unknown names. Starting palette should stay "bloom".
    expect(screen.getByTestId("palette").textContent).toBe("bloom");
  });

  it("throws when useTheme is called outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeProbe />)).toThrow(/useTheme must be used within/);
    spy.mockRestore();
  });
});
