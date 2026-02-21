# Data Model — Issue.md MVP

## Entity: Issue

### Purpose
Represents a trackable work item stored as canonical Markdown with YAML front matter.

### Fields
- `id` (string): zero-padded sequential numeric identifier (e.g., `0001`), unique in repository.
- `title` (string): non-empty issue title.
- `status` (enum): one of `open`, `in_progress`, `closed`.
- `created_at` (string): ISO 8601 UTC datetime with `Z` suffix.
- `updated_at` (string): ISO 8601 UTC datetime with `Z` suffix.
- `author` (string): non-empty creator identity.
- `body` (string): Markdown content after front matter.
- `x_*` (any, optional): extension keys allowed only with top-level `x_` prefix.

### Validation Rules
- `id` MUST match `^[0-9]{4,}$`.
- `title` MUST trim to non-empty value.
- `status` MUST be one of the defined enum values.
- `created_at` and `updated_at` MUST be UTC `Z` timestamps.
- Unknown top-level metadata keys without `x_` prefix are invalid.
- File path id segment MUST equal front matter `id`.

### State Transitions
- Allowed:
  - `open -> in_progress`
  - `in_progress -> closed`
  - `open -> closed`
  - `closed -> open` (reopen)
- Disallowed:
  - `closed -> in_progress` directly
- Any valid transition MUST update `updated_at`.

---

## Entity: Comment

### Purpose
Represents discussion attached to an issue, stored separately from issue file.

### Fields
- `id` (string): zero-padded sequential numeric identifier within an issue comment directory.
- `issue_id` (string): parent issue id, must match directory name.
- `created_at` (string): ISO 8601 UTC datetime with `Z` suffix.
- `author` (string): non-empty commenter identity.
- `body` (string): Markdown content after front matter.
- `x_*` (any, optional): extension keys allowed only with top-level `x_` prefix.

### Validation Rules
- `id` MUST match `^[0-9]{4,}$`.
- `issue_id` MUST equal parent directory id segment.
- `created_at` MUST be UTC `Z` timestamp.
- Unknown top-level metadata keys without `x_` prefix are invalid.

---

## Entity: SchemaContract

### Purpose
Defines versioned compatibility rules for issue/comment metadata schema.

### Fields
- `version` (string): semantic version for schema contract.
- `change_type` (enum): `non_breaking | breaking`.
- `summary` (string): human-readable change description.
- `migration_guidance` (string, required when `change_type=breaking`).

### Validation Rules
- Breaking changes require migration guidance.
- Additive optional fields are non-breaking by default.
- Required field or semantic changes are breaking.

---

## Relationships
- One `Issue` has zero or more `Comment` records.
- `Comment.issue_id` references `Issue.id`.
- `SchemaContract` governs validation of both Issue and Comment documents.

## Storage Mapping
- Issue: `issues/<id>-<kebab-case-title>.md`
- Comment: `comments/<issue-id>/<comment-id>.md`
- Non-canonical generated artifacts (optional): `.issue-cache/*`
