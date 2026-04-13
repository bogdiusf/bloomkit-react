# @bloomkit/react

**Components that breathe.**

An ambient, organic React component library built for wellness apps, creative tools, journaling, meditation software, and any product where the interface should feel alive.

Soft shapes. Breathing motion. Living color.

**Docs & demos:** [bloomkit.dev](https://bloomkit.dev) • **GitHub:** [bogdiusf/bloomkit-react](https://github.com/bogdiusf/bloomkit-react)

> **Early days.** Bloomkit is actively evolving — components are being added and refined week by week. Feedback, issues, and ideas are very welcome.

## What's in the box

**Signature components** — `BreathingBox`, `BloomOrb`, and more coming. Morphing blobs, breathing motion, living color. Ambient decoration that makes an interface feel calm and alive. Every signature component with an animation exposes its animation parameters as props, so you're never stuck with a default cadence. Shape sequences are randomized per-instance (SSR-safe) so no two orbs look alike. **You won't find these in shadcn or Radix — they're why bloomkit exists.**

**The usual primitives** — `Button`, `Input`, `Card`, `Modal`, `AlertDialog`, `Select`, `Tabs`, `Accordion`, `Collapsible`, and the rest of the toolkit every React app needs. Accessible, themeable, Radix-backed where it matters. These exist so bloomkit is a complete library, not just a decoration pack.

Import one or both. The JS tree-shakes, so if you only want primitives you don't pay for the signature components.

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

## Compatibility

Bloom ships its own pre-compiled CSS — **no Tailwind setup required in your app**. Import `@bloomkit/react/styles.css` and every component renders correctly, whether your app uses Tailwind, CSS modules, plain CSS, or anything else.

If your app **does** run Tailwind, bloom coexists cleanly alongside it. Both bundles use the same cascade layers and bloom's tokens are namespaced under `--bloom-*`, so there's no collision between your Tailwind output and bloom's. You can import both in the same entry file.

A few things to be aware of:

- **Tailwind v4 recommended.** Bloom is built with Tailwind v4.2+. Combining it with a Tailwind v3 pipeline mostly works, but the preflight (reset) differs between major versions and you may see minor inconsistencies.
- **Bloom ships Tailwind's preflight.** That's a feature for apps with no existing reset. If your app already has a custom CSS reset, know that bloom's CSS layers over it — for any property both sides set, bloom's value will generally win (cascade-layer order).
- **Tokens are namespaced.** Every custom property bloom exposes starts with `--bloom-*` or `--space-*`. Nothing bloom ships touches generic names like `--color-primary` or `--radius`, so there's zero risk of clobbering your own design tokens.
- **Components own their own styling.** Overrides via `className` merge cleanly (see Customization below) — no need to fight specificity or `!important`.

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
| `--bloom-blur-blob` / `--bloom-blur-card` | Backdrop blur for blob and card surfaces |
| `--bloom-radius-sm` / `--bloom-radius` / `--bloom-radius-lg` / `--bloom-radius-pill` | Border radius |
| `--bloom-radius-checkbox` | Checkbox corner radius |
| `--bloom-text-display-xl` / `--bloom-text-display` / `--bloom-text-heading` / `--bloom-text-subheading` / `--bloom-text-body` / `--bloom-text-caption` / `--bloom-text-micro` | Font size scale |
| `--bloom-leading-display-xl` / `--bloom-leading-display` / `--bloom-leading-heading` / `--bloom-leading-subheading` / `--bloom-leading-body` / `--bloom-leading-caption` / `--bloom-leading-micro` | Line height scale |
| `--bloom-letter-wide` / `--bloom-letter-tight` | Letter spacing |
| `--bloom-duration` / `--bloom-duration-slow` / `--bloom-duration-fast` | Animation timing |
| `--bloom-ease` | Easing curve |
| `--space-xs` through `--space-4xl` | Spacing scale (4px → 64px) |

## Contributing

Contributions are welcome — bug fixes, new components, documentation improvements, or ideas. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, workflow, and conventions. All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT © [Bogdan Filipovici](https://github.com/bogdiusf)

Free to use, modify, fork, and distribute. See [LICENSE](LICENSE) for details.

---

If bloomkit saves you time, [buy me a coffee](https://buymeacoffee.com/bogdanfilipovici) ☕
