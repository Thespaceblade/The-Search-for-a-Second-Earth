"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import HoverSpotlight from "./HoverSpotlight";
import MetricBadgeWithTooltip from "./MetricBadgeWithTooltip";
import type { PlanetProfile, MetricKey } from "../types/planets";

type Props = {
  profile: PlanetProfile;
  onGenerate: (p: PlanetProfile) => void;
  onDetails: (p: PlanetProfile) => void;
};

const SPARK_KEY: MetricKey = "pl_rade"; // show spark for radius if enough samples

export default function PlanetCard({ profile, onGenerate, onDetails }: Props) {
  const prefersReduced = useReducedMotion();
  const metrics = profile.metrics;
  const spark = metrics[SPARK_KEY].samples;
  const hasSpark = spark && spark.length >= 4;

  return (
    <motion.div
      whileHover={prefersReduced ? undefined : { y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative"
    >
      <Card className="group overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500" tabIndex={0}>
        <HoverSpotlight />
        <CardHeader className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{profile.pl_name}</h3>
            {profile.hostname ? (
              <div className="text-xs text-slate-400">{profile.hostname}</div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {(
              [
                "pl_rade",
                "pl_bmasse",
                "pl_insol",
                "pl_eqt",
                "pl_orbeccen",
                "st_teff",
              ] as MetricKey[]
            ).map((k) => (
              <MetricBadgeWithTooltip key={k} k={k} stat={metrics[k]} />
            ))}
          </div>
          {hasSpark ? (
            <SparkBar values={spark} />
          ) : null}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between opacity-100 md:opacity-0 transition-opacity duration-200 md:group-hover:opacity-100 group-focus-within:opacity-100">
            <button
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              onClick={() => onGenerate(profile)}
            >
              Generate 10 similar
            </button>
            <button
              className="rounded-md px-3 py-1 text-sm text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              onClick={() => onDetails(profile)}
            >
              Details
            </button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function SparkBar({ values }: { values: number[] }) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const p05 = percentile(sorted, 0.05);
  const p95 = percentile(sorted, 0.95);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min || 1;
  const start = ((p05 - min) / range) * 100;
  const end = ((p95 - min) / range) * 100;
  return (
    <div className="mt-1 h-2 w-full rounded bg-white/10">
      <div
        className="h-2 rounded bg-indigo-500/60"
        style={{ width: `${Math.max(1, end - start)}%`, marginLeft: `${start}%` }}
      />
    </div>
  );
}

function percentile(arr: number[], p: number) {
  const i = (arr.length - 1) * p;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  if (lo === hi) return arr[lo];
  const w = i - lo;
  return arr[lo] * (1 - w) + arr[hi] * w;
}
