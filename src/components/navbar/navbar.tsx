import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Brand mark — any node: text, image, SVG, or a component. Rendered left of the links. */
  logo?: ReactNode;
  /** Navigation links shown in the pill on desktop. Hidden on mobile — they appear in the drawer instead. */
  links?: NavbarLink[];
  /** Optional CTA node rendered to the right of the links (e.g. a Button). */
  cta?: ReactNode;
  /** Content shown inside the mobile drawer (below the logo). Defaults to a link list built from `links`. */
  drawerContent?: ReactNode;
  /** Controlled open state for the mobile drawer. Use together with `onDrawerOpenChange` for full control. */
  drawerOpen?: boolean;
  /** Called when the mobile drawer open state changes. */
  onDrawerOpenChange?: (open: boolean) => void;
  /**
   * Distance from the top of the viewport in pixels.
   * @default 20
   */
  offsetTop?: number;
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{
        transition: "transform 0.2s ease",
      }}
    >
      {open ? (
        // X icon when open
        <>
          <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      ) : (
        // Hamburger when closed
        <>
          <path d="M3 5.5h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M3 10h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M3 14.5h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ─── Close icon ───────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      links = [],
      cta,
      drawerContent,
      drawerOpen: drawerOpenProp,
      onDrawerOpenChange,
      offsetTop = 20,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Internal drawer state — used when the component is uncontrolled.
    const [drawerOpenInternal, setDrawerOpenInternal] = useState(false);

    const isControlled = drawerOpenProp !== undefined;
    const drawerOpen = isControlled ? drawerOpenProp : drawerOpenInternal;

    function handleDrawerOpenChange(open: boolean) {
      if (!isControlled) setDrawerOpenInternal(open);
      onDrawerOpenChange?.(open);
    }

    // Default drawer content: link list built from `links` prop.
    const defaultDrawerContent = links.length > 0 && (
      <nav aria-label="Mobile navigation">
        <ul className="flex flex-col gap-[var(--space-xs)] list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleDrawerOpenChange(false)}
                className={cn(
                  "flex items-center px-[var(--space-md)] py-[var(--space-sm)]",
                  "text-[length:var(--bloom-text-body)] no-underline rounded-[var(--bloom-radius)]",
                  "transition-colors duration-[var(--bloom-duration-fast)]",
                  link.active
                    ? "color-[var(--bloom-text)] bg-[var(--bloom-surface2)] font-medium"
                    : "color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)] hover:bg-[var(--bloom-surface2)]"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );

    const pillStyle: CSSProperties = {
      top: `${offsetTop}px`,
      ...style,
    };

    return (
      <>
        <header
          ref={ref}
          className={cn(
            "bloom fixed left-1/2 z-40 -translate-x-1/2",
            // Pill shape
            "flex items-center gap-[var(--space-md)] whitespace-nowrap",
            "px-[var(--space-lg)] h-[56px]",
            "rounded-[var(--bloom-radius-pill)]",
            // Frosted glass surface
            "bg-[var(--bloom-surface)]/80 backdrop-blur-md",
            "border border-[var(--bloom-surface2)]",
            "shadow-[var(--bloom-shadow)]",
            // Smooth entrance
            "transition-shadow duration-[var(--bloom-duration)]",
            "hover:shadow-[var(--bloom-shadow-hover)]",
            className
          )}
          style={pillStyle}
          {...props}
        >
          {/* Logo */}
          {logo && <div className="flex items-center shrink-0 mr-[var(--space-sm)]">{logo}</div>}

          {/* Desktop links */}
          {links.length > 0 && (
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-[var(--space-xs)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-[var(--space-sm)] py-[var(--space-xs)]",
                    "text-[length:var(--bloom-text-body)] no-underline",
                    "rounded-[var(--bloom-radius)]",
                    "transition-colors duration-[var(--bloom-duration-fast)]",
                    link.active
                      ? "color-[var(--bloom-text)] font-medium bg-[var(--bloom-surface2)]"
                      : "color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)] hover:bg-[var(--bloom-surface2)]"
                  )}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA — desktop only */}
          {cta && <div className="hidden md:flex items-center shrink-0 ml-[var(--space-sm)]">{cta}</div>}

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => handleDrawerOpenChange(!drawerOpen)}
            className={cn(
              "flex md:hidden items-center justify-center",
              "ml-auto h-[36px] w-[36px] rounded-full shrink-0",
              "color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)]",
              "hover:bg-[var(--bloom-surface2)]",
              "transition-colors duration-[var(--bloom-duration-fast)]",
              "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30"
            )}
          >
            <HamburgerIcon open={drawerOpen} />
          </button>
        </header>

        {/* Mobile drawer */}
        <DialogPrimitive.Root open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
              className={cn(
                "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
              )}
            />
            <DialogPrimitive.Content
              className={cn(
                "bloom fixed z-50 inset-y-0 right-0",
                "h-full w-full max-w-[320px]",
                "bg-[var(--bloom-surface)] p-[var(--space-xl)]",
                "shadow-[var(--bloom-shadow-hover)]",
                "border-l border-[var(--bloom-surface2)]",
                "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
                "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200",
                "focus:outline-none"
              )}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-[var(--space-xl)]">
                {logo && (
                  <DialogPrimitive.Title asChild>
                    <div className="flex items-center">{logo}</div>
                  </DialogPrimitive.Title>
                )}
                {!logo && <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>}
                <DialogPrimitive.Close
                  className={cn(
                    "inline-flex items-center justify-center",
                    "h-[32px] w-[32px] rounded-full ml-auto",
                    "color-[var(--bloom-text-secondary)] hover:color-[var(--bloom-text)]",
                    "hover:bg-[var(--bloom-surface2)]",
                    "transition-colors duration-[var(--bloom-duration-fast)]",
                    "focus-visible:outline-none focus-visible:ring-[length:var(--bloom-focus-ring-width)] focus-visible:ring-[var(--bloom-accent1)]/30"
                  )}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </DialogPrimitive.Close>
              </div>

              {/* Drawer body */}
              {drawerContent ?? defaultDrawerContent}

              {/* CTA at bottom of drawer */}
              {cta && <div className="mt-[var(--space-xl)]">{cta}</div>}
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </>
    );
  }
);

Navbar.displayName = "Navbar";
