import { Command } from 'commander';
import { addComment, listComments } from '../../../application/use-cases/comment/add-list-comments.js';

export const buildCommentCommand = (): Command => {
	const comment = new Command('comment');

	comment
		.command('add <issueId>')
		.requiredOption('--author <author>')
		.requiredOption('--body <body>')
		.action(async (issueId, options) => {
			const result = await addComment(process.cwd(), issueId, options.author, options.body);
			console.log(JSON.stringify(result, null, 2));
		});

	comment.command('list <issueId>').action(async (issueId) => {
		const result = await listComments(process.cwd(), issueId);
		console.log(JSON.stringify({ comments: result }, null, 2));
	});

	return comment;
};
