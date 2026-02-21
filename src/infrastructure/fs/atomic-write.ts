import { dirname } from 'node:path';
import { promises as fs } from 'node:fs';

export const atomicWriteFile = async (targetPath: string, content: string): Promise<void> => {
  const tmpPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  await fs.writeFile(tmpPath, content, 'utf8');
  await fs.rename(tmpPath, targetPath);
  const parent = dirname(targetPath);
  try {
    const dir = await fs.open(parent, 'r');
    await dir.sync();
    await dir.close();
  } catch {
    // best effort only
  }
};
