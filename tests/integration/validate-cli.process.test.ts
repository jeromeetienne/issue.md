import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { makeTempWorkspace, runCliCommand } from './helpers.js';

describe('validate cli process behavior', () => {
	it('exits with code 0 for a valid repository', async () => {
		const root = await makeTempWorkspace();
		const result = runCliCommand(['issue', 'validate'], root);

		expect(result.exitCode).toBe(0);
		expect(result.stdout).toContain('Validation passed');
		expect(result.stdout).toContain('ok: true');
		expect(result.stdout).toContain('warnings_count: 0');
	});

	it('exits with code 2 and warning diagnostics for malformed repository', async () => {
		const root = await makeTempWorkspace();
		await fs.writeFile(join(root, 'issues', '9999-bad.md'), '---\nid: "9999"\n---\n', 'utf8');

		const result = runCliCommand(['issue', 'validate'], root);

		expect(result.exitCode).toBe(2);
		expect(result.stdout).toContain('Validation failed');
		expect(result.stdout).toContain('ok: false');
		expect(result.stdout).toContain('warnings_count: 1');
		expect(result.stdout).toContain('path:');
		expect(result.stdout).toContain('code: SCHEMA_ERROR');
	});
});
