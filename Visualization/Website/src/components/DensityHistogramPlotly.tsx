"use client";

import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false }) as any;

type Props = {
  terrestrial: number[];
  gaseous: number[];
  nbins?: number;
  height?: number;
};

export default function DensityHistogramPlotly({ terrestrial, gaseous, nbins = 30, height = 420 }: Props) {
  const data = [
    {
      type: "histogram",
      x: terrestrial,
      name: "Terrestrial",
      nbinsx: nbins,
      marker: { color: "#f59e0b" },
      opacity: 0.6,
      hovertemplate: "Terrestrial: %{y}<extra></extra>",
    },
    {
      type: "histogram",
      x: gaseous,
      name: "Gaseous",
      nbinsx: nbins,
      marker: { color: "#3b82f6" },
      opacity: 0.6,
      hovertemplate: "Gaseous: %{y}<extra></extra>",
    },
  ] as any[];

  const layout: any = {
    barmode: "overlay",
    margin: { t: 12, r: 16, b: 48, l: 56 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "#1b2332",
    font: { color: "#e5e7eb" },
    xaxis: {
      title: { text: "Density (g/cm³)" },
      gridcolor: "#283445",
      zerolinecolor: "#283445",
    },
    yaxis: {
      title: { text: "Number of Planets" },
      gridcolor: "#283445",
      zerolinecolor: "#283445",
    },
    legend: { orientation: "h", x: 0, y: 1.08 },
    hoverlabel: {
      bgcolor: "#111827",
      bordercolor: "rgba(255,255,255,0.1)",
      font: { color: "#e5e7eb" },
    },
    autosize: true,
    height,
  };

  const config: any = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <div className="w-full" style={{ height }}>
      <Plot data={data} layout={layout} config={config} style={{ width: "100%", height: "100%" }} useResizeHandler />
    </div>
  );
}
