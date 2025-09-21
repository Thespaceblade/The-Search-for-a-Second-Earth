import type { MetricKey, PlanetProfile, SyntheticPlanet } from "../types/planets";

const METRIC_RANGES: Record<MetricKey, [number, number]> = {
  pl_rade: [0, 5],
  pl_bmasse: [0, 20],
  pl_insol: [0, 5],
  pl_eqt: [50, 1000],
  st_teff: [2000, 12000],
  pl_orbeccen: [0, 0.95],
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

// Box-Muller transform
function randn() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function sampleTruncatedNormal(mean: number, std: number, lo: number, hi: number) {
  for (let i = 0; i < 10; i++) {
    const x = mean + randn() * std;
    if (x >= lo && x <= hi) return x;
  }
  return clamp(mean, lo, hi);
}

export function synthesizeSimilar(profile: PlanetProfile, n = 10): SyntheticPlanet[] {
  const out: SyntheticPlanet[] = [];
  for (let i = 0; i < n; i++) {
    const sp: SyntheticPlanet = {
      id: `${profile.pl_name}#${i + 1}`,
      source: profile.pl_name,
      pl_rade: null,
      pl_bmasse: null,
      pl_insol: null,
      pl_eqt: null,
      st_teff: null,
      pl_orbeccen: null,
    };
    (Object.keys(METRIC_RANGES) as MetricKey[]).forEach((k) => {
      const m = profile.metrics[k].median;
      if (m == null) return;
      const [lo, hi] = METRIC_RANGES[k];
      const std = Math.max(1e-9, Math.abs(m) * 0.1);
      let v = sampleTruncatedNormal(m, std, lo, hi);
      if (k === "pl_orbeccen") v = clamp(v, 0, 0.95);
      (sp as any)[k] = v;
    });
    out.push(sp);
  }
  return out;
}

