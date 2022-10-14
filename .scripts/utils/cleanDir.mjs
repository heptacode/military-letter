import { rm } from 'node:fs/promises';
import { join } from 'node:path';

export async function cleanDir(dir) {
  return await rm(join(process.cwd(), dir), { force: true, recursive: true });
}