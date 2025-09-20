import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Card className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Search for a Second Earth
          </h1>
          <p className="mt-4 text-base md:text-lg opacity-90 max-w-3xl mx-auto">
            Insert mission statement here. We are investigating worlds beyond our solar system, combining
            observation and analysis to identify promising candidates for habitability.
          </p>
          <p className="mt-2 text-base md:text-lg opacity-90 max-w-3xl mx-auto">
            Insert mission statement here. Our goal is to turn raw signals into scientific insight and
            share discoveries through clear, interactive visualizations.
          </p>
          <div className="mt-6">
            <Button href="#explore">Launch Explorer</Button>
          </div>
        </Card>
      </Section>

      {/* Mission */}
      <Section id="mission" title="Our Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <Card>
            <h3 className="text-xl md:text-2xl font-semibold">What We Do</h3>
            <p className="mt-3 opacity-90">
              Insert mission statement here. We search for Earth-like exoplanets by analyzing patterns
              in stellar light and orbital dynamics, working toward a deeper understanding of planetary
              habitability.
            </p>
            <h4 className="mt-6 text-lg md:text-xl font-semibold">Why This Matters</h4>
            <p className="mt-3 opacity-90">
              Insert mission context here. Discovering potentially habitable worlds can inform the future
              of exploration, telescope design, and our understanding of where life might arise.
            </p>
          </Card>
          <Card className="flex items-center justify-center">
            <div className="w-full aspect-video rounded-xl border border-white/10 flex items-center justify-center text-center p-6">
              <span className="opacity-80">Space-themed image / illustration placeholder</span>
            </div>
          </Card>
        </div>
      </Section>

      {/* Explore Placeholder */}
      <Section id="explore" title="Explore the Data">
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="opacity-90">Interactive Visualization Coming Soon</p>
            </div>
            <div>
              <Button href="#explore" variant="ghost">Notify Me</Button>
            </div>
          </div>
          <div className="mt-6 w-full min-h-[220px] rounded-xl border border-dashed border-white/20 flex items-center justify-center text-center p-6">
            <span className="opacity-80">This area will mount our Plotly/interactive components.</span>
          </div>
        </Card>
      </Section>

      {/* Team */}
      <Section id="about" title="Team & Credits">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/10" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Contributor {i}</h3>
                  <p className="text-sm opacity-80">Role / Affiliation</p>
                </div>
              </div>
              <p className="mt-4 text-sm opacity-90">
                Placeholder bio or contribution details. Highlight data processing, modeling, or visualization work.
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
