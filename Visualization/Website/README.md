# Second Earth Explorer (Next.js)

Next.js + TypeScript app (App Router) that reads `public/data/rawdata.csv`, exposes it at `/api/data`, and renders an interactive Plotly scatter with filters.

## Scripts

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production server
- `npm run typecheck` — TypeScript check

You can run these from the repository root (workspaces) or from `Visualization/Website`.

## Data

Place your CSV at `public/data/rawdata.csv`. The API expects columns including at least:

- `pl_name` — planet name
- `pl_orbsmax` — semi-major axis (AU)
- `pl_insol` — stellar flux (Earth=1)

Several alias column names are recognized in the API for convenience.

