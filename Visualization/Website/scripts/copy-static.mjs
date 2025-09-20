import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { cpSync, existsSync, mkdirSync } from 'node:fs';

const scriptDir = resolve(fileURLToPath(new URL('.', import.meta.url)));
const projectRoot = resolve(scriptDir, '..');
const publicDir = resolve(projectRoot, 'public');
const distDir = resolve(projectRoot, 'dist');

if (!existsSync(publicDir)) {
  console.warn('No public directory found. Skipping static asset copy.');
  process.exit(0);
}

mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });
