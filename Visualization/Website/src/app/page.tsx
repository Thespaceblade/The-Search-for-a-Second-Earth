export default function BackgroundPage() {
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

        {/* Data viz placeholder */}
        <section id="visualizations" className="space-y-6 text-center scroll-mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">Data Visualizations</h2>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-4">
            <div className="aspect-[16/9] grid place-items-center rounded-xl bg-white/5">
              <span className="text-slate-400">Future visualizations will live here.</span>
            </div>
            <div className="prose prose-invert max-w-prose mx-auto">
              <p className="text-sm text-slate-400">
                We’ll map stellar flux, semi-major axis, and habitable zone boundaries—then connect insights to
                upcoming simulations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
