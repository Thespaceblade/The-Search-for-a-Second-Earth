import { readCSVRecords, resolveSelectedCSV } from "../../lib/csv";
import { consolidateProfiles } from "../../lib/planets";
import PlanetGrid from "../../components/PlanetGrid";
import type { PlanetProfile } from "../../types/planets";

export const dynamic = "force-static";

export default function PlanetsPage() {
  let profiles: PlanetProfile[] = [];
  const csv = resolveSelectedCSV();
  if (csv) {
    try {
      const rows = readCSVRecords(csv);
      profiles = consolidateProfiles(rows);
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#0b1220]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-10 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold">Explore Exoplanets</h1>
          <p className="mt-2 text-slate-400">Search, sort, and synthesize similar profiles.</p>
        </header>

        <PlanetGrid data={profiles} />

        {!csv ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">
            <p className="mb-2">CSV not found.</p>
            <p>
              Place your file at <code className="text-slate-200">/public/data/selected_planets_full.csv</code> with
              rows from the NASA Exoplanet Archive. Only the specified planet names will be shown.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

