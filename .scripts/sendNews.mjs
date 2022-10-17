import { build as esbuild } from 'esbuild';
import { execa } from 'execa';
import { cleanDir } from './utils/cleanDir.mjs';
import { external } from './utils/getExternals.mjs';

export async function sendNews() {
  try {
    await cleanDir('sendNews.mjs');
    await esbuild({
      bundle: true,
      entryPoints: ['sendNews.ts'],
      external,
      format: 'esm',
      outfile: 'sendNews.mjs',
      platform: 'node',
      target: 'ESNext',
    });
    const { stdout } = await execa('yarn', ['node', 'sendNews.mjs']);
    console.log(stdout);
  } catch (error) {
    console.error(error);
  } finally {
    await cleanDir('sendNews.mjs');
  }
}

sendNews();
