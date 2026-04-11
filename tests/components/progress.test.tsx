import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress, ProgressCircular } from "../../src/components/progress";

describe("Progress", () => {
  it("renders a progress bar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets correct aria-valuenow", () => {
    render(<Progress value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("defaults to 0", () => {
    render(<Progress />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps value to 0-100", () => {
    render(<Progress value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});

describe("ProgressCircular", () => {
  it("renders a circular progress", () => {
    render(<ProgressCircular value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an SVG", () => {
    const { container } = render(<ProgressCircular value={50} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
