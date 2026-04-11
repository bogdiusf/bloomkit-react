import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";

describe("RadioGroup", () => {
  function renderGroup(onValueChange?: (v: string) => void, defaultValue?: string) {
    return render(
      <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
        <RadioGroupItem value="calm" label="Calm" />
        <RadioGroupItem value="focused" label="Focused" />
        <RadioGroupItem value="energized" label="Energized" />
      </RadioGroup>
    );
  }

  it("renders all items", () => {
    renderGroup();
    expect(screen.getByRole("radio", { name: "Calm" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Focused" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Energized" })).toBeInTheDocument();
  });

  it("applies default value", () => {
    renderGroup(undefined, "focused");
    expect(screen.getByRole("radio", { name: "Focused" })).toHaveAttribute("data-state", "checked");
    expect(screen.getByRole("radio", { name: "Calm" })).toHaveAttribute("data-state", "unchecked");
  });

  it("selects an item when clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup(onValueChange);
    await user.click(screen.getByRole("radio", { name: "Calm" }));
    expect(onValueChange).toHaveBeenCalledWith("calm");
  });

  it("only allows a single selection at a time", async () => {
    const user = userEvent.setup();
    renderGroup();
    await user.click(screen.getByRole("radio", { name: "Calm" }));
    expect(screen.getByRole("radio", { name: "Calm" })).toHaveAttribute("data-state", "checked");

    await user.click(screen.getByRole("radio", { name: "Focused" }));
    expect(screen.getByRole("radio", { name: "Focused" })).toHaveAttribute("data-state", "checked");
    expect(screen.getByRole("radio", { name: "Calm" })).toHaveAttribute("data-state", "unchecked");
  });

  it("clicking the label triggers the radio", async () => {
    const user = userEvent.setup();
    renderGroup();
    await user.click(screen.getByText("Energized"));
    expect(screen.getByRole("radio", { name: "Energized" })).toHaveAttribute("data-state", "checked");
  });

  it("renders disabled items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="x" label="Disabled" disabled />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Disabled" })).toBeDisabled();
  });
});
