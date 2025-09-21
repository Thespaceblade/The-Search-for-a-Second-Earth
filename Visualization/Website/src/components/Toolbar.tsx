"use client";

import React from "react";
import type { HospitableThresholds } from "../lib/planets";

type Props = {
  query: string;
  onQuery: (s: string) => void;
  sort: string;
  onSort: (s: string) => void;
  hospitable: boolean;
  onHospitable: (b: boolean) => void;
  thresholds: HospitableThresholds;
  onThresholds?: (t: HospitableThresholds) => void;
};

export default function Toolbar({ query, onQuery, sort, onSort, hospitable, onHospitable }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full rounded-md bg-white/10 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-300">Sort:</label>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="rounded-md bg-white/10 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="pl_rade">Radius</option>
          <option value="pl_bmasse">Mass</option>
          <option value="pl_eqt">Teq</option>
          <option value="pl_insol">Insol</option>
          <option value="pl_orbeccen">Ecc</option>
        </select>
        <label className="ml-3 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hospitable}
            onChange={(e) => onHospitable(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500"
          />
          Hospitable filter
        </label>
      </div>
    </div>
  );
}

