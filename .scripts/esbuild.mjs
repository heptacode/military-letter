import { build as esbuild } from 'esbuild';
import { execa } from 'execa';
import { readFile, rm } from 'node:fs/promises';
import path from 'node:path';

const pkgRaw = await readFile(path.join(process.cwd(), 'package.json'), 'utf8');
const { dependencies = {}, devDependencies = {} } = JSON.parse(pkgRaw);

const external = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

export async function cleanDir(dir) {
  return await rm(path.join(process.cwd(), dir), { force: true, recursive: true });
}

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

export async function build(options = {}, outDir = 'dist') {
  try {
    await cleanDir(outDir);
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
