import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover } from "../../src/components/popover";

describe("Popover", () => {
  it("renders the trigger", () => {
    render(
      <Popover trigger={<button type="button">Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("keeps content hidden by default", () => {
    render(
      <Popover trigger={<button type="button">Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("shows content after clicking the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={<button type="button">Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByText("Popover content")).toBeInTheDocument();
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();
    let openState = false;
    const handleOpenChange = (next: boolean) => {
      openState = next;
    };
    const { rerender } = render(
      <Popover open={openState} onOpenChange={handleOpenChange} trigger={<button type="button">Open</button>}>
        <p>Controlled content</p>
      </Popover>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(openState).toBe(true);

    rerender(
      <Popover open={openState} onOpenChange={handleOpenChange} trigger={<button type="button">Open</button>}>
        <p>Controlled content</p>
      </Popover>
    );
    expect(await screen.findByText("Controlled content")).toBeInTheDocument();
  });
});
