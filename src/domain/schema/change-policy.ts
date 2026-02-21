import { ValidationError } from '../../shared/errors/errors.js';
import type { SchemaChange } from './compatibility.js';

export const enforceMigrationPolicy = (change: SchemaChange): void => {
  if (change.change_type === 'breaking' && !change.migration_guidance?.trim()) {
    throw new ValidationError('Breaking schema changes require migration guidance');
  }
};
