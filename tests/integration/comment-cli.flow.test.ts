import { describe, expect, it } from 'vitest';
import { createIssue } from '../../src/application/use-cases/issue/create-issue.js';
import { addComment, listComments } from '../../src/application/use-cases/comment/add-list-comments.js';
import { makeTempWorkspace } from './helpers.js';

describe('comment flow integration', () => {
	it('adds and lists comments in order', async () => {
		const root = await makeTempWorkspace();
		await createIssue({ rootDir: root, title: 'Issue', body: 'Body', author: 'alice' });
		await addComment(root, '0001', 'bob', 'first');
		await addComment(root, '0001', 'carol', 'second');
		const listed = await listComments(root, '0001');
		expect(listed).toHaveLength(2);
		expect(listed[0].metadata.id).toBe('0001');
		expect(listed[1].metadata.id).toBe('0002');
	});
});
