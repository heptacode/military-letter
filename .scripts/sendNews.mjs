import { execute } from './esbuild.mjs';

execute({ entryPoints: ['../examples/sendNews.ts'], outfile: 'sendNews.mjs' });