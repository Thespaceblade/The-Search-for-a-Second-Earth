"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactElement;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, className, ...props }, ref) => {
  if (!React.isValidElement(children)) {
    return null;
  }
  return React.cloneElement(children, {
    ...props,
    ref,
    className: cn(className, (children.props as { className?: string }).className),
  });
});

Slot.displayName = "Slot";

export type ButtonVariant = "default" | "ghost" | "outline" | "secondary";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", asChild = false, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 disabled:pointer-events-none disabled:opacity-50 ring-offset-[#0b1220]";

    const variants: Record<ButtonVariant, string> = {
      default: "bg-indigo-500/90 text-white hover:bg-indigo-400",
      ghost: "bg-transparent text-white hover:bg-white/10 border border-white/20",
      outline: "border border-white/40 bg-transparent text-white hover:bg-white/10",
      secondary: "bg-white/10 text-white hover:bg-white/20",
    };

    const Comp: any = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
