import Ajv from 'ajv';
import { ValidationError } from '../../shared/errors/errors.js';
import { commentSchema, issueSchema } from '../../domain/schema/document-schemas.js';
import type { CommentMetadata, IssueMetadata } from '../../domain/schema/types.js';

const AjvCtor = Ajv as unknown as new (options: Record<string, unknown>) => any;
const ajv = new AjvCtor({ allErrors: true, strict: false });
const validateIssueSchema = ajv.compile(issueSchema);
const validateCommentSchema = ajv.compile(commentSchema);

const formatErrors = (errors: unknown): string => {
  if (!Array.isArray(errors)) {
    return 'unknown validation error';
  }
  return errors
    .map((error: any) => `${error.instancePath || '/'} ${error.message}`)
    .join('; ');
};

export const validateIssue = (metadata: unknown): IssueMetadata => {
  if (!validateIssueSchema(metadata)) {
    throw new ValidationError(formatErrors(validateIssueSchema.errors));
  }
  return metadata as IssueMetadata;
};

export const validateComment = (metadata: unknown): CommentMetadata => {
  if (!validateCommentSchema(metadata)) {
    throw new ValidationError(formatErrors(validateCommentSchema.errors));
  }
  return metadata as CommentMetadata;
};
