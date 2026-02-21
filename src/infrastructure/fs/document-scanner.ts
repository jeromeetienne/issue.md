import { promises as fs } from 'node:fs';
import { join } from 'node:path';

export const scanMarkdownFiles = async (dir: string): Promise<string[]> => {
  await fs.mkdir(dir, { recursive: true });
  const entries = await fs.readdir(dir);
  return entries
    .filter((entry) => entry.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map((entry) => join(dir, entry));
};
