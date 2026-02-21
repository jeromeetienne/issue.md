import type { CommentMetadata, IssueMetadata } from './types.js';

const utcZPattern = '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$';

export const issueSchema = {
  type: 'object',
  required: ['id', 'title', 'status', 'created_at', 'updated_at', 'author'],
  additionalProperties: false,
  patternProperties: {
    '^x_': {}
  },
  properties: {
    id: { type: 'string', pattern: '^[0-9]{4,}$' },
    title: { type: 'string', minLength: 1 },
    status: { type: 'string', enum: ['open', 'in_progress', 'closed'] },
    created_at: { type: 'string', pattern: utcZPattern },
    updated_at: { type: 'string', pattern: utcZPattern },
    author: { type: 'string', minLength: 1 }
  }
} as const;

export const commentSchema = {
  type: 'object',
  required: ['id', 'issue_id', 'created_at', 'author'],
  additionalProperties: false,
  patternProperties: {
    '^x_': {}
  },
  properties: {
    id: { type: 'string', pattern: '^[0-9]{4,}$' },
    issue_id: { type: 'string', pattern: '^[0-9]{4,}$' },
    created_at: { type: 'string', pattern: utcZPattern },
    author: { type: 'string', minLength: 1 }
  }
} as const;
