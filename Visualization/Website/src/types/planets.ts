export type PlanetRawRow = Record<string, string>;

export type MetricKey =
  | "pl_rade"
  | "pl_bmasse"
  | "pl_insol"
  | "pl_eqt"
  | "st_teff"
  | "pl_orbeccen";

export type MetricStat = {
  median: number | null;
  p05: number | null;
  p95: number | null;
  samples: number[]; // raw numeric samples (cleaned)
};

export type PlanetProfile = {
  pl_name: string;
  hostname?: string;
  metrics: Record<MetricKey, MetricStat>;
};

export type SyntheticPlanet = {
  id: string;
  source: string; // pl_name seed
  pl_rade: number | null;
  pl_bmasse: number | null;
  pl_insol: number | null;
  pl_eqt: number | null;
  st_teff: number | null;
  pl_orbeccen: number | null;
};

export const DISPLAY_METRICS: { key: MetricKey; label: string; unit: string }[] = [
  { key: "pl_rade", label: "Radius (Re)", unit: "Re" },
  { key: "pl_bmasse", label: "Mass (Me)", unit: "Me" },
  { key: "pl_insol", label: "Insol (Se)", unit: "Se" },
  { key: "pl_eqt", label: "Teq (K)", unit: "K" },
  { key: "pl_orbeccen", label: "Ecc", unit: "" },
  { key: "st_teff", label: "Teff (K)", unit: "K" },
];

