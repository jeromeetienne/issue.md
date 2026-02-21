import { join } from 'node:path';
import { nowUtc } from '../../../shared/time/now.js';
import { CommentRepository } from '../../../infrastructure/fs/comment-repository.js';

export const addComment = async (
  rootDir: string,
  issueId: string,
  author: string,
  body: string
) => {
  const repository = new CommentRepository(join(rootDir));
  return repository.add(
    {
      issue_id: issueId,
      created_at: nowUtc(),
      author
    },
    body
  );
};

export const listComments = async (rootDir: string, issueId: string) => {
  const repository = new CommentRepository(join(rootDir));
  return repository.list(issueId);
};
