import { build as esbuild } from 'esbuild';
import { execa } from 'execa';
import { cleanDir } from './utils/cleanDir.mjs';
import { external } from './utils/getExternals.mjs';

export async function build(options = {}) {
  try {
    await cleanDir('dist');
    const { failed: isTypecheckFailed, stdout: typecheckStdout } = await execa('yarn', [
      'typecheck',
    ]);
    if (isTypecheckFailed) {
      throw new Error(typecheckStdout);
    }
    const { failed: isTSCFailed, stdout: tscStdout } = await execa('yarn', ['tsc']);
    if (isTSCFailed) {
      throw new Error(tscStdout);
    }
    await esbuild({
      bundle: true,
      entryPoints: ['src/index.ts'],
      external,
      format: 'esm',
      minify: true,
      platform: 'node',
      ...options,
    });
  } catch (error) {
    console.error(error);
  }
}

await Promise.all([
  build({ format: 'cjs', outfile: 'dist/index.cjs' }),
  build({ format: 'esm', outfile: 'dist/index.mjs' }),
]);
