import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "../../src/components/toast";

function TestToaster() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ title: "Hello", variant: "success" })}>
      Show Toast
    </button>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders toast provider", () => {
    render(
      <ToastProvider>
        <div>App</div>
      </ToastProvider>
    );
    expect(screen.getByText("App")).toBeInTheDocument();
  });

  it("shows toast when triggered", async () => {
    render(
      <ToastProvider>
        <TestToaster />
      </ToastProvider>
    );
    await act(async () => {
      screen.getByText("Show Toast").click();
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("auto-dismisses toast after duration", async () => {
    render(
      <ToastProvider>
        <TestToaster />
      </ToastProvider>
    );
    await act(async () => {
      screen.getByText("Show Toast").click();
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});
