/**
 * CSS safelist — do not import, do not delete.
 *
 * This file exists purely so Tailwind's content scanner sees every class
 * string that the shipped `dist/index.css` needs to contain. The classes
 * here were present in v0.2.19's shipped CSS because they happened to be
 * used in the playground, which was (incorrectly) scanned as part of the
 * library build. Consumers built on those classes being present.
 *
 * Starting in v0.2.22 the playground is decoupled from the shipped build,
 * so the only way to keep those classes in `dist/index.css` is to list
 * them here. Treat this as the library's public utility-class surface:
 * adding a class is safe, removing one is a breaking change.
 *
 * Not imported anywhere at runtime. tsup does not bundle it into the JS
 * output — it only exists on disk for Tailwind's string scanner.
 */

export const __bloomCssSafelist = [
  "accent-[var(--bloom-accent1-deep)]",
  "animate-[bloom-shimmer_3s_ease-in-out_infinite]",
  "backdrop-blur-md",
  "bg-[length:200%_100%]",
  "bg-[var(--bloom-accent1-deep)]/40",
  "bg-[var(--bloom-bg)]",
  "bg-[var(--bloom-bg)]/80",
  "bg-[var(--bloom-text)]",
  "border-l-[4px]",
  "border-l-[var(--bloom-accent1)]",
  "border-l-[var(--bloom-accent2)]",
  "border-l-[var(--bloom-accent3)]",
  "border-l-[var(--bloom-accent4)]",
  "contents",
  "focus-visible:ring-[4px]",
  "focus:ring-[4px]",
  "font-mono",
  "from-[var(--bloom-accent1-deep)]",
  "gap-[var(--space-xl)]",
  "gap-px",
  "grid-cols-1",
  "h-[2px]",
  "h-[calc(100vh-56px)]",
  "inline",
  "italic",
  "leading-[1.7]",
  "leading-[var(--bloom-leading-body)]",
  "lg:block",
  "lg:hidden",
  "list-disc",
  "list-inside",
  "max-w-[1400px]",
  "max-w-[768px]",
  "mb-[var(--space-2xl)]",
  "mb-[var(--space-xl)]",
  "md:flex",
  "md:flex-row",
  "min-h-[200px]",
  "mt-0",
  "mt-[var(--space-2xl)]",
  "mt-[var(--space-xl)]",
  "overflow-x-auto",
  "overflow-y-auto",
  "p-[var(--space-2xl)]",
  "placeholder:text-[var(--bloom-text-secondary)]/60",
  "px-[6px]",
  "px-[var(--space-sm)]",
  "px-[var(--space-xl)]",
  "py-[2px]",
  "py-[var(--space-2xl)]",
  "py-[var(--space-xl)]",
  "right-[var(--space-sm)]",
  "rotate-90",
  "rounded",
  "shrink",
  "static",
  "sticky",
  "table",
  "text-[length:var(--bloom-text-display)]",
  "text-[length:var(--bloom-text-display-xl)]",
  "text-[var(--bloom-bg)]",
  "text-[var(--bloom-text-heading)]",
  "text-[var(--bloom-text-secondary)]",
  "text-[var(--bloom-text-subheading)]",
  "text-left",
  "to-[var(--bloom-accent1)]",
  "top-[56px]",
  "top-[57px]",
  "top-[var(--space-sm)]",
  "underline",
  "underline-offset-4",
  "w-[240px]",
  "z-10",
  "z-40",
] as const;
