import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { rmSync } from 'node:fs';

const scriptDir = resolve(fileURLToPath(new URL('.', import.meta.url)));
const distPath = resolve(scriptDir, '..', 'dist');

rmSync(distPath, { recursive: true, force: true });
