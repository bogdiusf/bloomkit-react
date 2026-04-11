import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../../src/components/modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders content when open", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Modal open onOpenChange={() => {}} title="Modal Title" description="Modal desc">
        <div>Body</div>
      </Modal>
    );
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal desc")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="Test">
        <div>Body</div>
      </Modal>
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
