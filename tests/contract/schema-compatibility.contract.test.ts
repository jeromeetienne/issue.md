import { describe, expect, it } from 'vitest';
import { classifySchemaChange } from '../../src/domain/schema/compatibility.js';
import { enforceMigrationPolicy } from '../../src/domain/schema/change-policy.js';

describe('schema compatibility policy', () => {
  it('classifies change and enforces migration guidance for breaking changes', () => {
    const change = {
      version: '2.0.0',
      change_type: 'breaking' as const,
      summary: 'required field update',
      migration_guidance: 'run migration script'
    };
    expect(classifySchemaChange(change)).toBe('breaking');
    expect(() => enforceMigrationPolicy(change)).not.toThrow();
  });

  it('rejects breaking change without migration guidance', () => {
    expect(() =>
      enforceMigrationPolicy({
        version: '2.0.0',
        change_type: 'breaking',
        summary: 'break'
      })
    ).toThrow();
  });
});
