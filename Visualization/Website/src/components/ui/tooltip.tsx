"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

type TimeoutHandle = ReturnType<typeof setTimeout>;

type TooltipContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  delayDuration: number;
  timerRef: React.MutableRefObject<TimeoutHandle | null>;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  tooltipId: string;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext(component: string) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error(`${component} must be used within a <Tooltip/>`);
  }
  return ctx;
}

export function TooltipProvider({ children }: { children: React.ReactNode; delayDuration?: number }) {
  return <>{children}</>;
}

type TooltipProps = {
  delayDuration?: number;
  children: React.ReactNode;
};

export function Tooltip({ delayDuration = 150, children }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef<TimeoutHandle | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const tooltipId = React.useId();

  const value = React.useMemo<TooltipContextValue>(
    () => ({ open, setOpen, delayDuration, timerRef, triggerRef, tooltipId }),
    [open, delayDuration, tooltipId],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

type TooltipTriggerProps = {
  children: React.ReactElement;
};

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  const { setOpen, delayDuration, timerRef, triggerRef, tooltipId, open } = useTooltipContext(
    "TooltipTrigger",
  );

  const handleOpen = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration, setOpen, timerRef]);

  const handleClose = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  }, [setOpen, timerRef]);

  const child = React.Children.only(children);

  const composedRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
    const { ref } = child as unknown as { ref?: React.Ref<HTMLElement> };
    if (typeof ref === "function") ref(node);
    else if (ref && "current" in ref) {
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  const compose = <E extends React.SyntheticEvent<any>>(
    handler?: (event: E) => void,
    ours?: (event: E) => void,
  ) => {
    return (event: E) => {
      handler?.(event);
      if (!event.defaultPrevented) ours?.(event);
    };
  };

  return React.cloneElement(child, {
    ref: composedRef,
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: compose(child.props.onMouseEnter, handleOpen),
    onMouseLeave: compose(child.props.onMouseLeave, handleClose),
    onFocus: compose(child.props.onFocus, () => setOpen(true)),
    onBlur: compose(child.props.onBlur, handleClose),
  });
};

type TooltipContentProps = {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
};

export const TooltipContent = ({ children, className, side = "top" }: TooltipContentProps) => {
  const { open, triggerRef, tooltipId } = useTooltipContext("TooltipContent");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!open || !mounted || !triggerRef.current) return null;

  const triggerRect = triggerRef.current.getBoundingClientRect();
  const positions: Record<typeof side, React.CSSProperties> = {
    top: {
      left: triggerRect.left + triggerRect.width / 2,
      top: triggerRect.top - 8,
      transform: "translate(-50%, -100%)",
    },
    bottom: {
      left: triggerRect.left + triggerRect.width / 2,
      top: triggerRect.bottom + 8,
      transform: "translate(-50%, 0)",
    },
    left: {
      left: triggerRect.left - 8,
      top: triggerRect.top + triggerRect.height / 2,
      transform: "translate(-100%, -50%)",
    },
    right: {
      left: triggerRect.right + 8,
      top: triggerRect.top + triggerRect.height / 2,
      transform: "translate(0, -50%)",
    },
  };

  return createPortal(
    <div
      id={tooltipId}
      role="tooltip"
      className={cn(
        "pointer-events-none fixed z-50 max-w-xs rounded-md border border-white/10 bg-slate-900/95 px-3 py-1.5 text-xs text-white shadow-lg",
        className,
      )}
      style={positions[side]}
    >
      {children}
    </div>,
    document.body,
  );
};
