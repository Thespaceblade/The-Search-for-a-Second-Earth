"use client";
import dynamic from 'next/dynamic';

const Plotly = dynamic(() => import('react-plotly.js'), { ssr: false });

export type PlotProps = {
  data: any[];
  layout?: any;
  config?: any;
  style?: React.CSSProperties;
};

export default function Plot(props: PlotProps) {
  // Types from react-plotly.js can be noisy; keep it permissive.
  return <Plotly {...props} />;
}
