import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const pkgRaw = await readFile(join(process.cwd(), 'package.json'), 'utf8');
const { dependencies = {}, devDependencies = {} } = JSON.parse(pkgRaw);

export const external = [...Object.keys(dependencies), ...Object.keys(devDependencies)];