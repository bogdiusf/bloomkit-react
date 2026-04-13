import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode, useId, useMemo } from "react";
import { cn } from "../../utils/cn";
import { type BloomOrbVariants, bloomOrbVariants } from "./bloom-orb.variants";

export type BloomOrbProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> &
  BloomOrbVariants & {
    /**
     * Optional content rendered inside the orb (icon, initials, number, short
     * text). Leave empty for a pure decorative orb.
     */
    children?: ReactNode;
    /**
     * Custom pixel size. When set, overrides the `size` preset. Use for hero
     * orbs that need a non-standard dimension.
     */
    sizePx?: number;
    /**
     * Peak scale factor of the breathing animation.
     * @default 1.03
     */
    breatheScale?: number;
    /**
     * Length of one full breath cycle in seconds.
     * @default 6
     */
    breatheDuration?: number;
    /**
     * Disable the breathing scale animation entirely.
     * @default false
     */
    breatheDisabled?: boolean;
    /**
     * Center of the morph duration range in seconds. The actual duration is
     * randomized ±20% per instance so multiple orbs on the same page don't
     * morph in sync.
     * @default 8
     */
    morphDuration?: number;
    /**
     * Disable the organic morph animation. When `true`, the orb stays in its
     * initial asymmetric shape instead of flowing.
     * @default false
     */
    morphDisabled?: boolean;
    /**
     * Optional seed string used to generate the orb's shape sequence and
     * duration offset. If omitted, a unique React `useId()` is used so every
     * orb looks different. Pass an explicit seed to lock in a specific shape
     * (useful for tests, snapshots, or intentionally matching orbs).
     */
    shapeSeed?: string;
  };

// cyrb53 — small, fast, good-enough string hash. Returns a 53-bit int as a
// JS number. Deterministic across server and client for SSR safety.
// See: https://stackoverflow.com/a/52171480
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// Deterministic pseudo-random number generator seeded by a hash. Returns a
// function that produces numbers in [0, 1) on each call. Same seed = same
// sequence on every call, across server and client.
function createRng(seedHash: number): () => number {
  let state = seedHash || 1; // guard against 0 state
  return () => {
    // mulberry32 — small PRNG with good distribution for our needs.
    state = (state + 0x6d2b79f5) | 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate one organic border-radius shape. Each of the 8 percentages is
// drawn from 30-70%, keeping the shape recognizably organic (not a circle,
// not a square). Format: `X% X% X% X% / Y% Y% Y% Y%`.
function generateShape(rng: () => number): string {
  const pct = () => 30 + Math.floor(rng() * 41); // 30..70 inclusive
  return `${pct()}% ${pct()}% ${pct()}% ${pct()}% / ${pct()}% ${pct()}% ${pct()}% ${pct()}%`;
}

export const BloomOrb = forwardRef<HTMLDivElement, BloomOrbProps>(
  (
    {
      children,
      size = "md",
      color = "accent1",
      sizePx,
      breatheScale = 1.03,
      breatheDuration = 6,
      breatheDisabled = false,
      morphDuration = 8,
      morphDisabled = false,
      shapeSeed,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // SSR-safe unique seed. React's useId is stable across server and client,
    // so the shape sequence is identical on both sides — no hydration mismatch.
    const autoId = useId();
    const seed = shapeSeed ?? autoId;

    // Memo so the shapes don't regenerate on every render. The seed is
    // derived from a stable ID so two renders of the same orb produce the
    // same shapes.
    const { shapes, randomizedMorphDuration } = useMemo(() => {
      const rng = createRng(cyrb53(seed));
      const generated = [generateShape(rng), generateShape(rng), generateShape(rng), generateShape(rng)];
      // Randomize duration within ±20% of the center value. This desyncs
      // multiple orbs rendered on the same page.
      const jitter = (rng() - 0.5) * 0.4; // -0.2 .. +0.2
      const duration = morphDuration * (1 + jitter);
      return { shapes: generated, randomizedMorphDuration: duration };
    }, [seed, morphDuration]);

    // Compose the animation shorthand from whichever animations are enabled.
    const animations: string[] = [];
    if (!morphDisabled) {
      animations.push(`bloom-morph ${randomizedMorphDuration.toFixed(2)}s ease-in-out infinite`);
    }
    if (!breatheDisabled) {
      animations.push(`bloom-breathe-soft ${breatheDuration}s ease-in-out infinite`);
    }

    const animationStyle: CSSProperties = {
      // Seed the four shape CSS variables used by the bloom-morph keyframe.
      ["--bloom-orb-shape-0" as string]: shapes[0],
      ["--bloom-orb-shape-1" as string]: shapes[1],
      ["--bloom-orb-shape-2" as string]: shapes[2],
      ["--bloom-orb-shape-3" as string]: shapes[3],
      // Initial border-radius matches shape-0 so there's no pop before the
      // animation's first frame.
      borderRadius: shapes[0],
      ["--bloom-breathe-scale" as string]: String(breatheScale),
      ...(animations.length > 0 ? { animation: animations.join(", ") } : {}),
      ...(sizePx !== undefined ? { height: `${sizePx}px`, width: `${sizePx}px` } : {}),
    };

    const mergedStyle: CSSProperties = { ...style, ...animationStyle };

    return (
      <div
        ref={ref}
        // Pass size=null to the variants when a custom sizePx is provided, so
        // the preset Tailwind size classes don't fight the inline style.
        className={cn(bloomOrbVariants({ size: sizePx !== undefined ? null : size, color }), className)}
        style={mergedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BloomOrb.displayName = "BloomOrb";
