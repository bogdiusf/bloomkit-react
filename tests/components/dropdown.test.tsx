import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownItem } from "../../src/components/dropdown";

describe("Dropdown", () => {
  it("renders trigger", () => {
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("shows items when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
      </Dropdown>
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Item 2")).toBeInTheDocument();
  });

  it("calls onSelect when item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem onSelect={onSelect}>Click me</DropdownItem>
      </Dropdown>
    );
    await user.click(screen.getByText("Open"));
    await user.click(await screen.findByText("Click me"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("renders disabled items", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem disabled>Disabled</DropdownItem>
      </Dropdown>
    );
    await user.click(screen.getByText("Open"));
    const item = await screen.findByText("Disabled");
    expect(item.closest("[data-disabled]")).toBeInTheDocument();
  });
});
