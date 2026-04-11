import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../src/components/checkbox";

describe("Checkbox", () => {
  it("renders without a label", () => {
    render(<Checkbox aria-label="subscribe" />);
    expect(screen.getByRole("checkbox", { name: "subscribe" })).toBeInTheDocument();
  });

  it("renders with a label and associates them", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toBeInTheDocument();

    await user.click(screen.getByText("Accept terms"));
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("toggles checked state when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="toggle" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("supports defaultChecked", () => {
    render(<Checkbox aria-label="pre-checked" defaultChecked />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "checked");
  });

  it("fires onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="t" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="t" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("uses the provided id when given", () => {
    render(<Checkbox id="my-id" label="labelled" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "my-id");
  });
});
