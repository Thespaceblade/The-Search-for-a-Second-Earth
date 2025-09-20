import path from "node:path";
import fs from "node:fs";
import SpiderRadar, { RadarDatum } from "../components/SpiderRadar";
import PlanetRadarExplorer from "../components/PlanetRadarExplorer";

type Row = Record<string, string>;

// Categories and ranges (match the Python version)
const CATEGORIES: { label: string; min: number; max: number; key: string }[] = [
  { label: "Radius", min: 0.5, max: 1.6, key: "pl_rade" },
  { label: "Mass", min: 0.2, max: 5.0, key: "pl_bmasse" },
  { label: "Insolation", min: 0.35, max: 1.75, key: "pl_insol" },
  { label: "Eq. Temp", min: 180, max: 310, key: "pl_eqt" },
  { label: "Solar Eff. Temp", min: 3500, max: 6500, key: "st_teff" },
  { label: "Eccentricity", min: 0.0, max: 0.2, key: "pl_orbeccen" },
];

function normalize(val: number, min: number, max: number) {
  const n = (val - min) / (max - min);
  return Math.max(0, Math.min(1, n));
}

function splitCSVLine(line: string): string[] {
  // Split by commas not inside quotes
  const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  return parts.map((s) => s.replace(/^"|"$/g, "").replace(/""/g, '"'));
}

function readCSVRecords(filePath: string): Row[] {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = splitCSVLine(lines[0]);
  const records: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const row: Row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = cols[j] ?? "";
    }
    records.push(row);
  }
  return records;
}

function getRadarDataForPlanet(records: Row[], planetName: string): RadarDatum[] | null {
  const candidates = records.filter((r) => (r["pl_name"] || "").trim() === planetName);
  if (candidates.length === 0) return null;

  // Prefer rows with default_flag === '1'
  const ordered = [
    ...candidates.filter((r) => (r["default_flag"] || "").trim() === "1"),
    ...candidates.filter((r) => (r["default_flag"] || "").trim() !== "1"),
  ];

  for (const row of ordered) {
    const data: RadarDatum[] = [];
    let ok = true;
    for (const c of CATEGORIES) {
      const rawStr = row[c.key];
      if (rawStr == null || rawStr === "") {
        ok = false;
        break;
      }
      const raw = Number.parseFloat(rawStr);
      if (!Number.isFinite(raw)) {
        ok = false;
        break;
      }
      const nPlanet = normalize(raw, c.min, c.max);
      const earthRaw = EARTH_TARGETS[c.key];
      const nEarth = normalize(earthRaw, c.min, c.max);
      const diff = Math.abs(nPlanet - nEarth);
      data.push({
        axis: c.label,
        value: diff, // absolute normalized difference to Earth
        raw,
        range: [c.min, c.max],
        earthRaw,
        earthNorm: nEarth,
      });
    }
    if (ok) return data;
  }
  return null;
}

// Earth target raw values for similarity calculation
const EARTH_TARGETS: Record<string, number> = {
  pl_rade: 1.0,
  pl_bmasse: 1.0,
  pl_insol: 1.0,
  pl_eqt: 255.0, // K (equilibrium temperature)
  st_teff: 5772.0, // K (solar effective temperature)
  pl_orbeccen: 0.0167,
};

function earthNormalizedVector(): number[] {
  return CATEGORIES.map((c) => normalize(EARTH_TARGETS[c.key], c.min, c.max));
}

type PlanetItem = { name: string; data: RadarDatum[]; score: number };

function collectPlanetItems(records: Row[]): PlanetItem[] {
  const groups = new Map<string, Row[]>();
  for (const r of records) {
    const name = (r["pl_name"] || "").trim();
    if (!name) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name)!.push(r);
  }

  const target = earthNormalizedVector();
  const items: PlanetItem[] = [];

  for (const [name, rows] of groups) {
    const ordered = [
      ...rows.filter((r) => (r["default_flag"] || "").trim() === "1"),
      ...rows.filter((r) => (r["default_flag"] || "").trim() !== "1"),
    ];
    for (const row of ordered) {
      // Ensure completeness of required fields
      let ok = true;
      const values: number[] = [];
      const radar: RadarDatum[] = [];
      for (const c of CATEGORIES) {
        const rawStr = row[c.key];
        if (rawStr == null || rawStr === "") {
          ok = false;
          break;
        }
        const raw = Number.parseFloat(rawStr);
        if (!Number.isFinite(raw)) {
          ok = false;
          break;
        }
        const nPlanet = normalize(raw, c.min, c.max);
        const earthRaw = EARTH_TARGETS[c.key];
        const nEarth = normalize(earthRaw, c.min, c.max);
        const diff = Math.abs(nPlanet - nEarth);
        values.push(nPlanet);
        radar.push({ axis: c.label, value: diff, raw, range: [c.min, c.max], earthRaw, earthNorm: nEarth });
      }
      if (!ok) continue;
      // Distance to Earth normalized vector (Euclidean)
      let d2 = 0;
      for (let i = 0; i < values.length; i++) {
        const d = values[i] - target[i];
        d2 += d * d;
      }
      const score = Math.sqrt(d2);
      items.push({ name, data: radar, score });
      break; // take first valid row per planet
    }
  }

  items.sort((a, b) => a.score - b.score);
  return items;
}

function resolveDataPath(): string | null {
  const envPath = process.env.DATA_CSV_PATH;
  const candidates = [
    envPath,
    // Preferred location inside the app's public folder
    path.join(process.cwd(), "public", "data", "rawdata.csv"),
    path.join(process.cwd(), "public", "rawdata.csv"),
    path.join(process.cwd(), "rawdata.csv"),
    path.join(process.cwd(), "..", "rawdata.csv"),
    path.join(process.cwd(), "..", "..", "rawdata.csv"),
  ].filter((p): p is string => !!p);
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

export default function BackgroundPage() {
  // Read dataset on the server and build radar data for the default planet
  const datasetPath = resolveDataPath();
  let radarData: RadarDatum[] | null = null;
  let planetTitle = "GJ 1132 b";
  let planetItems: PlanetItem[] = [];
  let errorReason: string | null = null;
  try {
    if (!datasetPath) {
      errorReason = "CSV not found (public/data/rawdata.csv)";
    } else {
      const records = readCSVRecords(datasetPath);
      planetItems = collectPlanetItems(records);
      const data = getRadarDataForPlanet(records, planetTitle);
      if (!data) errorReason = "Planet not found or incomplete data";
      else radarData = data;
    }
  } catch (e) {
    errorReason = "Error reading CSV";
    radarData = null;
  }

  return (
    <main className="min-h-screen bg-[#0b1220]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 xl:max-w-[66vw] py-12 space-y-12">
        {/* Hero */}
        <header id="mission" className="space-y-6 text-center scroll-mt-24 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-center">
            The Search for the Second Earth
          </h1>
          <div className="prose prose-invert max-w-prose mx-auto">
            <p className="leading-7">
              Humanity’s growth is outpacing what Earth alone can sustainably provide. We’re exploring bold,
              data-driven pathways to safeguard our future among the stars.
            </p>
          </div>
        </header>

        {/* Key pressures (cards) */}
        <section id="pressures" className="space-y-6 text-center scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">A summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Why this matters</h3>
              <p className="text-slate-300 max-w-prose mx-auto">
                The UN projects a peak near 10.3B in the 2080s, magnifying stress on essential systems. Food,
                water, and energy demands keep rising while forests and freshwater reserves decline. Even
                renewables are being stretched—underscoring the need for long-term solutions beyond Earth. Its
                important to secure a future for humanity on another habitable world, and we can start to look
                for other habitable worlds now.
              </p>
            </article>
            <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">What makes a good world?</h3>
              <p className="text-slate-300 max-w-prose mx-auto">
                A good planet for life needs the right size and gravity to hold an atmosphere, a stable climate
                in the star’s habitable zone for liquid water, and protection from radiation through a magnetic
                field. It should have a breathable atmosphere, moderate seasons, and geologic activity to
                recycle nutrients and keep conditions stable. Together
              </p>
            </article>
            <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Sustainability Gap</h3>
              <p className="text-slate-300 max-w-prose mx-auto">&nbsp;</p>
            </article>
          </div>
        </section>

        {/* Data visualization: Spider (Radar) Graph */}
        <section id="visualizations" className="space-y-6 text-center scroll-mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">Data Visualizations</h2>
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-4">
            {planetItems.length > 0 ? (
              <PlanetRadarExplorer items={planetItems} initialSelected={planetTitle} />
            ) : (
              <>
                {radarData ? (
                  <SpiderRadar title={planetTitle} data={radarData} />
                ) : (
                  <div className="aspect-[16/9] grid place-items-center rounded-xl bg-white/5">
                    <span className="text-slate-400">Spider graph unavailable ({errorReason ?? "unknown reason"}).</span>
                  </div>
                )}
              </>
            )}
            <div className="prose prose-invert max-w-prose mx-auto">
              <p className="text-sm text-slate-400">
                The menu places planets by similarity to Earth (closer = more similar). Radar axes show absolute
                normalized difference from Earth’s value; smaller radius = more Earth‑like.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
