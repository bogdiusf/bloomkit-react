import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "../../src/components/form-field";
import { Input } from "../../src/components/input";

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField>
        <Input id="name" placeholder="Enter name" />
      </FormField>
    );
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<FormField label="Email" htmlFor="email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <Input id="email" />
      </FormField>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email");
  });

  it("renders hint text", () => {
    render(<FormField hint="We'll never share your email." />);
    expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
  });

  it("renders error message instead of hint", () => {
    render(<FormField hint="Helper text" error="This field is required." />);
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("error has role=alert", () => {
    render(<FormField error="Something went wrong." />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders required asterisk", () => {
    render(<FormField label="Name" required />);
    // The asterisk is in the DOM (aria-hidden)
    const label = screen.getByText(/Name/);
    expect(label.textContent).toContain("*");
  });

  it("forwards ref to the wrapper div", () => {
    let ref: HTMLDivElement | null = null;
    render(
      <FormField
        ref={(el) => {
          ref = el;
        }}
      />
    );
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(<FormField className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders without label or children gracefully", () => {
    const { container } = render(<FormField />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
