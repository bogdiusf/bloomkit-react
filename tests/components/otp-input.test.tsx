import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OTPInput } from "../../src/components/otp-input";

function getSlot(index: number): HTMLInputElement {
  const slots = screen.getAllByRole("textbox") as HTMLInputElement[];
  const slot = slots[index];
  if (!slot) throw new Error(`No OTP slot at index ${index}`);
  return slot;
}

describe("OTPInput", () => {
  it("renders the correct number of slots", () => {
    render(<OTPInput length={6} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("defaults to 6 slots", () => {
    render(<OTPInput />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("displays the controlled value across slots", () => {
    render(<OTPInput value="123" onChange={() => {}} />);
    expect(getSlot(0).value).toBe("1");
    expect(getSlot(1).value).toBe("2");
    expect(getSlot(2).value).toBe("3");
    expect(getSlot(3).value).toBe("");
  });

  it("calls onChange as digits are entered", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OTPInput length={4} onChange={onChange} />);
    await user.click(getSlot(0));
    await user.keyboard("7");
    expect(onChange).toHaveBeenCalledWith("7");
  });

  it("only accepts digits", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OTPInput length={4} onChange={onChange} />);
    await user.click(getSlot(0));
    await user.keyboard("a");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("calls onComplete when all slots are filled", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OTPInput length={4} onComplete={onComplete} />);
    await user.click(getSlot(0));
    await user.keyboard("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OTPInput length={4} disabled onChange={onChange} />);
    await user.click(getSlot(0));
    await user.keyboard("1");
    expect(onChange).not.toHaveBeenCalled();
  });
});
