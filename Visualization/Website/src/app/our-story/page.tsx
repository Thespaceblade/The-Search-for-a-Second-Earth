import Header from "../../components/Header";

export const metadata = {
  title: "Our Story",
  description: "How we built The Search for a Second Earth",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#0b1220]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 xl:max-w-[66vw] pt-0 space-y-12">
        <Header />

        <section className="max-w-3xl mx-auto text-center pt-20 sm:pt-24 md:pt-28">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Our Story</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            We’re a small team driven by a big curiosity: can we sift through the
            noise of the cosmos to spot worlds that resemble our own? This project
            blends data science, astrophysics context, and thoughtful visualization to
            make complex exoplanet datasets explorable by anyone.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Data Pipeline</h3>
            <p className="mt-2 text-sm text-slate-300">
              We consolidate curated CSVs, compute derived metrics, and surface key
              comparisons to Earth for intuitive ranking and filtering.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Visual Design</h3>
            <p className="mt-2 text-sm text-slate-300">
              A dark, starfield-inspired theme keeps focus on the plots while
              preserving clarity and contrast for long reading sessions.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <h3 className="font-semibold">Team</h3>
            <p className="mt-2 text-sm text-slate-300">
              Built by Jason, Aneesh, Josh, and Vraj during the CDC Hackathon.
              Thanks for exploring with us!
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">What’s Next</h3>
            <p className="mt-2 text-sm text-slate-300">
              We plan to expand the dataset, add interactive comparisons, and refine
              similarity models. If you have ideas or want to collaborate, reach out!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
