import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../src/components/button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders accent variant", () => {
    render(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    await user.click(screen.getByRole("button"));
    expect(clicked).toBe(true);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as a different element with asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Link" })).toBeInTheDocument();
  });

  it("forwards ref", () => {
    let ref: HTMLButtonElement | null = null;
    render(
      <Button
        ref={(el) => {
          ref = el;
        }}
      >
        Ref
      </Button>
    );
    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies md size classes by default", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-[44px]");
    expect(btn.className).toContain("px-[28px]");
    expect(btn.className).toContain("text-[14px]");
  });

  it("applies sm size classes", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-[36px]");
    expect(btn.className).toContain("px-[20px]");
    expect(btn.className).toContain("text-[13px]");
  });

  it("applies lg size classes", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-[52px]");
    expect(btn.className).toContain("px-[36px]");
    expect(btn.className).toContain("text-[16px]");
  });

  it("applies icon size classes (square, zero padding)", () => {
    render(
      <Button size="icon" aria-label="settings">
        <span aria-hidden="true">⚙</span>
      </Button>
    );
    const btn = screen.getByRole("button", { name: "settings" });
    expect(btn.className).toContain("h-[44px]");
    expect(btn.className).toContain("w-[44px]");
    expect(btn.className).toContain("p-0");
  });
});
