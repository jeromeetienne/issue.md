import { join } from 'node:path';
import { toSummary } from '../../../domain/issue/issue.js';
import { IssueRepository } from '../../../infrastructure/fs/issue-repository.js';

export const listIssues = async (rootDir: string) => {
	const repository = new IssueRepository(join(rootDir));
	const { issues, warnings } = await repository.list();
	return {
		issues: issues.map((record) => toSummary(record.metadata)),
		warnings
	};
};
