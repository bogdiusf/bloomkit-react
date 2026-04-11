import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { BreathingBox } from "../../src/components/breathing-box";

describe("BreathingBox", () => {
  it("renders children", () => {
    render(
      <BreathingBox>
        <span>hello</span>
      </BreathingBox>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies the default (soft) breathing keyframe", () => {
    const { container } = render(
      <BreathingBox>
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.animationName).toBe("bloom-breathe-soft");
  });

  it("applies subtle keyframe when intensity='subtle'", () => {
    const { container } = render(
      <BreathingBox intensity="subtle">
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.animationName).toBe("bloom-breathe-subtle");
  });

  it("applies bold keyframe when intensity='bold'", () => {
    const { container } = render(
      <BreathingBox intensity="bold">
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.animationName).toBe("bloom-breathe-bold");
  });

  it("applies the duration prop to animation-duration", () => {
    const { container } = render(
      <BreathingBox duration={12}>
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.animationDuration).toBe("12s");
  });

  it("applies the delay prop to animation-delay", () => {
    const { container } = render(
      <BreathingBox delay={2}>
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.animationDelay).toBe("2s");
  });

  it("merges className", () => {
    const { container } = render(
      <BreathingBox className="my-box">
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-box");
  });

  it("merges user style without clobbering animation-*", () => {
    const { container } = render(
      <BreathingBox style={{ color: "red" }}>
        <span>hi</span>
      </BreathingBox>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.color).toBe("red");
    expect(wrapper.style.animationName).toBe("bloom-breathe-soft");
  });

  it("renders as the child when asChild=true (no wrapper div)", () => {
    render(
      <BreathingBox asChild>
        <button type="button">tap me</button>
      </BreathingBox>
    );
    const btn = screen.getByRole("button", { name: "tap me" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn.style.animationName).toBe("bloom-breathe-soft");
  });

  it("forwards ref to the wrapper div", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BreathingBox ref={ref}>
        <span>hi</span>
      </BreathingBox>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("spreads native div props onto the wrapper", () => {
    render(
      <BreathingBox data-testid="box" id="x">
        <span>hi</span>
      </BreathingBox>
    );
    const el = screen.getByTestId("box");
    expect(el.id).toBe("x");
  });
});
