import { ValidationError } from '../../shared/errors/errors.js';
import type { IssueMetadata, IssueStatus } from '../schema/types.js';

const allowedTransitions: Record<IssueStatus, IssueStatus[]> = {
	open: ['in_progress', 'closed'],
	in_progress: ['closed'],
	closed: ['open']
};

export const assertTransition = (from: IssueStatus, to: IssueStatus): void => {
	if (!allowedTransitions[from].includes(to)) {
		throw new ValidationError(`Invalid transition ${from} -> ${to}`);
	}
};

export const slugifyTitle = (title: string): string =>
	title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

export const toSummary = (issue: IssueMetadata) => ({
	id: issue.id,
	title: issue.title,
	status: issue.status,
	updated_at: issue.updated_at
});
