import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "../../src/components/separator";

describe("Separator", () => {
  it("renders a decorative separator by default", () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId("sep");
    // Decorative separators have role="none" and aria-orientation is omitted
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "vertical");
  });

  it("applies horizontal sizing classes by default", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep").className).toContain("h-px");
    expect(screen.getByTestId("sep").className).toContain("w-full");
  });

  it("applies vertical sizing classes when orientation is vertical", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId("sep").className).toContain("h-full");
    expect(screen.getByTestId("sep").className).toContain("w-px");
  });

  it("exposes a semantic role when decorative is false", () => {
    render(<Separator decorative={false} data-testid="sep" />);
    const sep = screen.getByTestId("sep");
    expect(sep).toHaveAttribute("role", "separator");
  });

  it("merges custom className", () => {
    render(<Separator className="my-custom-class" data-testid="sep" />);
    expect(screen.getByTestId("sep").className).toContain("my-custom-class");
  });
});
