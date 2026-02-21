import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ConflictError } from '../../src/shared/errors/errors.js';
import { reservePathExclusively } from '../../src/infrastructure/fs/id-allocator.js';
import { makeTempWorkspace } from './helpers.js';

describe('issue id conflict behavior', () => {
	it('returns one success and one ID_CONFLICT under concurrent path reservation race', async () => {
		const root = await makeTempWorkspace();
		const issuePath = join(root, 'issues', '0001-race.md');
		await fs.mkdir(join(root, 'issues'), { recursive: true });

		const [first, second] = await Promise.allSettled([
			reservePathExclusively(issuePath),
			reservePathExclusively(issuePath)
		]);

		const fulfilled = [first, second].filter(
			(result): result is PromiseFulfilledResult<void> => result.status === 'fulfilled'
		);
		const rejected = [first, second].filter(
			(result): result is PromiseRejectedResult => result.status === 'rejected'
		);

		expect(fulfilled).toHaveLength(1);
		expect(rejected).toHaveLength(1);
		expect(rejected[0].reason).toBeInstanceOf(ConflictError);
		expect(rejected[0].reason.code).toBe('ID_CONFLICT');
		expect(rejected[0].reason.message).toContain('Retry create command');
	});
});
