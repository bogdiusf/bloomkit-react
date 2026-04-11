import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slider } from "../../src/components/slider";

describe("Slider", () => {
  it("renders a slider", () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("sets correct aria-valuenow", () => {
    render(<Slider defaultValue={[75]} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
  });

  it("supports min and max", () => {
    render(<Slider defaultValue={[5]} min={0} max={10} aria-label="Rating" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "10");
  });

  it("supports step", () => {
    render(<Slider defaultValue={[50]} step={10} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Slider defaultValue={[50]} disabled aria-label="Disabled" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-disabled", "true");
  });
});
