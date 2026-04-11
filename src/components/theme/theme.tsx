import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

type ColorMode = "light" | "dark" | "system";

export interface BloomPalette {
  name: string;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

interface ThemeContextValue {
  colorMode: ColorMode;
  resolvedMode: "light" | "dark";
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  palette: string;
  setPalette: (name: string) => void;
  palettes: string[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveMode(mode: ColorMode): "light" | "dark" {
  if (mode === "system") return getSystemPreference();
  return mode;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultColorMode?: ColorMode;
  defaultPalette?: string;
  palettes?: BloomPalette[];
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultColorMode = "system",
  defaultPalette = "bloom",
  palettes = [],
  storageKey = "bloom-theme",
}: ThemeProviderProps) {
  const paletteMap = useRef(
    new Map<string, BloomPalette>([["bloom", { name: "bloom" }], ...palettes.map((p) => [p.name, p] as const)])
  );

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (typeof window === "undefined") return defaultColorMode;
    const stored = localStorage.getItem(`${storageKey}-mode`);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
    return defaultColorMode;
  });

  const [palette, setPaletteState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultPalette;
    const stored = localStorage.getItem(`${storageKey}-palette`);
    if (stored && paletteMap.current.has(stored)) return stored;
    return defaultPalette;
  });

  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(() => resolveMode(colorMode));

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      localStorage.setItem(`${storageKey}-mode`, mode);
    },
    [storageKey]
  );

  const setPalette = useCallback(
    (name: string) => {
      if (!paletteMap.current.has(name)) return;
      setPaletteState(name);
      localStorage.setItem(`${storageKey}-palette`, name);
    },
    [storageKey]
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedMode === "light" ? "dark" : "light");
  }, [resolvedMode, setColorMode]);

  // Apply color mode class + palette vars
  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveMode(colorMode);
    setResolvedMode(resolved);

    // Set dark/light class
    root.classList.remove("light", "dark");
    root.classList.add(resolved);

    // Collect all var keys from all palettes to clear
    const allKeys = new Set<string>();
    paletteMap.current.forEach((p) => {
      if (p.light) Object.keys(p.light).forEach((k) => allKeys.add(k));
      if (p.dark) Object.keys(p.dark).forEach((k) => allKeys.add(k));
    });
    allKeys.forEach((key) => root.style.removeProperty(key));

    // Apply current palette vars for resolved mode
    const currentPalette = paletteMap.current.get(palette);
    if (currentPalette) {
      const vars = resolved === "dark" ? currentPalette.dark : currentPalette.light;
      if (vars) {
        Object.entries(vars).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      }
    }
  }, [colorMode, palette]);

  // Listen for OS theme changes when in system mode
  useEffect(() => {
    if (colorMode !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = resolveMode("system");
      setResolvedMode(resolved);
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);

      // Re-apply palette for new mode
      const allKeys = new Set<string>();
      paletteMap.current.forEach((p) => {
        if (p.light) Object.keys(p.light).forEach((k) => allKeys.add(k));
        if (p.dark) Object.keys(p.dark).forEach((k) => allKeys.add(k));
      });
      allKeys.forEach((key) => root.style.removeProperty(key));

      const currentPalette = paletteMap.current.get(palette);
      if (currentPalette) {
        const vars = resolved === "dark" ? currentPalette.dark : currentPalette.light;
        if (vars) {
          Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
          });
        }
      }
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [colorMode, palette]);

  const paletteNames = Array.from(paletteMap.current.keys());

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        resolvedMode,
        setColorMode,
        toggleColorMode,
        palette,
        setPalette,
        palettes: paletteNames,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
