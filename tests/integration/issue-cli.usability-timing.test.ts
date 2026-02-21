import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { closeIssue } from '../../src/application/use-cases/issue/change-issue-status.js';
import { makeTempWorkspace } from './helpers.js';

describe('usability timing protocol', () => {
	it('can create and close issue under 3 minutes', async () => {
		const root = await makeTempWorkspace();
		const start = Date.now();
		await createIssue({ rootDir: root, title: 'Speed', body: 'Body', author: 'alice' });
		await closeIssue(root, '0001');
		const elapsed = Date.now() - start;
		expect(elapsed).toBeLessThan(180000);
	});
});
