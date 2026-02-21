export type IssueStatus = 'open' | 'in_progress' | 'closed';

export interface IssueMetadata {
  id: string;
  title: string;
  status: IssueStatus;
  created_at: string;
  updated_at: string;
  author: string;
  [key: `x_${string}`]: unknown;
}

export interface CommentMetadata {
  id: string;
  issue_id: string;
  created_at: string;
  author: string;
  [key: `x_${string}`]: unknown;
}

export interface ParsedDocument<T> {
  metadata: T;
  body: string;
}

export interface FileWarning {
  path: string;
  code: 'PARSE_ERROR' | 'SCHEMA_ERROR' | 'PATH_MISMATCH';
  message: string;
}

export interface IssueSummary {
  id: string;
  title: string;
  status: IssueStatus;
  updated_at: string;
}
