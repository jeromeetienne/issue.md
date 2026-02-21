import { promises as fs } from 'node:fs';
import { join, basename } from 'node:path';
import type { CommentMetadata } from '../../domain/schema/types.js';
import { parseMarkdownDocument, stringifyMarkdownDocument } from '../markdown/document-codec.js';
import { validateComment } from '../validation/schema-validator.js';
import { atomicWriteFile } from './atomic-write.js';
import { nextSequentialId } from './id-allocator.js';
import { scanMarkdownFiles } from './document-scanner.js';
import { assertCommentIssue } from '../../domain/comment/comment.js';

export interface CommentRecord {
  metadata: CommentMetadata;
  body: string;
  path: string;
}

export class CommentRepository {
  constructor(private readonly rootDir: string) {}

  private commentsDir(issueId: string): string {
    return join(this.rootDir, 'comments', issueId);
  }

  async add(input: Omit<CommentMetadata, 'id'>, body: string): Promise<CommentRecord> {
    const dir = this.commentsDir(input.issue_id);
    const id = await nextSequentialId(dir);
    const fullPath = join(dir, `${id}.md`);
    const metadata: CommentMetadata = { ...input, id };
    validateComment(metadata);
    const content = stringifyMarkdownDocument(metadata, body);
    await atomicWriteFile(fullPath, content);
    return { metadata, body, path: fullPath };
  }

  async list(issueId: string): Promise<CommentRecord[]> {
    const dir = this.commentsDir(issueId);
    const files = await scanMarkdownFiles(dir);
    const comments: CommentRecord[] = [];

    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const parsed = parseMarkdownDocument<CommentMetadata>(raw);
      const metadata = validateComment(parsed.metadata);
      assertCommentIssue(metadata, issueId);
      const pathId = basename(file).replace('.md', '');
      if (pathId !== metadata.id) {
        continue;
      }
      comments.push({ metadata, body: parsed.body, path: file });
    }

    return comments.sort((a, b) => a.metadata.id.localeCompare(b.metadata.id));
  }
}
