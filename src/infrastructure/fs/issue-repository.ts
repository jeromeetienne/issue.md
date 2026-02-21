import { promises as fs } from 'node:fs';
import { basename, join } from 'node:path';
import { NotFoundError, ValidationError } from '../../shared/errors/errors.js';
import type { IssueMetadata, FileWarning } from '../../domain/schema/types.js';
import { parseMarkdownDocument, stringifyMarkdownDocument } from '../markdown/document-codec.js';
import { validateIssue } from '../validation/schema-validator.js';
import { atomicWriteFile } from './atomic-write.js';
import { buildIssuePath, nextSequentialId, reservePathExclusively } from './id-allocator.js';
import { scanMarkdownFiles } from './document-scanner.js';
import { slugifyTitle } from '../../domain/issue/issue.js';

export interface IssueRecord {
  metadata: IssueMetadata;
  body: string;
  path: string;
}

export class IssueRepository {
	constructor(private readonly rootDir: string) {}

	private get issuesDir(): string {
		return join(this.rootDir, 'issues');
	}

	async create(input: Omit<IssueMetadata, 'id'>, body: string): Promise<IssueRecord> {
		const id = await nextSequentialId(this.issuesDir);
		const slug = slugifyTitle(input.title);
		const fullPath = buildIssuePath(this.issuesDir, id, slug);
		await reservePathExclusively(fullPath);

		const metadata: IssueMetadata = { ...input, id };
		validateIssue(metadata);
		const content = stringifyMarkdownDocument(metadata, body);
		await atomicWriteFile(fullPath, content);
		return { metadata, body, path: fullPath };
	}

	async getById(id: string): Promise<IssueRecord> {
		const files = await scanMarkdownFiles(this.issuesDir);
		const file = files.find((filePath) => basename(filePath).startsWith(`${id}-`));
		if (!file) {
			throw new NotFoundError(`Issue ${id} not found`);
		}
		const raw = await fs.readFile(file, 'utf8');
		const parsed = parseMarkdownDocument<IssueMetadata>(raw);
		validateIssue(parsed.metadata);
		if (parsed.metadata.id !== id) {
			throw new ValidationError(`Path id ${id} does not match front matter id ${parsed.metadata.id}`);
		}
		return { metadata: parsed.metadata, body: parsed.body, path: file };
	}

	async updateById(
		id: string,
		updater: (record: IssueRecord) => Promise<IssueRecord> | IssueRecord
	): Promise<IssueRecord> {
		const current = await this.getById(id);
		const next = await updater(current);
		validateIssue(next.metadata);
		const expectedPrefix = `${next.metadata.id}-`;
		if (!basename(current.path).startsWith(expectedPrefix)) {
			throw new ValidationError('Issue path mismatch during update');
		}
		const content = stringifyMarkdownDocument(next.metadata, next.body);
		await atomicWriteFile(current.path, content);
		return { ...next, path: current.path };
	}

	async list(): Promise<{ issues: IssueRecord[]; warnings: FileWarning[] }> {
		const files = await scanMarkdownFiles(this.issuesDir);
		const issues: IssueRecord[] = [];
		const warnings: FileWarning[] = [];

		for (const file of files) {
			try {
				const raw = await fs.readFile(file, 'utf8');
				const parsed = parseMarkdownDocument<IssueMetadata>(raw);
				const metadata = validateIssue(parsed.metadata);
				const pathId = basename(file).split('-')[0];
				if (pathId !== metadata.id) {
					warnings.push({
						path: file,
						code: 'PATH_MISMATCH',
						message: `Path id ${pathId} differs from front matter id ${metadata.id}`
					});
					continue;
				}
				issues.push({ metadata, body: parsed.body, path: file });
			} catch (error: any) {
				warnings.push({
					path: file,
					code: 'SCHEMA_ERROR',
					message: error?.message ?? 'invalid issue file'
				});
			}
		}

		return {
			issues: issues.sort((a, b) => a.metadata.id.localeCompare(b.metadata.id)),
			warnings
		};
	}
}
