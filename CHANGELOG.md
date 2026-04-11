# Changelog

All notable changes to `@bloomkit/react` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.22] - 2026-04-11

### Fixed

- Decouple the playground from the shipped build. Previously `src/styles/bloom.css` scanned `dev/**` as part of the library build, so utility classes sneaked into `dist/index.css` purely because the playground happened to use them. Rewriting the playground (or deleting demos) silently removed classes consumers depended on. The shipped `bloom.css` no longer touches `dev/`, and a new `src/styles/playground.css` handles the playground's own scan.
- Restore `--bloom-leading-display-xl`, `--bloom-leading-display`, `--bloom-leading-subheading`, `--bloom-leading-caption`, `--bloom-leading-micro`, `--bloom-blur-blob`, and `--bloom-blur-card` tokens that were mistakenly removed in the 0.2.20 cleanup. Tokens are a public API — removing one is a breaking change and needs to go through deprecation.
- Add `src/styles/_safelist.ts` to explicitly ship the 74 utility classes that v0.2.19's `dist/index.css` contained via the playground leak, so upgrading from 0.2.19 → 0.2.22 requires zero consumer changes.

### Added

- `Separator` — horizontal / vertical divider built on `@radix-ui/react-separator`.
- `Spinner` — soft SVG loading indicator with `sm` / `md` / `lg` sizes, custom label support, and a `bloom-spin` keyframe in the motion tokens.
