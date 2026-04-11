import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../../src/components/toggle";

describe("Toggle", () => {
  it("renders unchecked by default", () => {
    render(<Toggle aria-label="Ambient motion" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle aria-label="Ambient motion" onCheckedChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("renders checked when defaultChecked is true", () => {
    render(<Toggle aria-label="Ambient motion" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renders label when provided", () => {
    render(<Toggle label="Ambient motion" />);
    expect(screen.getByText("Ambient motion")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Toggle aria-label="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
