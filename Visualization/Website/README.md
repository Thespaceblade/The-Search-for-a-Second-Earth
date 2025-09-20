# Second Earth Website

A lightweight TypeScript starter to present analyses from the "Search for a Second Earth" dataset. The project compiles TypeScript to a distributable `dist/` folder and ships static assets ready for hosting.

## Project layout

- `src/` — TypeScript sources; start by editing `src/main.ts`
- `public/` — Static assets (HTML, CSS, images, data files) copied directly into `dist/`
- `scripts/` — Small Node utilities invoked by the npm scripts
- `dist/` — Generated output (ignored until you run a build)

## Getting started

1. Install dependencies once network access is available:
   ```bash
   npm install
   ```
2. Build the TypeScript and copy static assets:
   ```bash
   npm run build
   ```
3. Open `dist/index.html` in a browser or serve the folder with your favourite static server.

For iterative work, `npm run watch` will recompile TypeScript on file changes. Pair it with a static file server for live reload (e.g. `npx http-server dist`).

## Next steps

- Replace the placeholder dataset in `src/main.ts` with the processed mission dataset. For local files, drop the JSON or CSV under `public/data/` so it is copied into `dist/`.
- Build visualizations (D3, Observable Plot, Deck.gl, etc.) where `renderApp` currently assembles the layout.
- Expand the npm scripts with your preferred bundler (Vite, Astro, Next.js) if you need component-based tooling or server-side rendering.

## License

MIT — feel free to adapt for the hackathon team.
