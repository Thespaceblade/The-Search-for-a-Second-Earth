import type { MetricKey, MetricStat, PlanetProfile, PlanetRawRow } from "../types/planets";

const NUMERIC_KEYS: MetricKey[] = [
  "pl_rade",
  "pl_bmasse",
  "pl_insol",
  "pl_eqt",
  "st_teff",
  "pl_orbeccen",
];

export const ALLOWED_PLANETS = new Set<string>([
  "GJ 367 b",
  "HD 136352 b",
  "HD 219134 c",
  "HD 23472 d",
  "HD 23472 e",
  "HD 23472 f",
  "HD 260655 b",
  "HD 260655 c",
  "K2-266 c",
  "K2-3 c",
  "Kepler-138 c",
  "Kepler-138 d",
  "TOI-1266 c",
  "TOI-500 b",
]);

export function toNumber(s: string | undefined): number | null {
  if (!s) return null;
  const n = Number.parseFloat(String(s));
  return Number.isFinite(n) ? n : null;
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const a = [...values].sort((x, y) => x - y);
  const mid = Math.floor(a.length / 2);
  if (a.length % 2 === 0) return (a[mid - 1] + a[mid]) / 2;
  return a[mid];
}

export function percentile(values: number[], p: number): number | null {
  if (values.length === 0) return null;
  const a = [...values].sort((x, y) => x - y);
  const idx = (a.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return a[lo];
  const w = idx - lo;
  return a[lo] * (1 - w) + a[hi] * w;
}

export function consolidateProfiles(rows: PlanetRawRow[]): PlanetProfile[] {
  // Group by pl_name
  const groups = new Map<string, PlanetRawRow[]>();
  for (const r of rows) {
    const name = (r["pl_name"] || "").trim();
    if (!name || !ALLOWED_PLANETS.has(name)) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name)!.push(r);
  }

  const out: PlanetProfile[] = [];
  for (const [pl_name, arr] of groups) {
    const metrics: Record<MetricKey, MetricStat> = {
      pl_rade: { median: null, p05: null, p95: null, samples: [] },
      pl_bmasse: { median: null, p05: null, p95: null, samples: [] },
      pl_insol: { median: null, p05: null, p95: null, samples: [] },
      pl_eqt: { median: null, p05: null, p95: null, samples: [] },
      st_teff: { median: null, p05: null, p95: null, samples: [] },
      pl_orbeccen: { median: null, p05: null, p95: null, samples: [] },
    };

    for (const key of NUMERIC_KEYS) {
      const vals = arr.map((r) => toNumber(r[key] ?? "")).filter((v): v is number => v != null && Number.isFinite(v));
      metrics[key].samples = vals;
      metrics[key].median = median(vals);
      metrics[key].p05 = percentile(vals, 0.05);
      metrics[key].p95 = percentile(vals, 0.95);
    }

    // identifiers
    let hostname: string | undefined;
    for (const r of arr) {
      const h = (r["hostname"] || "").trim();
      if (h) {
        hostname = h;
        break;
      }
    }

    out.push({ pl_name, hostname, metrics });
  }
  // Sort by name for consistency
  out.sort((a, b) => a.pl_name.localeCompare(b.pl_name));
  return out;
}

export type HospitableThresholds = {
  radius: [number, number];
  teq: [number, number];
  ecc: [number, number];
};

export const DEFAULT_THRESHOLDS: HospitableThresholds = {
  radius: [0.5, 1.6],
  teq: [200, 350],
  ecc: [0, 0.2],
};

export function isHospitable(p: PlanetProfile, t: HospitableThresholds = DEFAULT_THRESHOLDS) {
  const r = p.metrics.pl_rade.median;
  const teq = p.metrics.pl_eqt.median;
  const e = p.metrics.pl_orbeccen.median;
  return (
    r != null && r >= t.radius[0] && r <= t.radius[1] &&
    teq != null && teq >= t.teq[0] && teq <= t.teq[1] &&
    e != null && e >= t.ecc[0] && e <= t.ecc[1]
  );
}

