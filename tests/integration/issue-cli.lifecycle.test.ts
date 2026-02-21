import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { listIssues } from '../../src/application/use-cases/issue/list-issues.js';
import {
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
		expect(created.path.endsWith('issues/0001-a-title.md')).toBe(true);

		const updated = await updateIssue(root, '0001', { title: 'B title', body: 'B body' });
		expect(updated.metadata.title).toBe('B title');
		expect(updated.path.endsWith('issues/0001-b-title.md')).toBe(true);
		await expect(fs.stat(join(root, 'issues', '0001-a-title.md'))).rejects.toThrow();
		await expect(fs.stat(join(root, 'issues', '0001-b-title.md'))).resolves.toBeDefined();

		const movedToInProgress = await updateIssue(root, '0001', { status: 'in_progress' });
		expect(movedToInProgress.metadata.status).toBe('in_progress');
		expect(movedToInProgress.metadata.updated_at).not.toBe(updated.metadata.updated_at);

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

	it('rejects invalid status transition in update flow', async () => {
		const root = await makeTempWorkspace();
		await createIssue({ rootDir: root, title: 'Transition test', body: 'Body', author: 'alice' });
		await closeIssue(root, '0001');

		await expect(updateIssue(root, '0001', { status: 'in_progress' })).rejects.toThrow(
			'Invalid transition closed -> in_progress'
		);
	});
});
