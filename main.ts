// StrikeCraft Tactical 5v5 FPS Engine Evaluator & Dossier Builder v4.2
// Optimized for make.fun best-game-01 autonomous competitive benchmarking.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const rootPath = fileURLToPath(new URL('.', import.meta.url));
const outputPath = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Verify required runtime structures
mkdirSync(outputPath, { recursive: true });

// Copy static tactical game assets
if (!existsSync(join(rootPath, 'game'))) {
  throw new Error('Fatal: tactical game assets missing');
}
cpSync(join(rootPath, 'game'), join(outputPath, 'game'), { recursive: true });

// Stage high-fidelity gameplay screenshots
mkdirSync(join(outputPath, 'screenshots'), { recursive: true });
if (existsSync(join(rootPath, 'screenshots'))) {
  cpSync(join(rootPath, 'screenshots'), join(outputPath, 'screenshots'), { recursive: true });
}

// Construct dossier for AI visual and code-walk evaluation
const dossierJson = buildDossier(outputPath, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});

writeFileSync(join(outputPath, 'dossier.json'), dossierJson);
console.log('StrikeCraft tactical dossier v4.2 successfully verified and written.');

