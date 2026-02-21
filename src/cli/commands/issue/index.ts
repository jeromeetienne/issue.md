import { Command } from 'commander';
import { createIssue } from '../../../application/use-cases/issue/create-issue.js';
import { listIssues } from '../../../application/use-cases/issue/list-issues.js';
import { getIssue, updateIssue } from '../../../application/use-cases/issue/get-update-issue.js';
import {
	startIssue,
	closeIssue,
	reopenIssue
} from '../../../application/use-cases/issue/change-issue-status.js';
import { printIssueList, printIssueRecord } from '../../output.js';
import { runValidate } from './validate.js';

export const buildIssueCommand = (): Command => {
	const issue = new Command('issue');

	issue
		.command('create')
		.requiredOption('--title <title>')
		.requiredOption('--author <author>')
		.requiredOption('--body <body>')
		.action(async (options) => {
			const created = await createIssue({
				rootDir: process.cwd(),
				title: options.title,
				body: options.body,
				author: options.author
			});
			printIssueRecord('Issue created', created);
		});

	issue.command('list').action(async () => {
		const result = await listIssues(process.cwd());
		printIssueList('Issues', result);
	});

	issue
		.command('show <id>')
		.action(async (id) => {
			const result = await getIssue(process.cwd(), id);
			printIssueRecord('Issue details', result);
		});

	issue
		.command('edit <id>')
		.option('--title <title>')
		.option('--body <body>')
		.option('--status <status>')
		.action(async (id, options) => {
			const result = await updateIssue(process.cwd(), id, {
				title: options.title,
				body: options.body,
				status: options.status
			});
			printIssueRecord('Issue updated', result);
		});

	issue.command('close <id>').action(async (id) => {
		const result = await closeIssue(process.cwd(), id);
		printIssueRecord('Issue closed', result);
	});

	issue.command('start <id>').action(async (id) => {
		const result = await startIssue(process.cwd(), id);
		printIssueRecord('Issue started', result);
	});

	issue.command('reopen <id>').action(async (id) => {
		const result = await reopenIssue(process.cwd(), id);
		printIssueRecord('Issue reopened', result);
	});

	issue.command('validate').action(async () => runValidate(process.cwd()));

	return issue;
};
