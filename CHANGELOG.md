# Changelog

All notable changes to `@bloomkit/react` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-04-11

### Added

- `BreathingBox` — wraps any child in a subtle breathing scale animation. The first dedicated wellness component, making the "components that breathe" tagline literal. Three `intensity` levels (`subtle` / `soft` / `bold`), configurable `duration` and `delay`, `asChild` support via Radix Slot. Respects `prefers-reduced-motion` via the library's global rule. CSS-only, SSR-safe.
- `useIsMobile` hook — shadcn-style viewport-width detection. Returns `true` when the viewport is narrower than 768px. Uses `matchMedia` with a listener, SSR-safe.

### Changed

- **Breaking:** `Toggle` → `Switch`. The existing `Toggle` component is a wrapper around Radix's Switch primitive and was misnamed. Consumers using `<Toggle>` must rename imports and JSX to `<Switch>`. No functional or visual changes beyond the name — `label`, `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, and `id` props all behave identically.

## [0.2.23] - 2026-04-11

### Added

- `Button` — new `size` prop with `sm` / `md` / `lg` / `icon` presets. `md` remains the default and matches the previous sizing exactly, so existing usage is unchanged. `icon` is a 44×44 square for icon-only buttons (compose with `variant="ghost"` or `variant="secondary"`).

### Changed

- Include `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and `SECURITY.md` in the published npm tarball via the `files` field, so the "Contributing" / "Code of Conduct" / etc. links on the npm package page resolve correctly.

## [0.2.22] - 2026-04-11

### Fixed

- Decouple the playground from the shipped build. Previously `src/styles/bloom.css` scanned `dev/**` as part of the library build, so utility classes sneaked into `dist/index.css` purely because the playground happened to use them. Rewriting the playground (or deleting demos) silently removed classes consumers depended on. The shipped `bloom.css` no longer touches `dev/`, and a new `src/styles/playground.css` handles the playground's own scan.
- Restore `--bloom-leading-display-xl`, `--bloom-leading-display`, `--bloom-leading-subheading`, `--bloom-leading-caption`, `--bloom-leading-micro`, `--bloom-blur-blob`, and `--bloom-blur-card` tokens that were mistakenly removed in the 0.2.20 cleanup. Tokens are a public API — removing one is a breaking change and needs to go through deprecation.
- Add `src/styles/_safelist.ts` to explicitly ship the 74 utility classes that v0.2.19's `dist/index.css` contained via the playground leak, so upgrading from 0.2.19 → 0.2.22 requires zero consumer changes.

### Added

- `Separator` — horizontal / vertical divider built on `@radix-ui/react-separator`.
- `Spinner` — soft SVG loading indicator with `sm` / `md` / `lg` sizes, custom label support, and a `bloom-spin` keyframe in the motion tokens.
