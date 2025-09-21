"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { PlanetProfile, MetricKey } from "../types/planets";
import PlanetIcon from "./PlanetIcon";

type Props = {
  profiles: PlanetProfile[];
};

export default function FeaturedPlanetsRow({ profiles }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tileWidth, setTileWidth] = React.useState(96);
  const [iconSize, setIconSize] = React.useState(80);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const GAP = 4; // px between items (gap-1)
    const calc = () => {
      const w = el.clientWidth || 0;
      const n = Math.max(1, profiles.length);
      const totalGaps = GAP * (n - 1);
      // Compute width per tile so all fit on one row
      const tw = Math.max(64, Math.floor((w - totalGaps) / n));
      // Make the icon fill its tile (bigger than before), capped for safety
      const icon = Math.max(48, Math.min(tw, 200));
      setTileWidth(tw);
      setIconSize(icon);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [profiles.length]);

  return (
    <div ref={containerRef} className="w-full">
      <ul className="list-none flex flex-nowrap justify-center gap-1 py-6">
        {profiles.map((p) => (
          <li key={p.pl_name} className="relative" style={{ width: tileWidth }}>
            <PlanetBadge profile={p} iconSize={iconSize} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanetBadge({ profile, iconSize = 72 }: { profile: PlanetProfile; iconSize?: number }) {
  const [hover, setHover] = React.useState(false);
  const [side, setSide] = React.useState<"left" | "right">("right");
  const prefersReduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const metrics: MetricKey[] = ["pl_rade", "pl_bmasse", "pl_insol", "pl_eqt", "pl_orbeccen", "st_teff"];
  React.useEffect(() => {
    if (!hover) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const needLeft = window.innerWidth - rect.right < 320; // if not enough space on right
    setSide(needLeft ? "left" : "right");
  }, [hover]);
  return (
    <div
      ref={ref}
      className="group relative w-full text-center text-white focus-within:ring-indigo-500"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div
        className="mx-auto rounded-full ring-1 ring-white/10 shadow-sm transition-transform duration-200 ease-out group-hover:scale-115"
        style={{ width: iconSize, height: iconSize }}
      >
        <PlanetIcon name={profile.pl_name} size={iconSize} />
      </div>
      <div className="mt-2 truncate text-xs sm:text-sm text-slate-300" title={profile.pl_name}>{profile.pl_name}</div>

      {/* Hover table overlay */}
      {hover && (
        <motion.div
          className={`absolute z-50 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-[#0b1220] p-3 text-sm text-white shadow-xl will-change-transform ${
            side === "right" ? "left-full ml-2" : "right-full mr-2"
          }`}
          initial={prefersReduced ? false : { opacity: 0, x: side === "right" ? 8 : -8 }}
          animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, x: side === "right" ? 8 : -8 }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          role="dialog"
          aria-label={`${profile.pl_name} stats`}
        >
          {/* Arrow */}
          <div
            className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-[#0b1220] border border-white/10 ${
              side === "right" ? "-left-1" : "-right-1"
            }`}
          />
          <table className="w-64 text-left">
            <tbody>
              {metrics.map((k) => (
                <tr key={k} className="border-t border-white/10 first:border-0">
                  <td className="py-1 pr-3 text-slate-300">{labelFor(k)}</td>
                  <td className="py-1">{fmt(profile.metrics[k].median)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

function labelFor(k: MetricKey) {
  switch (k) {
    case "pl_rade":
      return "Radius (Re)";
    case "pl_bmasse":
      return "Mass (Me)";
    case "pl_insol":
      return "Insol (Se)";
    case "pl_eqt":
      return "Teq (K)";
    case "st_teff":
      return "Teff (K)";
    case "pl_orbeccen":
      return "Ecc";
  }
}
function fmt(n: number | null) {
  if (n == null || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}
