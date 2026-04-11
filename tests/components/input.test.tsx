import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input, Textarea } from "../../src/components/input";

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input placeholder="Name" />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("renders with type email", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });

  it("renders with type password", () => {
    render(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "password");
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("forwards ref", () => {
    let ref: HTMLInputElement | null = null;
    render(
      <Input
        ref={(el) => {
          ref = el;
        }}
        placeholder="Ref"
      />
    );
    expect(ref).toBeInstanceOf(HTMLInputElement);
  });
});

describe("Textarea", () => {
  it("renders a textarea", () => {
    render(<Textarea placeholder="Message" />);
    expect(screen.getByPlaceholderText("Message").tagName).toBe("TEXTAREA");
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type" />);
    const textarea = screen.getByPlaceholderText("Type");
    await user.type(textarea, "hello world");
    expect(textarea).toHaveValue("hello world");
  });
});
