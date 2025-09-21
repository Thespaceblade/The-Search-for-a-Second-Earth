import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Header from "../../../components/Header";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { TooltipProvider } from "../../../components/ui/tooltip";
import { Separator } from "../../../components/ui/separator";
import { StatCard } from "../../../components/our-methods/StatCard";
import { ImageCard } from "../../../components/our-methods/ImageCard";
import { ChartCard } from "../../../components/our-methods/ChartCard";
import { RuleTable } from "../../../components/our-methods/RuleTable";
import { CtaRow } from "../../../components/our-methods/CtaRow";
import { Card, CardContent } from "../../../components/ui/card";

const VARIABLE_CARDS = [
  {
    name: "Planetary Radius",
    code: "pl_rade",
    description:
      "The radius of the planet as a ratio to Earth’s radius. Dictates gravity, atmospheric pressure, and the state of water on a planet.",
    units: "Earth radii (R⊕)",
    range: "0.5–1.6 R⊕",
    rationale: "Keeps gravity and pressure within a band where liquid water persists and atmospheres remain stable without crushing biospheres.",
  },
  {
    name: "Planetary Mass",
    code: "pl_bmasse",
    description:
      "The mass of the planet as a ratio to Earth’s mass. Determines the ability to maintain a magnetic field, terrestrial state, and maintaining an atmosphere.",
    units: "Earth masses (M⊕)",
    range: "0.2–5 M⊕",
    rationale: "Balances tectonic activity and magnetic shielding; lighter planets lose air, heavier ones risk turning into mini-Neptunes.",
  },
  {
    name: "Stellar Insolation",
    code: "pl_insol",
    description:
      "The amount of light the planet receives compared to Earth per square unit on average. This indicates the climate on the planet.",
    units: "Earth insolation units (S⊕)",
    range: "0.35–1.75 S⊕",
    rationale: "Too little light freezes oceans; too much drives runaway greenhouse feedbacks. This band keeps climates temperate.",
  },
  {
    name: "Equilibrium Temperature",
    code: "pl_eqt",
    description:
      "Estimate of average temperature based on star distance and insolation. Can help to determine surface temperature and cooling or reflection.",
    units: "Kelvin (K)",
    range: "180–310 K",
    rationale: "Anchors median surface temperatures near water’s triple point—critical for sustaining liquid reservoirs.",
  },
  {
    name: "Stellar Effective Temperature",
    code: "st_teff",
    description:
      "The surface temperature, flares, and wavelength. Can help determine the radiation stability.",
    units: "Kelvin (K)",
    range: "3500–6500 K",
    rationale: "Targets main-sequence stars mellow enough to avoid sterilizing flares yet bright enough for photosynthesis-compatible spectra.",
  },
  {
    name: "Orbital Eccentricity",
    code: "pl_orbeccen",
    description:
      "The sensitivity of the seasons and climate through the orbit. Lower values can give more stable bodies of water and climate, preventing huge swings or collapses.",
    units: "dimensionless",
    range: "< 0.2",
    rationale: "Limits seasonal extremes so oceans avoid boiling/freezing cycles as the world sweeps around its star.",
  },
];

const HISTOGRAMS = [
  {
    src: "/images/our-methods/eccentric.png",
    alt: "Histogram of orbital eccentricity values",
    caption: "Orbital Eccentricity Distribution (pl_orbeccen)",
    annotation:
      "Most viable planets cluster below e = 0.1, underscoring the preference for nearly circular orbits that stabilize climate swings.",
  },
  {
    src: "/images/our-methods/eq_temp.png",
    alt: "Histogram of equilibrium temperatures",
    caption: "Equilibrium Temperature (pl_eqt)",
    annotation:
      "A broad peak around 240–270 K indicates temperate worlds; tails on either side illustrate the edges of the habitable comfort zone.",
  },
  {
    src: "/images/our-methods/insolation.png",
    alt: "Histogram of stellar insolation",
    caption: "Stellar Insolation (pl_insol)",
    annotation:
      "Energy input stays within a narrow corridor—evidence that our thresholds filter out runaway greenhouse or snowball candidates.",
  },
  {
    src: "/images/our-methods/mass.png",
    alt: "Histogram of planetary mass",
    caption: "Planetary Mass (pl_bmasse)",
    annotation:
      "The distribution favors super-Earth masses under 5 M⊕, supporting worlds heavy enough to keep atmospheres but light enough to stay rocky.",
  },
  {
    src: "/images/our-methods/radius.png",
    alt: "Histogram of planetary radius",
    caption: "Planetary Radius (pl_rade)",
    annotation:
      "A steep drop beyond 1.6 R⊕ shows where planets transition toward mini-Neptunes—our cut keeps the sample terrestrially biased.",
  },
  {
    src: "/images/our-methods/star_teff.png",
    alt: "Histogram of stellar effective temperatures",
    caption: "Stellar Effective Temperature (st_teff)",
    annotation:
      "Cool K- and warm G-type hosts dominate, pointing to stars that balance longevity with spectral quality.",
  },
];

const RULE_ROWS = [
  { variable: "Planetary Radius", pass: 169, fail: 28 },
  { variable: "Planetary Mass", pass: 161, fail: 36 },
  { variable: "Stellar Insolation", pass: 194, fail: 3 },
  { variable: "Equilibrium Temperature", pass: 193, fail: 4 },
  { variable: "Stellar Effective Temperature", pass: 167, fail: 30 },
  { variable: "Orbital Eccentricity", pass: 167, fail: 30 },
];

const CURATED_ASSET_PATHS = new Set(HISTOGRAMS.map((item) => item.src));
const SUPPLEMENTAL_GRAPHS = readSupplementalGraphs(CURATED_ASSET_PATHS);
const PUBLIC_CHARTS = readPublicCharts(CURATED_ASSET_PATHS);

function resolveCsv(pathFragment: string) {
  const candidate = path.join(process.cwd(), "public", pathFragment);
  try {
    return fs.existsSync(candidate);
  } catch {
    return false;
  }
}

export default function OurMethodsPage() {
  const hasSelectedCsv = resolveCsv("data/selected_planets_full.csv");
  const hasRawCsv = resolveCsv("data/rawdata.csv");

  return (
    <TooltipProvider delayDuration={150}>
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(54,78,126,0.6),transparent_60%)]">
        <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
          <Header />

          <section className="mt-14 space-y-5 text-center">
            
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Methods</h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
            
            </div>
          </section>

          <Separator className="my-14" />

          <section className="space-y-7">
           
            <div className="grid gap-5 md:grid-cols-2">
              {VARIABLE_CARDS.map((card) => (
                <StatCard key={card.code} {...card} />
              ))}
            </div>
          </section>

          <section className="mt-16 space-y-7">
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Evidence &amp; Visualization</p>
              <h2 className="text-2xl font-semibold text-white sm:text-[1.85rem]">What the Data Looks Like</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HISTOGRAMS.map((item) => (
                <ImageCard key={item.caption} {...item} />
              ))}
            </div>
          </section>

          {SUPPLEMENTAL_GRAPHS.length > 0 ? (
            <section className="mt-16 space-y-7">
              <div className="space-y-2 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Notebook Exports</p>
                <h2 className="text-2xl font-semibold text-white sm:text-[1.85rem]">Supplementary Graph Gallery</h2>
                <p className="mx-auto max-w-2xl text-sm text-slate-300">
                  These images are read directly from <code className="rounded bg-white/5 px-1.5 py-0.5 text-[0.75rem] text-white/90">/public/graphs</code>. Drop fresh renders from your notebooks to keep this appendix current.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {SUPPLEMENTAL_GRAPHS.map((graph) => (
                  <ImageCard key={graph.src} {...graph} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-16 space-y-7">
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Public Charts</p>
              <h2 className="text-2xl font-semibold text-white sm:text-[1.85rem]">Shared Chart Library</h2>
              
            </div>
            {PUBLIC_CHARTS.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PUBLIC_CHARTS.map((chart) => (
                  <ChartCard key={chart.src} {...chart} />
                ))}
              </div>
            ) : (
              <Card className="border-white/10 bg-white/[0.03]">
                <CardContent className="py-8 text-center text-sm text-slate-300">
                  No charts found yet. Add PNG, JPG, GIF, or WebP files to <code className="rounded bg-white/5 px-1.5 py-0.5 text-[0.75rem] text-white/90">/public/charts</code> and they will appear here automatically.
                </CardContent>
              </Card>
            )}
          </section>

          <section className="mt-16 space-y-7">
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Ground Rules</p>
              <h2 className="text-2xl font-semibold text-white sm:text-[1.85rem]">Our Screening Rules</h2>
            </div>
            <RuleTable rows={RULE_ROWS} />
          </section>

      

          <section className="mt-16 space-y-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Take the Next Step</p>
              <h2 className="text-2xl font-semibold text-white sm:text-[1.85rem]">Ready to Dive Deeper?</h2>
            </div>
            <CtaRow hasSelectedCsv={hasSelectedCsv} hasRawCsv={hasRawCsv} />
          </section>

          <section className="mt-16">
            <Card className="border-white/10 bg-white/[0.02]">
              <CardContent className="space-y-4 pt-6 text-center">
               
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </TooltipProvider>
  );
}

type GraphAsset = {
  src: string;
  alt: string;
  caption: string;
  annotation: string;
};

function readSupplementalGraphs(curated: Set<string>): GraphAsset[] {
  return collectGraphAssets(["graphs", path.join("images", "our-methods")], curated);
}

function readPublicCharts(curated: Set<string>): GraphAsset[] {
  return collectGraphAssets(["charts"], curated);
}

function collectGraphAssets(folders: string[], curated: Set<string>): GraphAsset[] {
  const publicRoot = path.join(process.cwd(), "public");
  const seen = new Set<string>();
  const assets: GraphAsset[] = [];

  const walk = (relativeDir: string) => {
    const fullDir = path.join(publicRoot, relativeDir);
    if (!fs.existsSync(fullDir)) return;
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(fullDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const childRel = path.join(relativeDir, entry.name);
      if (entry.isDirectory()) {
        walk(childRel);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/\.(png|jpg|jpeg|webp|gif)$/i.test(entry.name)) continue;
      const webPath = `/${childRel.split(path.sep).join("/")}`;
      if (curated.has(webPath) || seen.has(webPath)) continue;
      seen.add(webPath);
      const base = entry.name.replace(/\.[^.]+$/, "");
      const title = toTitleCase(base.replace(/[-_]/g, " "));
      assets.push({
        src: webPath,
        alt: `${title} graph`,
        caption: title,
        annotation: `Full-size export generated from the notebooks showing ${title.toLowerCase()}.`,
      });
    }
  };

  for (const folder of folders) {
    walk(folder);
  }

  return assets;
}

function toTitleCase(input: string) {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
