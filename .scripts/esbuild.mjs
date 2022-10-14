import { build as esbuild } from 'esbuild';
import { execa } from 'execa';
import { cleanDir } from './utils/cleanDir.mjs';
import { external } from './utils/getExternals.mjs';

export async function execute(options = {}, outfile = '') {
  try {
    if (!outfile) {
      throw new Error('Please define outfile');
    }
    await cleanDir(outfile);
    await esbuild({
      bundle: true,
      entryPoints: ['src/index.ts'],
      external,
      format: 'esm',
      outfile,
      platform: 'node',
      target: 'ESNext',
      ...options,
    });
    const { failed, stdout } = await execa('yarn', ['node', outfile]);
    if (failed) {
      throw new Error(stdout);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await cleanDir(outfile);
  }
}

export async function build(options = {}, outdir = 'dist') {
  try {
    await cleanDir(outdir);
    const { failed: isTypecheckFailed, stdout: typecheckStdout } = await execa('yarn', ['typecheck']);
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
