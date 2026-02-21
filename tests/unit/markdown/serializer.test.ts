import { describe, expect, it } from 'vitest';
import { stringifyMarkdownDocument } from '../../../src/infrastructure/markdown/document-codec.js';

describe('deterministic serializer', () => {
	it('renders byte-identical output for semantically same metadata', () => {
		const a = stringifyMarkdownDocument(
			{
				title: 'Title',
				id: '0001',
				status: 'open',
				created_at: '2026-02-21T00:00:00.000Z',
				updated_at: '2026-02-21T00:00:00.000Z',
				author: 'alice'
			},
			'Body'
		);

		const b = stringifyMarkdownDocument(
			{
				id: '0001',
				updated_at: '2026-02-21T00:00:00.000Z',
				status: 'open',
				title: 'Title',
				author: 'alice',
				created_at: '2026-02-21T00:00:00.000Z'
			},
			'Body'
		);

		expect(a).toBe(b);
	});
});
