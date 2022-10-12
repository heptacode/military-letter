import { build } from './esbuild.mjs';

await Promise.all([
  build({ format: 'cjs', outfile: 'dist/index.cjs' }, 'dist'),
  build({ format: 'esm', outfile: 'dist/index.mjs' }, 'dist'),
]);
