import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../../src/components/switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch aria-label="Ambient motion" />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch aria-label="Ambient motion" onCheckedChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("renders checked when defaultChecked is true", () => {
    render(<Switch aria-label="Ambient motion" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renders label when provided", () => {
    render(<Switch label="Ambient motion" />);
    expect(screen.getByText("Ambient motion")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Switch aria-label="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
