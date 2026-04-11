import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../../src/components/badge";

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders sage variant by default", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-");
  });

  it("renders sand variant", () => {
    render(<Badge variant="sand">Pending</Badge>);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders lavender variant", () => {
    render(<Badge variant="lavender">Info</Badge>);
    expect(screen.getByText("Info")).toBeInTheDocument();
  });

  it("renders rose variant", () => {
    render(<Badge variant="rose">Error</Badge>);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders with dot indicator", () => {
    const { container } = render(<Badge dot>Active</Badge>);
    const dot = container.querySelector("[data-bloom-dot]");
    expect(dot).toBeInTheDocument();
  });
});
