import { Command } from 'commander';
import { addComment, listComments } from '../../../application/use-cases/comment/add-list-comments.js';
import { printCommentList, printCommentRecord } from '../../output.js';

export const buildCommentCommand = (): Command => {
	const comment = new Command('comment');

	comment
		.command('add <issueId>')
		.requiredOption('--author <author>')
		.requiredOption('--body <body>')
		.action(async (issueId, options) => {
			const result = await addComment(process.cwd(), issueId, options.author, options.body);
			printCommentRecord('Comment added', result);
		});

	comment.command('list <issueId>').action(async (issueId) => {
		const result = await listComments(process.cwd(), issueId);
		printCommentList('Comments', result);
	});

	return comment;
};
