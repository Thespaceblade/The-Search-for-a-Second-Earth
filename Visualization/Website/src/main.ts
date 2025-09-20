/*
 * Entry point for the Second Earth dataset exploration site.
 * Replace the sample data with real mission outputs once available.
 */

type DiscoveryStatus = 'Confirmed' | 'Candidate';

type PlanetCandidate = {
  name: string;
  discoveryMethod: string;
  discoveryYear: number;
  distanceLightYears?: number;
  equilibriumTempK?: number;
  status: DiscoveryStatus;
};

type DatasetSummary = {
  total: number;
  confirmed: number;
  candidate: number;
  latestDiscoveryYear: number | null;
  averageDistance: number | null;
};

const SAMPLE_CANDIDATES: PlanetCandidate[] = [
  {
    name: 'Kepler-452b',
    discoveryMethod: 'Transit photometry',
    discoveryYear: 2015,
    distanceLightYears: 1402,
    equilibriumTempK: 265,
    status: 'Confirmed'
  },
  {
    name: 'TOI-700 d',
    discoveryMethod: 'Transit photometry',
    discoveryYear: 2020,
    distanceLightYears: 101.4,
    equilibriumTempK: 269,
    status: 'Confirmed'
  },
  {
    name: 'K2-18b',
    discoveryMethod: 'Transit photometry',
    discoveryYear: 2015,
    distanceLightYears: 124,
    equilibriumTempK: 265,
    status: 'Candidate'
  }
];

function calculateSummary(candidates: PlanetCandidate[]): DatasetSummary {
  const total = candidates.length;
  const confirmed = candidates.filter(({ status }) => status === 'Confirmed').length;
  const candidate = total - confirmed;
  const discoveryYears = candidates.map(({ discoveryYear }) => discoveryYear);
  const latestDiscoveryYear = discoveryYears.length ? Math.max(...discoveryYears) : null;
  const distances = candidates
    .map(({ distanceLightYears }) => distanceLightYears)
    .filter((distance): distance is number => typeof distance === 'number');
  const averageDistance = distances.length
    ? distances.reduce((acc, value) => acc + value, 0) / distances.length
    : null;

  return { total, confirmed, candidate, latestDiscoveryYear, averageDistance };
}

function asLightYearText(distance: number | null): string {
  if (distance === null) return 'Unavailable';
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: distance >= 100 ? 0 : 1
  });
  return `${formatter.format(distance)} ly`;
}

function renderSummaryCard(summary: DatasetSummary): string {
  const { total, confirmed, candidate, latestDiscoveryYear, averageDistance } = summary;
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Total Worlds', value: total.toString() },
    { label: 'Confirmed', value: confirmed.toString() },
    { label: 'Still Candidates', value: candidate.toString() },
    {
      label: 'Latest Discovery Year',
      value: latestDiscoveryYear ? latestDiscoveryYear.toString() : '—'
    },
    { label: 'Average Distance', value: asLightYearText(averageDistance) }
  ];

  return `
    <section class="summary" aria-labelledby="dataset-summary-heading">
      <h2 id="dataset-summary-heading">Dataset snapshot</h2>
      <dl>
        ${rows
          .map(
            ({ label, value }) => `
              <div class="summary__row">
                <dt>${label}</dt>
                <dd>${value}</dd>
              </div>
            `
          )
          .join('')}
      </dl>
    </section>
  `;
}

function renderCandidateTable(candidates: PlanetCandidate[]): string {
  return `
    <section aria-labelledby="candidate-table-heading">
      <h2 id="candidate-table-heading">Sample candidate list</h2>
      <p class="table-note">
        Replace this placeholder data with the cleaned dataset output for the mission analysis.
      </p>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">World</th>
              <th scope="col">Method</th>
              <th scope="col">Discovery year</th>
              <th scope="col">Distance (ly)</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            ${candidates
              .map(
                ({ name, discoveryMethod, discoveryYear, distanceLightYears, status }) => `
                  <tr>
                    <th scope="row">${name}</th>
                    <td>${discoveryMethod}</td>
                    <td>${discoveryYear}</td>
                    <td>${asLightYearText(distanceLightYears ?? null)}</td>
                    <td>${status}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderApp(root: HTMLElement, candidates: PlanetCandidate[]): void {
  const summary = calculateSummary(candidates);

  root.innerHTML = `
    <section class="intro">
      <h1>The Search for a Second Earth</h1>
      <p>
        This site will showcase findings from our exoplanet habitability investigation.
        Hook up your processed dataset to drive visualizations and insights in real-time.
      </p>
    </section>
    ${renderSummaryCard(summary)}
    ${renderCandidateTable(candidates)}
  `;
}

function bootstrap(): void {
  const root = document.querySelector<HTMLElement>('#app');

  if (!root) {
    throw new Error('Unable to find the application mount point (#app).');
  }

  // TODO: Replace SAMPLE_CANDIDATES with a real data load (e.g. fetch from dist/data/candidates.json).
  renderApp(root, SAMPLE_CANDIDATES);
}

bootstrap();
