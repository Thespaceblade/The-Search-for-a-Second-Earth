"use client";

import React from "react";
import { DISPLAY_METRICS, MetricKey, MetricStat } from "../types/planets";

type Props = {
  k: MetricKey;
  stat: MetricStat;
};

export default function MetricBadgeWithTooltip({ k, stat }: Props) {
  const meta = DISPLAY_METRICS.find((m) => m.key === k)!;
  const show = stat.median != null;
  if (!show) return null;
  const label = meta.label.replace(/\(.+\)/, "");
  return (
    <div className="relative group inline-flex items-center">
      <span className="mr-1 rounded-full bg-white/10 px-2 py-0.5 text-xs">
        {label}: {formatNumber(stat.median)}{meta.unit ? " " + meta.unit : ""}
      </span>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 hidden -translate-x-1/2 translate-y-1 group-hover:block">
        <div className="mt-1 rounded-md border border-white/10 bg-[#111827] px-2 py-1 text-xs text-white shadow-lg">
          <div className="font-medium">{meta.label}</div>
          <div>Median: {formatNumber(stat.median)} {meta.unit}</div>
          {stat.p05 != null && stat.p95 != null ? (
            <div>5–95%: {formatNumber(stat.p05)} – {formatNumber(stat.p95)} {meta.unit}</div>
          ) : (
            <div>Insufficient data for percentiles</div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatNumber(n: number | null) {
  if (n == null || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

