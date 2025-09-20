"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DensityBinDatum = {
  binLabel: string;
  binStart: number;
  binEnd: number;
  terrestrial: number;
  gaseous: number;
};

type Props = {
  data: DensityBinDatum[];
  height?: number;
};

export default function DensityHistogramChart({ data, height = 420 }: Props) {
  return (
    <div className="w-full">
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={0} barGap={-4} margin={{ top: 16, right: 16, left: 8, bottom: 32 }}>
            <CartesianGrid stroke="#283445" vertical={false} />
            <XAxis
              dataKey="binLabel"
              tick={{ fill: "#e5e7eb", fontSize: 11 }}
              interval={Math.max(0, Math.floor(data.length / 12) - 1)}
            />
            <YAxis tick={{ fill: "#e5e7eb", fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#e5e7eb",
              }}
              formatter={(value: any, name: any, payload: any) => {
                const count = typeof value === "number" ? value : Number(value);
                const p = payload?.payload as DensityBinDatum | undefined;
                const range = p ? `${p.binStart.toFixed(2)}–${p.binEnd.toFixed(2)} g/cm³` : "";
                return [count, `${name} (${range})`];
              }}
            />
            <Legend wrapperStyle={{ color: "#e5e7eb" }} />
            <Bar name="Terrestrial" dataKey="terrestrial" fill="#f59e0b" fillOpacity={0.6} />
            <Bar name="Gaseous" dataKey="gaseous" fill="#3b82f6" fillOpacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

