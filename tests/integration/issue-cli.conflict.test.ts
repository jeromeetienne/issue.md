import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { makeTempWorkspace } from './helpers.js';

describe('issue id conflict behavior', () => {
  it('keeps sequential ids unique', async () => {
    const root = await makeTempWorkspace();
    const first = await createIssue({ rootDir: root, title: 'One', body: 'One', author: 'alice' });
    const second = await createIssue({ rootDir: root, title: 'Two', body: 'Two', author: 'alice' });
    expect(first.metadata.id).toBe('0001');
    expect(second.metadata.id).toBe('0002');
  });
});
