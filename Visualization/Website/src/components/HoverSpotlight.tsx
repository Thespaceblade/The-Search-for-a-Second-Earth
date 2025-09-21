"use client";

import React from "react";

type Props = {
  className?: string;
};

export default function HoverSpotlight({ className = "" }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0, a: 0 });
  React.useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, a: 1 });
    };
    const onLeave = () => setPos((p) => ({ ...p, a: 0 }));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={"pointer-events-none absolute inset-0 transition-opacity " + className}
      style={{
        opacity: pos.a ? 0.35 : 0,
        background: `radial-gradient(200px 200px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.15), transparent 60%)`,
      }}
    />
  );
}

