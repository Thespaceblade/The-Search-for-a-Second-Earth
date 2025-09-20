"use client";

import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type Category = {
  label: string;
  min: number;
  max: number;
};

export type RadarDatum = {
  axis: string;
  value: number; // normalized 0..1
  raw?: number; // original value (optional, for tooltip)
  range?: [number, number];
};

type Props = {
  title: string;
  data: RadarDatum[];
  color?: string;
};

const defaultColor = "#4f46e5"; // indigo-600

export default function SpiderRadar({ title, data, color = defaultColor }: Props) {
  return (
    <div className="w-full">
      <div className="text-center mb-3">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      </div>
      <div className="h-[420px] w-full rounded-xl bg-[#1b2332] ring-1 ring-white/10 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid stroke="#6b7280" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "#e5e7eb", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 1]}
              tick={{ fill: "#e5e7eb", fontSize: 10 }}
              tickCount={5}
              stroke="#e5e7eb"
            />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#e5e7eb",
              }}
              formatter={(value: any, _name: any, payload: any) => {
                const v = typeof value === "number" ? value : Number(value);
                const raw = payload?.payload?.raw as number | undefined;
                const range = payload?.payload?.range as [number, number] | undefined;
                const norm = (v * 100).toFixed(0) + "%";
                if (raw != null && range) {
                  return [
                    `${norm} (raw: ${raw}, range: ${range[0]}–${range[1]})`,
                    payload?.payload?.axis,
                  ];
                }
                return [norm, payload?.payload?.axis];
              }}
            />
            <Radar
              name={title}
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

