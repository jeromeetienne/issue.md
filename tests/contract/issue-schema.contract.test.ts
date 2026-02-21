import { describe, expect, it } from 'vitest';
import { validateIssue } from '../../src/infrastructure/validation/schema-validator.js';

describe('issue schema contract', () => {
	it('accepts valid issue metadata', () => {
		const issue = validateIssue({
			id: '0001',
			title: 'Hello',
			status: 'open',
			created_at: '2026-02-21T00:00:00.000Z',
			updated_at: '2026-02-21T00:00:00.000Z',
			author: 'alice'
		});
		expect(issue.id).toBe('0001');
	});

	it('rejects unknown non x_ field', () => {
		expect(() =>
			validateIssue({
				id: '0001',
				title: 'Hello',
				status: 'open',
				created_at: '2026-02-21T00:00:00.000Z',
				updated_at: '2026-02-21T00:00:00.000Z',
				author: 'alice',
				foo: 'bar'
			})
		).toThrow();
	});
});
