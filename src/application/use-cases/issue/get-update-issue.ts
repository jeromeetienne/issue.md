import { join } from 'node:path';
import { assertTransition } from '../../../domain/issue/issue.js';
import type { IssueStatus } from '../../../domain/schema/types.js';
import { nowUtc } from '../../../shared/time/now.js';
import { IssueRepository } from '../../../infrastructure/fs/issue-repository.js';

export const getIssue = async (rootDir: string, id: string) => {
	const repository = new IssueRepository(join(rootDir));
	return repository.getById(id);
};

export const updateIssue = async (
	rootDir: string,
	id: string,
	patch: { title?: string; body?: string; status?: IssueStatus }
) => {
	const repository = new IssueRepository(join(rootDir));
	return repository.updateById(id, (current) => {
		if (patch.status && patch.status !== current.metadata.status) {
			assertTransition(current.metadata.status, patch.status);
		}

		return {
			...current,
			metadata: {
				...current.metadata,
				title: patch.title ?? current.metadata.title,
				status: patch.status ?? current.metadata.status,
				updated_at: nowUtc()
			},
			body: patch.body ?? current.body
		};
	});
};
