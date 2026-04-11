import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../../src/components/alert";

describe("Alert", () => {
  it("renders alert with content", () => {
    render(<Alert>Hello</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders info variant by default", () => {
    render(<Alert>Info</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("bloom-accent3");
  });

  it("renders success variant", () => {
    render(<Alert variant="success">Success</Alert>);
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("renders warning variant", () => {
    render(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("renders error variant", () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("title uses serif font", () => {
    render(
      <Alert>
        <AlertTitle>Serif</AlertTitle>
      </Alert>
    );
    expect(screen.getByText("Serif").className).toContain("font-[family-name:var(--bloom-font-display)]");
  });
});
