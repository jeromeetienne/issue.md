import { join } from 'node:path';
import { assertTransition } from '../../../domain/issue/issue.js';
import { nowUtc } from '../../../shared/time/now.js';
import { IssueRepository } from '../../../infrastructure/fs/issue-repository.js';
import type { IssueStatus } from '../../../domain/schema/types.js';

const setStatus = async (rootDir: string, id: string, status: IssueStatus) => {
  const repository = new IssueRepository(join(rootDir));
  return repository.updateById(id, (current) => {
    assertTransition(current.metadata.status, status);
    return {
      ...current,
      metadata: {
        ...current.metadata,
        status,
        updated_at: nowUtc()
      }
    };
  });
};

export const closeIssue = (rootDir: string, id: string) => setStatus(rootDir, id, 'closed');
export const reopenIssue = (rootDir: string, id: string) => setStatus(rootDir, id, 'open');
