import { describe, expect, it } from 'vitest';
import { validateComment } from '../../src/infrastructure/validation/schema-validator.js';

describe('comment schema contract', () => {
	it('accepts valid comment metadata', () => {
		const comment = validateComment({
			id: '0001',
			issue_id: '0001',
			created_at: '2026-02-21T00:00:00.000Z',
			author: 'bob'
		});
		expect(comment.issue_id).toBe('0001');
	});

	it('rejects unknown non x_ field', () => {
		expect(() =>
			validateComment({
				id: '0001',
				issue_id: '0001',
				created_at: '2026-02-21T00:00:00.000Z',
				author: 'bob',
				foo: 'bar'
			})
		).toThrow();
	});

	it('accepts x_ prefixed extension fields', () => {
		const comment = validateComment({
			id: '0001',
			issue_id: '0001',
			created_at: '2026-02-21T00:00:00.000Z',
			author: 'bob',
			x_sentiment: 'positive',
			x_labels: ['helpful']
		});
		expect(comment.issue_id).toBe('0001');
		expect((comment as any).x_sentiment).toBe('positive');
		expect((comment as any).x_labels).toEqual(['helpful']);
	});
});
