import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "../../src/components/date-picker";

describe("DatePicker", () => {
  it("renders a trigger button", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows placeholder when no date selected", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("displays selected date", () => {
    render(<DatePicker value={new Date(2026, 3, 9)} />);
    expect(screen.getByText(/Apr.*9.*2026/i)).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole("button"));
    expect(await screen.findByText("1")).toBeInTheDocument();
  });

  it("calls onChange when date is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByRole("button"));
    const day15 = await screen.findByText("15");
    await user.click(day15);
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls[0][0];
    expect(arg).toBeInstanceOf(Date);
    expect(arg.getDate()).toBe(15);
  });
});
