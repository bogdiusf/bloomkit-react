import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "../../src/components/spinner";

describe("Spinner", () => {
  it("renders with role=status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses 'Loading' as the default accessible label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Fetching data" />);
    expect(screen.getByRole("status", { name: "Fetching data" })).toBeInTheDocument();
  });

  it("renders at the correct pixel size for each size variant", () => {
    const { rerender, container } = render(<Spinner size="sm" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "16");

    rerender(<Spinner size="md" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");

    rerender(<Spinner size="lg" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");
  });

  it("defaults to medium size", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");
  });

  it("marks the svg as aria-hidden (label lives on the parent)", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("merges custom className", () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole("status").className).toContain("my-spinner");
  });
});
