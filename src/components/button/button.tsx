import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { type ButtonVariants, buttonVariants } from "./button.variants";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    asChild?: boolean;
    children: ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
