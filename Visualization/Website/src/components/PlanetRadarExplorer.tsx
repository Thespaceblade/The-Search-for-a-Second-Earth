"use client";

import React from "react";
import SpiderRadar, { RadarDatum } from "./SpiderRadar";

type PlanetItem = {
  name: string;
  data: RadarDatum[]; // normalized 0..1 with raw + range
  score: number; // distance to Earth (lower is better)
};

type Props = {
  items: PlanetItem[];
  initialSelected?: string;
};

function hashToColor(name: string): string {
  // Simple deterministic hash to HSL color
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue}, 70%, 55%)`;
}

export default function PlanetRadarExplorer({ items, initialSelected }: Props) {
  const [selected, setSelected] = React.useState<string>(
    initialSelected && items.some((it) => it.name === initialSelected)
      ? initialSelected
      : items[0]?.name
  );

  const selectedItem = React.useMemo(
    () => items.find((it) => it.name === selected) ?? items[0],
    [items, selected]
  );

  // Layout params for the radial menu (ring-based, evenly spaced per ring)
  const maxScore = items.length ? items[items.length - 1].score : 1;
  const minScore = items.length ? items[0].score : 0;
  const scoreRange = Math.max(1e-9, maxScore - minScore); // avoid div-by-zero
  const ringCount = 6;

  // Dynamically size rings to fit container; aim for 1.5x the previous size
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dims, setDims] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        setDims({ w: cr.width, h: cr.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const baseRMax = 270; // 1.5x 180
  const avail = Math.max(0, Math.min(dims.w || 0, dims.h || 0) / 2 - 20); // keep margin
  const rMax = Math.max(120, Math.min(baseRMax, avail || baseRMax));
  const rMin = rMax / 3; // keep the same proportion as before
  const ringGap = ringCount > 1 ? (rMax - rMin) / (ringCount - 1) : 0;

  type RingItem = { name: string; angle: number; r: number; color: string };
  const rings: RingItem[][] = Array.from({ length: ringCount }, () => []);
  // Assign items to rings by normalized score
  items.forEach((it) => {
    const t = Math.max(0, Math.min(1, (it.score - minScore) / scoreRange));
    const ringIdx = Math.min(ringCount - 1, Math.floor(t * ringCount));
    const color = hashToColor(it.name);
    rings[ringIdx].push({ name: it.name, angle: 0, r: rMin + ringIdx * ringGap, color });
  });
  // Evenly space within each ring
  for (const ring of rings) {
    const n = ring.length;
    ring.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < n; i++) {
      ring[i].angle = (i / n) * Math.PI * 2;
    }
  }

  return (
    <div className="flex flex-row gap-6 items-start">
      {/* Radial menu */}
      <div ref={containerRef} className="relative flex-1 h-[630px] rounded-none bg-[#111827] overflow-hidden">
        {/* Subtle rings for distance cue */}
        {Array.from({ length: ringCount }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: `${(rMin + i * ringGap) * 2}px`, height: `${(rMin + i * ringGap) * 2}px` }}
          />
        ))}

        {/* Earth in center (image) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/earth.jpg"
            alt="Earth"
            width={102}
            height={102}
            className="h-24 w-24 rounded-full object-cover shadow-lg ring-1 ring-white/30"
          />
        </div>

        {/* Planets arranged by rings */}
        {rings.map((ring, ridx) =>
          ring.map((p) => {
            const x = Math.cos(p.angle) * p.r;
            const y = Math.sin(p.angle) * p.r;
            return (
              <button
                key={`${ridx}-${p.name}`}
                onClick={() => setSelected(p.name)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                aria-label={`Select ${p.name}`}
              >
                <div
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-transform duration-150 group-hover:scale-150"
                  style={{ background: p.color }}
                />
                <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[10px] sm:text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {p.name}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Radar panel */}
      <div className="space-y-3 flex-1">
        {selectedItem ? (
          <SpiderRadar
            title={selectedItem.name}
            data={selectedItem.data}
            color={hashToColor(selectedItem.name)}
            centerPlanetColor={hashToColor(selectedItem.name)}
          />
        ) : (
          <div className="h-[630px] grid place-items-center bg-[#1b2332]">
            <span className="text-slate-400">Select a planet to view details</span>
          </div>
        )}
        <div className="text-xs text-slate-400 text-left">
          <p>
            Distance from Earth in the left menu reflects similarity to Earth across Radius, Mass, Insolation,
            Equilibrium Temp, Stellar Teff, and Eccentricity.
          </p>
        </div>
      </div>
    </div>
  );
}
