import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "../../src/components/alert";

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
    render(<Alert variant="success">All good</Alert>);
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders warning variant", () => {
    render(<Alert variant="warning">Heads up</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("renders error variant", () => {
    render(<Alert variant="error">Something broke</Alert>);
    expect(screen.getByText("Something broke")).toBeInTheDocument();
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
