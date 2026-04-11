import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip, TooltipProvider } from "../../src/components/tooltip";

describe("Tooltip", () => {
  it("renders trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <button type="button">Hover me</button>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Tooltip text">
          <button type="button">Hover me</button>
        </Tooltip>
      </TooltipProvider>
    );
    await user.hover(screen.getByText("Hover me"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Tooltip text");
  });

  it("accepts side prop", () => {
    render(
      <TooltipProvider>
        <Tooltip content="Bottom" side="bottom">
          <button type="button">Trigger</button>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });
});
