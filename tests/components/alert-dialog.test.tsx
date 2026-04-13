import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "../../src/components/alert-dialog";

describe("AlertDialog", () => {
  it("renders title when open", () => {
    render(<AlertDialog open onOpenChange={() => {}} title="Delete account" />);
    expect(screen.getByText("Delete account")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<AlertDialog open onOpenChange={() => {}} title="Delete account" description="This cannot be undone." />);
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("renders default confirm and cancel labels", () => {
    render(<AlertDialog open onOpenChange={() => {}} title="Confirm something" />);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders custom confirm and cancel labels", () => {
    render(
      <AlertDialog open onOpenChange={() => {}} title="Delete" confirmLabel="Delete forever" cancelLabel="Nevermind" />
    );
    expect(screen.getByRole("button", { name: "Delete forever" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nevermind" })).toBeInTheDocument();
  });

  it("calls onConfirm when confirm is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<AlertDialog open onOpenChange={() => {}} title="Delete" onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<AlertDialog open onOpenChange={() => {}} title="Delete" onCancel={onCancel} />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange(false) after confirm or cancel", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<AlertDialog open onOpenChange={onOpenChange} title="Delete" />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not render when open=false", () => {
    render(<AlertDialog open={false} onOpenChange={() => {}} title="Delete account" />);
    expect(screen.queryByText("Delete account")).not.toBeInTheDocument();
  });

  it("renders custom children body", () => {
    render(
      <AlertDialog open onOpenChange={() => {}} title="Delete">
        <p>Extra details go here.</p>
      </AlertDialog>
    );
    expect(screen.getByText("Extra details go here.")).toBeInTheDocument();
  });
});
