import { join } from 'node:path';
import { nowUtc } from '../../../shared/time/now.js';
import { IssueRepository } from '../../../infrastructure/fs/issue-repository.js';

export interface CreateIssueInput {
  rootDir: string;
  title: string;
  body: string;
  author: string;
}

export const createIssue = async (input: CreateIssueInput) => {
	const repository = new IssueRepository(join(input.rootDir));
	const timestamp = nowUtc();
	return repository.create(
		{
			title: input.title,
			status: 'open',
			created_at: timestamp,
			updated_at: timestamp,
			author: input.author
		},
		input.body
	);
};
