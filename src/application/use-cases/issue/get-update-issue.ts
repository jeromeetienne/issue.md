import { join } from 'node:path';
import { nowUtc } from '../../../shared/time/now.js';
import { IssueRepository } from '../../../infrastructure/fs/issue-repository.js';

export const getIssue = async (rootDir: string, id: string) => {
	const repository = new IssueRepository(join(rootDir));
	return repository.getById(id);
};

export const updateIssue = async (
	rootDir: string,
	id: string,
	patch: { title?: string; body?: string }
) => {
	const repository = new IssueRepository(join(rootDir));
	return repository.updateById(id, (current) => ({
		...current,
		metadata: {
			...current.metadata,
			title: patch.title ?? current.metadata.title,
			updated_at: nowUtc()
		},
		body: patch.body ?? current.body
	}));
};
