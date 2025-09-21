"use client";

import * as React from "react";

export function useSpotlight<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);

  const handleMove = React.useCallback((event: React.MouseEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--x", `${x}%`);
    node.style.setProperty("--y", `${y}%`);
  }, []);

  const reset = React.useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--x", "50%");
    node.style.setProperty("--y", "50%");
  }, []);

  const style = React.useMemo<React.CSSProperties>(
    () => ({ "--x": "50%", "--y": "50%" } as React.CSSProperties),
    [],
  );

  return { ref, handleMove, reset, style };
}
