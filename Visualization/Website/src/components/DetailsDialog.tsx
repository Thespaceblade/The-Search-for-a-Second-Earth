"use client";

import React from "react";
import type { PlanetProfile, MetricKey } from "../types/planets";

type Props = {
  open: boolean;
  onClose: () => void;
  profile?: PlanetProfile | null;
};

export default function DetailsDialog({ open, onClose, profile }: Props) {
  if (!open || !profile) return null;
  const keys: MetricKey[] = ["pl_rade", "pl_bmasse", "pl_insol", "pl_eqt", "st_teff", "pl_orbeccen"];
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-[#0b1220] p-4 text-white shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{profile.pl_name}</h3>
          <button className="rounded-md px-2 py-1 text-slate-300 hover:bg-white/10" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="space-y-2">
          {keys.map((k) => (
            <div key={k} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-sm">
              <span className="text-slate-300">{k}</span>
              <span>
                median: {fmt(profile.metrics[k].median)}
                {profile.metrics[k].p05 != null && profile.metrics[k].p95 != null ? (
                  <span className="text-slate-400"> (p05–p95: {fmt(profile.metrics[k].p05)}–{fmt(profile.metrics[k].p95)})</span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function fmt(n: number | null) {
  if (n == null) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

