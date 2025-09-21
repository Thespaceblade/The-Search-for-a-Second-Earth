"use client";

import React from "react";

function makeStarsSVG(count: number, size = 800, color = "#ffffff", min = 0.3, max = 0.9) {
  const dots: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const r = (Math.random() * 1.5 + 0.3).toFixed(2);
    const a = (Math.random() * (max - min) + min).toFixed(2);
    dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${a}" />`);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>${dots.join(
    ""
  )}</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export default function Starfield() {
  const farRef = React.useRef<HTMLDivElement>(null);
  const midRef = React.useRef<HTMLDivElement>(null);
  const nearRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const far = farRef.current;
    const mid = midRef.current;
    const near = nearRef.current;
    if (!far || !mid || !near) return;

    // seed patterns once
    far.style.backgroundImage = `${makeStarsSVG(2000)}`;
    far.style.backgroundSize = "800px 800px";
    far.style.backgroundRepeat = "repeat";

    mid.style.backgroundImage = `${makeStarsSVG(1000)}`;
    mid.style.backgroundSize = "600px 600px";
    mid.style.backgroundRepeat = "repeat";

    near.style.backgroundImage = `${makeStarsSVG(400)}`;
    near.style.backgroundSize = "500px 500px";
    near.style.backgroundRepeat = "repeat";

    const onScroll = () => {
      const y = window.scrollY || 0;
      far.style.transform = `translateY(${y * 0.1}px)`;
      mid.style.transform = `translateY(${y * 0.2}px)`;
      near.style.transform = `translateY(${y * 0.35}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div ref={farRef} className="absolute inset-0" style={{ opacity: 0.55 }} />
      <div ref={midRef} className="absolute inset-0" style={{ opacity: 0.7 }} />
      <div ref={nearRef} className="absolute inset-0" style={{ opacity: 0.9 }} />
    </div>
  );
}

