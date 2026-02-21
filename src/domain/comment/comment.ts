import { ValidationError } from '../../shared/errors/errors.js';
import type { CommentMetadata } from '../schema/types.js';

export const assertCommentIssue = (metadata: CommentMetadata, issueId: string): void => {
  if (metadata.issue_id !== issueId) {
    throw new ValidationError(
      `Comment issue_id ${metadata.issue_id} does not match directory issue id ${issueId}`
    );
  }
};
