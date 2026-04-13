import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { BloomOrb } from "../../src/components/bloom-orb";

describe("BloomOrb", () => {
  it("renders with no children", () => {
    render(<BloomOrb data-testid="orb" />);
    expect(screen.getByTestId("orb")).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(<BloomOrb>JD</BloomOrb>);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies md size classes by default", () => {
    const { container } = render(<BloomOrb />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.className).toContain("h-[64px]");
    expect(orb.className).toContain("w-[64px]");
  });

  it("applies sm / lg / xl size classes", () => {
    const { container, rerender } = render(<BloomOrb size="sm" />);
    expect((container.firstChild as HTMLElement).className).toContain("h-[40px]");

    rerender(<BloomOrb size="lg" />);
    expect((container.firstChild as HTMLElement).className).toContain("h-[96px]");

    rerender(<BloomOrb size="xl" />);
    expect((container.firstChild as HTMLElement).className).toContain("h-[140px]");
  });

  it("applies custom sizePx via inline style and skips preset classes", () => {
    const { container } = render(<BloomOrb sizePx={200} />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.height).toBe("200px");
    expect(orb.style.width).toBe("200px");
    expect(orb.className).not.toContain("h-[64px]");
  });

  it("applies accent1 gradient by default", () => {
    const { container } = render(<BloomOrb />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.className).toContain("bloom-accent1");
  });

  it("applies different color variants", () => {
    const { container, rerender } = render(<BloomOrb color="accent2" />);
    expect((container.firstChild as HTMLElement).className).toContain("bloom-accent2");

    rerender(<BloomOrb color="accent3" />);
    expect((container.firstChild as HTMLElement).className).toContain("bloom-accent3");

    rerender(<BloomOrb color="accent4" />);
    expect((container.firstChild as HTMLElement).className).toContain("bloom-accent4");
  });

  it("sets the breathe scale custom property", () => {
    const { container } = render(<BloomOrb breatheScale={1.05} />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.getPropertyValue("--bloom-breathe-scale")).toBe("1.05");
  });

  it("sets four shape custom properties driving the morph keyframe", () => {
    const { container } = render(<BloomOrb shapeSeed="test-seed" />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.getPropertyValue("--bloom-orb-shape-0")).not.toBe("");
    expect(orb.style.getPropertyValue("--bloom-orb-shape-1")).not.toBe("");
    expect(orb.style.getPropertyValue("--bloom-orb-shape-2")).not.toBe("");
    expect(orb.style.getPropertyValue("--bloom-orb-shape-3")).not.toBe("");
  });

  it("same shapeSeed produces the same shapes (deterministic)", () => {
    const { container: c1 } = render(<BloomOrb shapeSeed="locked" />);
    const { container: c2 } = render(<BloomOrb shapeSeed="locked" />);
    const s1 = (c1.firstChild as HTMLElement).style.getPropertyValue("--bloom-orb-shape-0");
    const s2 = (c2.firstChild as HTMLElement).style.getPropertyValue("--bloom-orb-shape-0");
    expect(s1).toBe(s2);
    expect(s1).not.toBe("");
  });

  it("different shapeSeeds produce different shapes", () => {
    const { container: c1 } = render(<BloomOrb shapeSeed="alpha" />);
    const { container: c2 } = render(<BloomOrb shapeSeed="bravo" />);
    const s1 = (c1.firstChild as HTMLElement).style.getPropertyValue("--bloom-orb-shape-0");
    const s2 = (c2.firstChild as HTMLElement).style.getPropertyValue("--bloom-orb-shape-0");
    expect(s1).not.toBe(s2);
  });

  it("auto-generated ids produce different shapes for adjacent orbs", () => {
    const { container } = render(
      <div>
        <BloomOrb data-testid="one" />
        <BloomOrb data-testid="two" />
      </div>
    );
    const one = container.querySelector("[data-testid='one']") as HTMLElement;
    const two = container.querySelector("[data-testid='two']") as HTMLElement;
    const s1 = one.style.getPropertyValue("--bloom-orb-shape-0");
    const s2 = two.style.getPropertyValue("--bloom-orb-shape-0");
    expect(s1).not.toBe(s2);
  });

  it("initial border-radius matches shape-0 to avoid first-frame pop", () => {
    const { container } = render(<BloomOrb shapeSeed="test" />);
    const orb = container.firstChild as HTMLElement;
    const shape0 = orb.style.getPropertyValue("--bloom-orb-shape-0");
    expect(orb.style.borderRadius).toBe(shape0);
  });

  it("includes both morph and breathe in the animation by default", () => {
    const { container } = render(<BloomOrb />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.animation).toContain("bloom-morph");
    expect(orb.style.animation).toContain("bloom-breathe-soft");
  });

  it("omits morph animation when morphDisabled", () => {
    const { container } = render(<BloomOrb morphDisabled />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.animation).not.toContain("bloom-morph");
    expect(orb.style.animation).toContain("bloom-breathe-soft");
  });

  it("omits breathe animation when breatheDisabled", () => {
    const { container } = render(<BloomOrb breatheDisabled />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.animation).toContain("bloom-morph");
    expect(orb.style.animation).not.toContain("bloom-breathe-soft");
  });

  it("sets no animation when both are disabled", () => {
    const { container } = render(<BloomOrb morphDisabled breatheDisabled />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.animation).toBe("");
  });

  it("morph duration is within ±20% of morphDuration", () => {
    const center = 10;
    const { container } = render(<BloomOrb morphDuration={center} shapeSeed="duration-test" />);
    const orb = container.firstChild as HTMLElement;
    const match = orb.style.animation.match(/bloom-morph\s+([\d.]+)s/);
    expect(match).not.toBeNull();
    const actual = Number.parseFloat(match?.[1] ?? "0");
    expect(actual).toBeGreaterThanOrEqual(center * 0.8);
    expect(actual).toBeLessThanOrEqual(center * 1.2);
  });

  it("breathe duration stays deterministic (no randomization)", () => {
    const { container } = render(<BloomOrb breatheDuration={7} />);
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.animation).toContain("bloom-breathe-soft 7s");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<BloomOrb ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className", () => {
    const { container } = render(<BloomOrb className="my-orb" />);
    expect((container.firstChild as HTMLElement).className).toContain("my-orb");
  });
});
