import { describe, expect, it } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { validateRepository } from '../../src/application/use-cases/schema/validate-repository.js';
import { makeTempWorkspace } from './helpers.js';

describe('validate repository behavior', () => {
	it('reports malformed files while counting valid issues', async () => {
		const root = await makeTempWorkspace();
		await createIssue({ rootDir: root, title: 'Valid', body: 'Body', author: 'alice' });
		await fs.writeFile(join(root, 'issues', '9999-bad.md'), '---\nid: "9999"\n---\n', 'utf8');

		const report = await validateRepository(root);
		expect(report.validCount).toBe(1);
		expect(report.warnings.length).toBeGreaterThan(0);
	});

	it('classifies parse and schema issue failures with distinct warning codes', async () => {
		const root = await makeTempWorkspace();
		await createIssue({ rootDir: root, title: 'Valid', body: 'Body', author: 'alice' });
		await fs.writeFile(join(root, 'issues', '9998-parse.md'), '---\n: not-yaml\n---\n', 'utf8');
		await fs.writeFile(join(root, 'issues', '9999-schema.md'), '---\nid: "9999"\n---\n', 'utf8');

		const report = await validateRepository(root);
		const parseWarning = report.warnings.find((warning) => warning.path.endsWith('9998-parse.md'));
		const schemaWarning = report.warnings.find((warning) => warning.path.endsWith('9999-schema.md'));

		expect(parseWarning?.code).toBe('PARSE_ERROR');
		expect(schemaWarning?.code).toBe('SCHEMA_ERROR');
	});

	it('reports malformed comment files during validation', async () => {
		const root = await makeTempWorkspace();
		await createIssue({ rootDir: root, title: 'Valid', body: 'Body', author: 'alice' });
		await fs.mkdir(join(root, 'comments', '0001'), { recursive: true });
		await fs.writeFile(join(root, 'comments', '0001', '0001.md'), '---\nid: "0001"\n---\n', 'utf8');

		const report = await validateRepository(root);
		expect(report.validCount).toBe(1);
		expect(report.warnings.length).toBeGreaterThan(0);
		expect(report.warnings.some((warning) => warning.path.includes('comments/0001/0001.md'))).toBe(true);
		expect(report.ok).toBe(false);
	});
});
