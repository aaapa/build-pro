import { copyFileSync, cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const rootDirectory = resolve(import.meta.dirname, '..');
const distDirectory = resolve(rootDirectory, 'dist');
const indexPath = resolve(distDirectory, 'index.html');
const fallbackPath = resolve(distDirectory, '404.html');
const publicFontsDirectory = resolve(rootDirectory, 'public', 'fonts');
const distFontsDirectory = resolve(distDirectory, 'assets', 'fonts');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
}

if (existsSync(publicFontsDirectory)) {
  mkdirSync(dirname(distFontsDirectory), { recursive: true });
  cpSync(publicFontsDirectory, distFontsDirectory, { recursive: true });
}
