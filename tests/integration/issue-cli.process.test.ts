import { describe, expect, it } from 'vitest';
import { makeTempWorkspace, runCliCommand } from './helpers.js';

describe('issue cli process smoke flow', () => {
	it('runs create -> list -> show through built CLI process', async () => {
		const root = await makeTempWorkspace();

		const createResult = runCliCommand(
			['issue', 'create', '--title', 'Process issue', '--author', 'alice', '--body', 'Body'],
			root
		);
		expect(createResult.exitCode).toBe(0);
		expect(createResult.stdout).toContain('Issue created');
		expect(createResult.stdout).toContain('id: 0001');
		expect(createResult.stdout).toContain('title: Process issue');

		const listResult = runCliCommand(['issue', 'list'], root);
		expect(listResult.exitCode).toBe(0);
		expect(listResult.stdout).toContain('Issues');
		expect(listResult.stdout).toContain('0001: Process issue [open]');
		expect(listResult.stdout).toContain('warnings_count: 0');

		const showResult = runCliCommand(['issue', 'show', '0001'], root);
		expect(showResult.exitCode).toBe(0);
		expect(showResult.stdout).toContain('Issue details');
		expect(showResult.stdout).toContain('id: 0001');
		expect(showResult.stdout).toContain('title: Process issue');
		expect(showResult.stdout).toContain('status: open');
	});
});
