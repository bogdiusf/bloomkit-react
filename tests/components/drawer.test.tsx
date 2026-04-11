import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "../../src/components/drawer";

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer open={false} onOpenChange={() => {}}>
        <div>Content</div>
      </Drawer>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders content when open", () => {
    render(
      <Drawer open onOpenChange={() => {}}>
        <div>Content</div>
      </Drawer>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Drawer open onOpenChange={() => {}} title="Drawer Title" description="Drawer desc">
        <div>Body</div>
      </Drawer>
    );
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
    expect(screen.getByText("Drawer desc")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} title="Test">
        <div>Body</div>
      </Drawer>
    );
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("supports every side", () => {
    const sides = ["left", "right", "top", "bottom"] as const;
    for (const side of sides) {
      const { unmount } = render(
        <Drawer open onOpenChange={() => {}} side={side}>
          <div>Side {side}</div>
        </Drawer>
      );
      expect(screen.getByText(`Side ${side}`)).toBeInTheDocument();
      unmount();
    }
  });
});
