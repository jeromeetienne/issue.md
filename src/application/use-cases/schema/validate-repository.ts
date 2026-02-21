import { join } from 'node:path';
import { listIssues } from '../issue/list-issues.js';

export const validateRepository = async (rootDir: string) => {
  const result = await listIssues(join(rootDir));
  return {
    validCount: result.issues.length,
    warnings: result.warnings,
    ok: result.warnings.length === 0
  };
};
