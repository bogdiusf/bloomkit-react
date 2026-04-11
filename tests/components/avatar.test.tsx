import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "../../src/components/avatar";

describe("Avatar", () => {
  it("renders initials when no image", () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src provided", () => {
    render(<Avatar src="/photo.jpg" alt="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/photo.jpg");
  });

  it("falls back to initials when image fails", () => {
    render(<Avatar src="/broken.jpg" alt="John" initials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    render(<Avatar initials="AB" size="lg" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("renders multiple avatars", () => {
    render(
      <AvatarGroup>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
