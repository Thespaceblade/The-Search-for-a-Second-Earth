"use client";

import React from "react";
import { exportToCSV } from "../lib/export";
import type { SyntheticPlanet } from "../types/planets";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  open: boolean;
  onClose: () => void;
  data: SyntheticPlanet[];
};

export default function SyntheticDrawer({ open, onClose, data }: Props) {
  const json = JSON.stringify(data, null, 2);
  const metrics = [
    { key: "pl_rade", label: "Radius (Re)" },
    { key: "pl_bmasse", label: "Mass (Me)" },
    { key: "pl_insol", label: "Insol (Se)" },
    { key: "pl_eqt", label: "Teq (K)" },
    { key: "pl_orbeccen", label: "Ecc" },
  ] as const;

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl transform bg-[#0b1220] text-white transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h3 className="text-lg font-semibold">Synthetic Cohort</h3>
        <button className="rounded-md px-2 py-1 text-slate-300 hover:bg-white/10" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex gap-2">
          <button
            className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            onClick={() => navigator.clipboard.writeText(json)}
          >
            Copy JSON
          </button>
          <button
            className="rounded-md bg-white/10 px-3 py-1 text-sm font-medium hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            onClick={() => exportToCSV(data as any, "synthetic_planets.csv")}
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-auto rounded-md border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-3 py-2">ID</th>
                {metrics.map((m) => (
                  <th key={m.key} className="px-3 py-2">{m.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-t border-white/10">
                  <td className="px-3 py-2 text-slate-300">{row.id}</td>
                  {metrics.map((m) => (
                    <td key={m.key} className="px-3 py-2">
                      {format((row as any)[m.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div key={m.key} className="h-40 rounded-md border border-white/10 bg-[#1b2332] p-2">
              <div className="mb-1 text-xs text-slate-300">{m.label}</div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.map((d, i) => ({ i, v: (d as any)[m.key] ?? null })).filter((x) => x.v != null)}
                >
                  <XAxis dataKey="i" hide />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e5e7eb" }} />
                  <Area type="monotone" dataKey="v" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function format(n: number | null) {
  if (n == null) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

