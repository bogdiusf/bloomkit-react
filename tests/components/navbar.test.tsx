import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "../../src/components/navbar";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

describe("Navbar", () => {
  it("renders the site navigation landmark", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders logo content", () => {
    render(<Navbar logo={<span>Bloom</span>} />);
    // logo appears in both the pill and the drawer; at least one should be visible
    expect(screen.getAllByText("Bloom").length).toBeGreaterThan(0);
  });

  it("renders desktop nav links", () => {
    render(<Navbar links={links} />);
    // nav elements exist (desktop + mobile drawer header)
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("marks active link with aria-current", () => {
    render(<Navbar links={links} />);
    const activeLinks = screen.getAllByRole("link", { name: "Home" });
    // At least one should carry aria-current="page"
    expect(activeLinks.some((el) => el.getAttribute("aria-current") === "page")).toBe(true);
  });

  it("renders CTA content on desktop", () => {
    render(<Navbar cta={<button type="button">Sign up</button>} />);
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("has a hamburger button", () => {
    render(<Navbar links={links} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens the mobile drawer when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    const hamburger = screen.getByRole("button", { name: /open menu/i });
    await user.click(hamburger);
    // drawer dialog should appear
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the mobile drawer via the close button", async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const closeBtn = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders custom drawerContent instead of auto-generated links", async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} drawerContent={<div>Custom drawer content</div>} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByText("Custom drawer content")).toBeInTheDocument();
  });

  it("works in controlled mode", async () => {
    const user = userEvent.setup();
    let controlled = false;
    const { rerender } = render(
      <Navbar
        links={links}
        drawerOpen={false}
        onDrawerOpenChange={() => {
          controlled = true;
        }}
      />
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(controlled).toBe(true);
    // Since controlled=false, drawer should still be closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // Rerender with open=true should show dialog
    rerender(
      <Navbar
        links={links}
        drawerOpen={true}
        onDrawerOpenChange={() => {
          controlled = true;
        }}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("forwards ref to the header element", () => {
    let ref: HTMLElement | null = null;
    render(
      <Navbar
        ref={(el) => {
          ref = el;
        }}
      />
    );
    expect(ref).toBeInstanceOf(HTMLElement);
  });

  it("applies custom className", () => {
    render(<Navbar className="test-custom-class" />);
    expect(screen.getByRole("banner").className).toContain("test-custom-class");
  });

  it("applies custom offsetTop via inline style", () => {
    render(<Navbar offsetTop={40} />);
    const header = screen.getByRole("banner");
    expect(header.style.top).toBe("40px");
  });
});
