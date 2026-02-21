export type ChangeType = 'non_breaking' | 'breaking';

export interface SchemaChange {
  version: string;
  change_type: ChangeType;
  summary: string;
  migration_guidance?: string;
}

export const classifySchemaChange = (change: SchemaChange): ChangeType => {
	return change.change_type;
};
