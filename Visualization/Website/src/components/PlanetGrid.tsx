"use client";

import React from "react";
import PlanetCard from "./PlanetCard";
import Toolbar from "./Toolbar";
import SyntheticDrawer from "./SyntheticDrawer";
import DetailsDialog from "./DetailsDialog";
import { DEFAULT_THRESHOLDS, isHospitable } from "../lib/planets";
import type { PlanetProfile, SyntheticPlanet } from "../types/planets";
import { synthesizeSimilar } from "../lib/synthesize";

type Props = {
  data: PlanetProfile[];
};

export default function PlanetGrid({ data }: Props) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("pl_rade");
  const [hospitable, setHospitable] = React.useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cohort, setCohort] = React.useState<SyntheticPlanet[]>([]);
  const [details, setDetails] = React.useState<PlanetProfile | null>(null);

  const filtered = React.useMemo(() => {
    let arr = data;
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((p) => p.pl_name.toLowerCase().includes(q));
    }
    if (hospitable) {
      arr = arr.filter((p) => isHospitable(p, DEFAULT_THRESHOLDS));
    }
    arr = [...arr].sort((a, b) => ((a.metrics as any)[sort].median ?? Infinity) - ((b.metrics as any)[sort].median ?? Infinity));
    return arr;
  }, [data, query, hospitable, sort]);

  function handleGenerate(p: PlanetProfile) {
    const synth = synthesizeSimilar(p, 10);
    setCohort(synth);
    setDrawerOpen(true);
  }

  function handleDetails(p: PlanetProfile) {
    setDetails(p);
  }

  return (
    <div className="space-y-4">
      <Toolbar
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        hospitable={hospitable}
        onHospitable={setHospitable}
        thresholds={DEFAULT_THRESHOLDS}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
          No planets to display. Ensure the CSV exists at <code className="text-slate-200">/public/data/selected_planets_full.csv</code> and includes the requested planet names.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PlanetCard key={p.pl_name} profile={p} onGenerate={handleGenerate} onDetails={handleDetails} />
          ))}
        </div>
      )}

      <SyntheticDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} data={cohort} />
      <DetailsDialog open={!!details} onClose={() => setDetails(null)} profile={details} />
    </div>
  );
}
