import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../src/components/collapsible";

describe("Collapsible", () => {
  it("renders trigger and content", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Show more</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument();
  });

  it("starts closed by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("starts open when defaultOpen is true", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Revealed")).toBeInTheDocument();
  });

  it("opens and closes on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onOpenChange when toggled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );

    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects controlled open state", () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");

    rerender(
      <Collapsible open>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Revealed")).toBeInTheDocument();
  });

  it("merges className on each subcomponent", () => {
    render(
      <Collapsible className="my-root" defaultOpen>
        <CollapsibleTrigger className="my-trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent className="my-content">Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button").className).toContain("my-trigger");
  });
});
