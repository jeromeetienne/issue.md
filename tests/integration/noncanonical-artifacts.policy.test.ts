import { describe, expect, it } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { listIssues } from '../../src/application/use-cases/issue/list-issues.js';
import { makeTempWorkspace } from './helpers.js';

describe('non-canonical artifact policy', () => {
  it('ignores .issue-cache as source of truth', async () => {
    const root = await makeTempWorkspace();
    await createIssue({ rootDir: root, title: 'A', body: 'Body', author: 'alice' });
    await fs.mkdir(join(root, '.issue-cache'), { recursive: true });
    await fs.writeFile(join(root, '.issue-cache', 'index.json'), '{"issues":[]}', 'utf8');

    const listed = await listIssues(root);
    expect(listed.issues).toHaveLength(1);
  });
});
