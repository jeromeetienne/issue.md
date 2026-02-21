import chalk from 'chalk';
import type { IssueSummary, FileWarning } from '../domain/schema/types.js';
import type { IssueRecord } from '../infrastructure/fs/issue-repository.js';
import type { CommentRecord } from '../infrastructure/fs/comment-repository.js';

const heading = (text: string): void => {
	console.log(chalk.bold.magenta(`\n${text}`));
};

const printField = (name: string, value: string, indent = ''): void => {
	console.log(`${indent}${chalk.cyan(name)}: ${chalk.green(value)}`);
};

const printWarning = (warning: FileWarning, index: number): void => {
	console.log(chalk.bold.yellow(`  Warning ${index + 1}`));
	printField('path', warning.path, '    ');
	printField('code', warning.code, '    ');
	printField('message', warning.message, '    ');
};

export const printIssueRecord = (label: string, record: IssueRecord): void => {
	heading(`✔ ${label}`);
	printField('id', record.metadata.id);
	printField('title', record.metadata.title);
	printField('status', record.metadata.status);
	printField('author', record.metadata.author);
	printField('created_at', record.metadata.created_at);
	printField('updated_at', record.metadata.updated_at);
	printField('path', record.path);
	printField('body', record.body.trim() || '(empty)');
};

export const printIssueList = (
	label: string,
	result: { issues: IssueSummary[]; warnings: FileWarning[] }
): void => {
	heading(`✔ ${label}`);
	printField('issues_count', String(result.issues.length));
	if (result.issues.length > 0) {
		console.log(chalk.bold.magenta('Issues'));
		for (const issue of result.issues) {
			printField(issue.id, `${issue.title} [${issue.status}]`);
		}
	}
	printField('warnings_count', String(result.warnings.length));
	if (result.warnings.length > 0) {
		console.log(chalk.bold.yellow('Warnings'));
		result.warnings.forEach(printWarning);
	}
};

export const printCommentRecord = (label: string, record: CommentRecord): void => {
	heading(`✔ ${label}`);
	printField('id', record.metadata.id);
	printField('issue_id', record.metadata.issue_id);
	printField('author', record.metadata.author);
	printField('created_at', record.metadata.created_at);
	printField('path', record.path);
	printField('body', record.body.trim() || '(empty)');
};

export const printCommentList = (label: string, comments: CommentRecord[]): void => {
	heading(`✔ ${label}`);
	printField('comments_count', String(comments.length));
	for (const comment of comments) {
		console.log(chalk.bold.magenta(`Comment ${comment.metadata.id}`));
		printField('author', comment.metadata.author, '  ');
		printField('created_at', comment.metadata.created_at, '  ');
		printField('body', comment.body.trim() || '(empty)', '  ');
	}
};

export const printValidateReport = (report: {
	validCount: number;
	warnings: FileWarning[];
	ok: boolean;
}): void => {
	if (report.ok) {
		heading('✔ Validation passed');
	} else {
		heading('⚠ Validation failed');
	}
	printField('ok', String(report.ok));
	printField('valid_count', String(report.validCount));
	printField('warnings_count', String(report.warnings.length));
	if (report.warnings.length > 0) {
		console.log(chalk.bold.yellow('Warnings'));
		report.warnings.forEach(printWarning);
	}
};

export const printAppError = (code: string, message: string): void => {
	console.error(chalk.bold.red(`✖ ${code}`));
	console.error(chalk.red(message));
};

export const printUnexpectedError = (error: unknown): void => {
	if (error instanceof Error) {
		console.error(chalk.bold.red('✖ UNEXPECTED_ERROR'));
		console.error(chalk.red(error.stack ?? error.message));
		return;
	}
	console.error(chalk.bold.red('✖ UNEXPECTED_ERROR'));
	console.error(chalk.red(String(error)));
};
