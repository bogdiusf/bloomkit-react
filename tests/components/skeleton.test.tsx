import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "../../src/components/skeleton";

describe("Skeleton", () => {
  it("renders a skeleton element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders text variant", () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders card variant", () => {
    const { container } = render(<Skeleton variant="card" />);
    expect(container.firstChild).toHaveClass("h-[200px]");
  });

  it("renders avatar variant", () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("forwards className", () => {
    const { container } = render(<Skeleton className="w-[300px]" />);
    expect(container.firstChild).toHaveClass("w-[300px]");
  });
});
