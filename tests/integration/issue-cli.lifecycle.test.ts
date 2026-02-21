import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { listIssues } from '../../src/application/use-cases/issue/list-issues.js';
import {
	startIssue,
	closeIssue,
	reopenIssue
} from '../../src/application/use-cases/issue/change-issue-status.js';
import { getIssue, updateIssue } from '../../src/application/use-cases/issue/get-update-issue.js';
import { makeTempWorkspace } from './helpers.js';

describe('issue lifecycle integration', () => {
	it('creates, updates, closes, reopens and lists', async () => {
		const root = await makeTempWorkspace();
		const created = await createIssue({ rootDir: root, title: 'A title', body: 'Body', author: 'alice' });
		expect(created.metadata.id).toBe('0001');

		const updated = await updateIssue(root, '0001', { title: 'B title', body: 'B body' });
		expect(updated.metadata.title).toBe('B title');

		const started = await startIssue(root, '0001');
		expect(started.metadata.status).toBe('in_progress');

		const closed = await closeIssue(root, '0001');
		expect(closed.metadata.status).toBe('closed');

		const reopened = await reopenIssue(root, '0001');
		expect(reopened.metadata.status).toBe('open');

		const listed = await listIssues(root);
		expect(listed.issues).toHaveLength(1);
		expect(listed.warnings).toHaveLength(0);

		const shown = await getIssue(root, '0001');
		expect(shown.metadata.id).toBe('0001');
	});
});
