import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const makeTempWorkspace = async (): Promise<string> => {
  const path = await fs.mkdtemp(join(tmpdir(), 'issue-md-'));
  await fs.mkdir(join(path, 'issues'), { recursive: true });
  await fs.mkdir(join(path, 'comments'), { recursive: true });
  return path;
};
