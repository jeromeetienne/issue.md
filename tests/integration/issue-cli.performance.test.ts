import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { listIssues } from '../../src/application/use-cases/issue/list-issues.js';
import { makeTempWorkspace } from './helpers.js';

describe('list performance sanity', () => {
	it('lists around 1000 issues within 2 seconds', async () => {
		const root = await makeTempWorkspace();
		for (let i = 0; i < 1000; i += 1) {
			await createIssue({ rootDir: root, title: `Issue ${i}`, body: 'Body', author: 'alice' });
		}

		const started = Date.now();
		const result = await listIssues(root);
		const elapsed = Date.now() - started;

		expect(result.issues).toHaveLength(1000);
		expect(elapsed).toBeLessThan(2000);
	}, 120000);
});
