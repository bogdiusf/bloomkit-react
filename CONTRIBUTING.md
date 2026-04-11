# Contributing to bloomkit

Thanks for your interest. This project is early and actively evolving — contributions of any size are welcome, from typo fixes to new components.

## Ground rules

- Be kind. Read the [Code of Conduct](CODE_OF_CONDUCT.md).
- Open an [issue](https://github.com/bogdiusf/bloomkit-react/issues) before starting significant work so we can discuss scope.
- Small, focused pull requests are much easier to review than sprawling ones.

## Local setup

You need [pnpm](https://pnpm.io) — this project does not use npm.

```bash
git clone https://github.com/bogdiusf/bloomkit-react.git
cd bloomkit-react
pnpm install
```

That's it. `pnpm install` also sets up the git pre-commit hook via husky automatically.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the local component playground at `localhost:5173` |
| `pnpm test` | Run the vitest test suite once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm typecheck` | Run `tsc --noEmit` against the library sources |
| `pnpm check` | Run biome (lint + format) in check mode |
| `pnpm check:fix` | Run biome and apply safe fixes |
| `pnpm build` | Produce `dist/` (esm + cjs + dts + minified css) |

## Project layout

```
src/
  components/         # one folder per component (button/, card/, ...)
  hooks/              # useBreathing, useReducedMotion
  icons/              # shared icons used across components
  palettes/           # built-in bloom, midnight, desert, ocean
  styles/tokens/      # css variable tokens (colors, spacing, radius, ...)
  index.ts            # public library exports
dev/
  main.tsx            # local playground — every component is demoed here
tests/
  components/         # one test file per component
  hooks/              # hook tests
```

## Adding a new component

1. Create `src/components/<kebab-case-name>/` with:
   - `<name>.tsx` — the component
   - `<name>.variants.ts` — CVA variants (only if the component has them)
   - `index.ts` — barrel export
2. Add the public exports to [src/index.ts](src/index.ts).
3. Write a test file at `tests/components/<name>.test.tsx`.
4. Add a demo section to [dev/main.tsx](dev/main.tsx).
5. Run `pnpm check:fix && pnpm test && pnpm typecheck`.
6. Open a PR.

Reference existing components that follow the conventions well:

- Simple component — [src/components/input/input.tsx](src/components/input/input.tsx)
- Compound component with Radix — [src/components/accordion/accordion.tsx](src/components/accordion/accordion.tsx)
- Overlay with Radix — [src/components/popover/popover.tsx](src/components/popover/popover.tsx)
- CVA variants — [src/components/button/button.variants.ts](src/components/button/button.variants.ts)

## Style conventions

These are hard rules, not suggestions.

- **Tailwind arbitrary-value syntax** — always use `[var(--x)]`, never the canonical `(--x)`. The canonical syntax breaks when consumer apps scan the library. Existing code uses `[var(--x)]` everywhere for this reason.
- **Inline styles for must-render properties** — if a style absolutely has to render regardless of the consumer's Tailwind setup (e.g. the radio indicator dot), use `style={{}}` instead of a Tailwind class. `Checkbox` and `RadioGroup` are examples.
- **Design tokens over raw values** — prefer `var(--space-lg)` over `16px`, `var(--bloom-radius)` over a pixel value. Tokens live in [src/styles/tokens/](src/styles/tokens/).
- **`forwardRef` + `displayName`** on every component. Simple forwarded components return a single element; compound components export each subpart.
- **`type="button"` on every native `<button>`** — biome will yell at you otherwise.
- **SVGs need `aria-hidden="true"`** (decorative) or `role="img"` + `<title>` (meaningful).
- **Accessible labels** — when wrapping form controls with a label, use `htmlFor` + `useId()` rather than a wrapping `<label>` around a Radix component.

## Commit conventions

- Short, lowercase, imperative mood: `add stepper component`, `fix accordion animation`, `update readme`.
- Reference files by path when the change is non-obvious: `fix focus ring in src/components/select/select.tsx`.
- Don't add a `Co-Authored-By:` trailer unless explicitly requested.
- The pre-commit hook runs `biome check --staged --write` and applies safe fixes automatically. If biome finds unfixable errors, the commit is blocked — fix them, re-stage, and try again.

## Before you open a PR

Make sure all of these pass locally:

```bash
pnpm check       # biome lint + format
pnpm typecheck   # tsc
pnpm test        # vitest
pnpm build       # ensure dist builds cleanly
```

If your change affects the public surface (new component, new prop, new hook), add an entry to the `## [Unreleased]` section of [CHANGELOG.md](CHANGELOG.md) under the appropriate heading (`Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`).

## Reporting bugs

Open an [issue](https://github.com/bogdiusf/bloomkit-react/issues) with:

- A short description of what's broken
- Steps to reproduce (or a codesandbox / stackblitz if possible)
- The version of `@bloomkit/react` you're on
- The version of React and your bundler (vite, next, etc.)

## Security issues

Do **not** open a public issue for security vulnerabilities. See [SECURITY.md](SECURITY.md).
