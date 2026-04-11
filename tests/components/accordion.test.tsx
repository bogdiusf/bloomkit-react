import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../src/components/accordion";

describe("Accordion", () => {
  function renderAccordion(props: Record<string, unknown> = {}) {
    return render(
      <Accordion type="single" collapsible {...props}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Question 2</AccordionTrigger>
          <AccordionContent>Answer 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  it("renders all triggers", () => {
    renderAccordion();
    expect(screen.getByRole("button", { name: "Question 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Question 2" })).toBeInTheDocument();
  });

  it("hides content by default", () => {
    renderAccordion();
    const trigger = screen.getByRole("button", { name: "Question 1" });
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("opens an item when its trigger is clicked", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByRole("button", { name: "Question 1" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("single-type only keeps one item open at a time", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger1 = screen.getByRole("button", { name: "Question 1" });
    const trigger2 = screen.getByRole("button", { name: "Question 2" });

    await user.click(trigger1);
    expect(trigger1).toHaveAttribute("data-state", "open");

    await user.click(trigger2);
    expect(trigger2).toHaveAttribute("data-state", "open");
    expect(trigger1).toHaveAttribute("data-state", "closed");
  });

  it("allows multiple items open when type is multiple", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByRole("button", { name: "A" }));
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("data-state", "open");
  });
});
