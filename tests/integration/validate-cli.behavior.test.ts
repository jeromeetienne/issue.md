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
});
