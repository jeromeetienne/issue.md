import { join } from 'node:path';
import { listIssues } from '../issue/list-issues.js';
import { CommentRepository } from '../../../infrastructure/fs/comment-repository.js';

export const validateRepository = async (rootDir: string) => {
	const result = await listIssues(join(rootDir));
	const commentRepository = new CommentRepository(join(rootDir));
	const commentValidation = await commentRepository.validateAll();
	const warnings = [...result.warnings, ...commentValidation.warnings];

	return {
		validCount: result.issues.length,
		validCommentCount: commentValidation.validCount,
		warnings,
		ok: warnings.length === 0
	};
};
