import { promises as fs } from 'node:fs';
import { basename, join } from 'node:path';
import { ConflictError } from '../../shared/errors/errors.js';

const parseNumericPrefix = (filename: string): number | null => {
  const match = basename(filename).match(/^([0-9]{4,})/);
  return match ? Number.parseInt(match[1], 10) : null;
};

export const nextSequentialId = async (dir: string): Promise<string> => {
  await fs.mkdir(dir, { recursive: true });
  const files = await fs.readdir(dir);
  const max = files
    .map(parseNumericPrefix)
    .filter((value): value is number => Number.isFinite(value))
    .reduce((acc, value) => Math.max(acc, value), 0);
  return String(max + 1).padStart(4, '0');
};

export const reservePathExclusively = async (fullPath: string): Promise<void> => {
  try {
    const handle = await fs.open(fullPath, 'wx');
    await handle.close();
  } catch (error: any) {
    if (error?.code === 'EEXIST') {
      throw new ConflictError(`ID conflict for path ${fullPath}. Retry create command.`);
    }
    throw error;
  }
};

export const buildIssuePath = (baseDir: string, id: string, titleSlug: string): string =>
  join(baseDir, `${id}-${titleSlug}.md`);
