import matter from 'gray-matter';
import type { ParsedDocument } from '../../domain/schema/types.js';

const stableSortObject = (input: Record<string, unknown>): Record<string, unknown> => {
  return Object.keys(input)
    .sort((a, b) => {
      const preferredOrder = ['id', 'issue_id', 'title', 'status', 'created_at', 'updated_at', 'author'];
      const ai = preferredOrder.indexOf(a);
      const bi = preferredOrder.indexOf(b);
      if (ai !== -1 || bi !== -1) {
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      }
      return a.localeCompare(b);
    })
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = input[key];
      return acc;
    }, {});
};

export const parseMarkdownDocument = <T>(raw: string): ParsedDocument<T> => {
  const parsed = matter(raw);
  return {
    metadata: parsed.data as T,
    body: parsed.content.replace(/\r\n/g, '\n').trimEnd() + '\n'
  };
};

export const stringifyMarkdownDocument = <T extends object>(
  metadata: T,
  body: string
): string => {
  const normalizedBody = body.replace(/\r\n/g, '\n').trimEnd() + '\n';
  const stableMeta = stableSortObject(metadata as Record<string, unknown>);
  const rendered = matter.stringify(normalizedBody, stableMeta);
  return rendered.replace(/\r\n/g, '\n').trimEnd() + '\n';
};
