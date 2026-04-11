# @bloomkit/react

**Components that breathe.**

An ambient, organic React component library built for wellness apps, creative tools, journaling, meditation software, and any product where the interface should feel alive.

Soft shapes. Breathing motion. Living color.

**Docs & demos:** [bloomkit.dev](https://bloomkit.dev) • **GitHub:** [bogdiusf/bloomkit-react](https://github.com/bogdiusf/bloomkit-react)

> **Early days.** Bloomkit is actively evolving — components are being added and refined week by week. Feedback, issues, and ideas are very welcome.

## Install

```bash
pnpm add @bloomkit/react
```

## Setup

Import the stylesheet in your CSS entry file:

```css
@import "@bloomkit/react/styles.css";
```

Add the fonts to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Fraunces:opsz,wght@9..144,300;9..144,500&display=swap"
  rel="stylesheet"
/>
```

## Customization

All components accept a `className` prop. Tailwind utility classes merge cleanly with bloom's defaults — your classes always win.

```tsx
<Button variant="primary" className="rounded-full px-8">
  Custom Button
</Button>

<Card className="max-w-md">
  <CardContent>Custom styled card</CardContent>
</Card>
```

## Hooks

### useReducedMotion

Detects OS-level `prefers-reduced-motion` and the `.bloom-reduced-motion` class.

```tsx
import { useReducedMotion } from "@bloomkit/react";

const reduced = useReducedMotion();
```

### useBreathing

Returns an animation style with a randomized delay for the breathing effect.

```tsx
import { useBreathing } from "@bloomkit/react";

const style = useBreathing({ duration: 6 });
<div style={style}>Breathing element</div>
```

## Dark Mode

Wrap your app with `ThemeProvider` and use the `useTheme` hook:

```tsx
import { ThemeProvider, useTheme } from "@bloomkit/react";

<ThemeProvider defaultColorMode="system">
  <App />
</ThemeProvider>

function ThemeToggle() {
  const { resolvedMode, toggleColorMode } = useTheme();

  return (
    <button onClick={toggleColorMode}>
      {resolvedMode === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
```

### useTheme

| Property | Type | Description |
|----------|------|-------------|
| `colorMode` | `"light" \| "dark" \| "system"` | Current setting |
| `resolvedMode` | `"light" \| "dark"` | Resolved value (system preference applied) |
| `setColorMode` | `(mode) => void` | Set to `"dark"`, `"light"`, or `"system"` |
| `toggleColorMode` | `() => void` | Toggle between light and dark |
| `palette` | `string` | Active palette name |
| `setPalette` | `(name) => void` | Switch to a different palette |
| `palettes` | `string[]` | All available palette names |

The provider manages the `.dark` / `.light` class on `<html>` automatically and persists both color mode and palette choice to `localStorage`.

**Without the provider:** add the `dark` class or `data-theme="dark"` attribute to `<html>` manually, or let it follow the OS preference automatically (no setup needed).

## Palettes

### Built-in Presets

Bloom ships with 3 preset palettes:

```tsx
import { ThemeProvider, builtInPalettes } from "@bloomkit/react";

<ThemeProvider palettes={builtInPalettes}>
  <App />
</ThemeProvider>
```

Or import individually:

```tsx
import { midnightGarden, desertRose, oceanMist } from "@bloomkit/react";
```

| Preset | Fonts | Vibe |
|--------|-------|------|
| **Midnight Garden** | Playfair Display + Cormorant Garamond | Deep forest greens, moonlit silvers |
| **Desert Rose** | Lora + Karla | Terracotta, ochre, dried sage |
| **Ocean Mist** | Space Grotesk + Nunito | Cool aquas, seafoam, pearl whites |

### Custom Palettes

Define your own palettes and let users switch at runtime:

```tsx
import { ThemeProvider, useTheme, type BloomPalette } from "@bloomkit/react";

const myPalette: BloomPalette = {
  name: "ocean",
  light: {
    "--bloom-font": "'Nunito', sans-serif",
    "--bloom-font-display": "'Space Grotesk', sans-serif",
    "--bloom-bg": "#F4F8FA",
    "--bloom-surface": "#E8F0F4",
    "--bloom-surface2": "#D4E2EA",
    "--bloom-text": "#1A2E3A",
    "--bloom-text-secondary": "#5E7A8C",
    "--bloom-accent1": "#6AB8C4",
    "--bloom-accent1-deep": "#3A96A8",
    // ...
  },
  dark: {
    "--bloom-bg": "#0E1A20",
    "--bloom-surface": "#162228",
    // ...
  },
};

<ThemeProvider palettes={[myPalette]}>
  <App />
</ThemeProvider>

function PaletteSwitcher() {
  const { palette, setPalette, palettes } = useTheme();

  return (
    <select value={palette} onChange={(e) => setPalette(e.target.value)}>
      {palettes.map((name) => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  );
}
```

The `"bloom"` palette is always available as the default. Any value you don't specify falls back to Bloom's defaults.

## Design Tokens

| Token | What it controls |
|-------|-----------------|
| `--bloom-font` | Body font family |
| `--bloom-font-display` | Heading/display font family |
| `--bloom-bg` | Page background |
| `--bloom-surface` | Card, input, toast backgrounds |
| `--bloom-surface2` | Borders, dividers, hover states |
| `--bloom-text` | Primary text color |
| `--bloom-text-secondary` | Labels, descriptions, captions |
| `--bloom-accent1` / `--bloom-accent1-deep` | Primary/success color |
| `--bloom-accent2` / `--bloom-accent2-deep` | Warning color |
| `--bloom-accent3` / `--bloom-accent3-deep` | Info/accent color |
| `--bloom-accent4` / `--bloom-accent4-deep` | Danger/error color |
| `--bloom-shadow` / `--bloom-shadow-hover` | Elevation shadows |
| `--bloom-radius-sm` / `--bloom-radius` / `--bloom-radius-lg` / `--bloom-radius-pill` | Border radius |
| `--bloom-duration` / `--bloom-duration-slow` / `--bloom-duration-fast` | Animation timing |
| `--bloom-ease` | Easing curve |
| `--space-xs` through `--space-4xl` | Spacing scale |

## Contributing

Bloomkit is open source and contributions are genuinely welcome — whether that's a bug fix, a new component, a typo in the docs, or just an idea. No contribution is too small.

**Ways to help:**

- **Found a bug or have an idea?** [Open an issue](https://github.com/bogdiusf/bloomkit-react/issues)
- **Want to fix something?** Fork the repo, make your changes, and open a pull request
- **Building something with Bloom?** Share it — I'd love to see what people make

**Local setup:**

```bash
git clone https://github.com/bogdiusf/bloomkit-react.git
cd bloomkit-react
pnpm install
pnpm dev         # runs the playground at localhost:5173
pnpm test        # runs the test suite
pnpm build       # builds the library
```

The playground in [`dev/main.tsx`](dev/main.tsx) is where all components are showcased — add your component there while you build it.

## License

MIT © [Bogdan Filipovici](https://github.com/bogdiusf)

Free to use, modify, fork, and distribute. See [LICENSE](LICENSE) for details.
