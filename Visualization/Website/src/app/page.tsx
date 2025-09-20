export default function BackgroundPage() {
  return (
    <>
      {/* Hero */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          The Search for the Second Earth
        </h1>
        <div className="prose prose-invert max-w-prose mx-auto text-center">
          <p className="leading-7">
            Humanity’s growth is outpacing what Earth alone can sustainably provide. We’re exploring bold,
            data-driven pathways to safeguard our future among the stars.
          </p>
        </div>
      </header>

      <div className="border-t border-white/10 my-8" aria-hidden="true" />

      {/* Key pressures (cards) */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Why We Must Look Outward</h2>
        <div className="grid gap-4">
          <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold">Population Pressure</h3>
            <p className="text-slate-300">
              The UN projects a peak near 10.3B in the 2080s, magnifying stress on essential systems.
            </p>
          </article>
          <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold">Resource Strain</h3>
            <p className="text-slate-300">
              Food, water, and energy demands keep rising while forests and freshwater reserves decline.
            </p>
          </article>
          <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold">Sustainability Gap</h3>
            <p className="text-slate-300">
              Even renewables are being stretched—underscoring the need for long-term solutions beyond Earth.
            </p>
          </article>
        </div>
      </section>

      <div className="border-t border-white/10 my-8" aria-hidden="true" />

      {/* Data viz placeholder */}
      <section className="space-y-3 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Data Visualizations</h2>
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-center">
          <div className="aspect-[16/9] grid place-items-center rounded-xl border border-white/10 bg-white/5">
            <span className="text-slate-400">Future visualizations will live here.</span>
          </div>
          <div className="prose prose-invert max-w-prose mx-auto text-center">
            <p className="text-sm text-slate-400 mt-3">
              We’ll map stellar flux, semi-major axis, and habitable zone boundaries—then connect insights to
              upcoming simulations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
