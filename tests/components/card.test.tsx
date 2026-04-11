import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/card";

describe("Card", () => {
  it("renders card with content", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders full card anatomy", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies interactive variant", () => {
    render(<Card variant="interactive">Click</Card>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("applies featured variant", () => {
    render(<Card variant="featured">Featured</Card>);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("title uses serif font", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Serif Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const title = screen.getByText("Serif Title");
    expect(title.className).toContain("font-[family-name:var(--bloom-font-display)]");
  });

  it("forwards className to card", () => {
    render(<Card className="my-custom">Custom</Card>);
    expect(screen.getByText("Custom").className).toContain("my-custom");
  });
});
