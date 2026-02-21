# Feature Specification: Issue.md MVP

**Feature Branch**: `001-build-issue-md`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Implement the feature specification based on the updated constitution. I want to build a filesystem-native issue tracker with markdown issue files, CLI MVP, and web in phase 2."

## Clarifications

### Session 2026-02-21

- Q: How should the system handle concurrent issue creation ID collisions? → A: On ID collision, fail creation with explicit conflict error and require user retry.
- Q: How should extra metadata fields be handled? → A: Allow extension fields only under reserved `x_` prefix.
- Q: What is the comment file shape in MVP? → A: Comment front matter with required `id`, `issue_id`, `created_at`, `author` plus Markdown body.
- Q: What timestamp format should be required? → A: Require ISO 8601 UTC timestamps with `Z` suffix.
- Q: How should `issue list` behave when malformed issue files exist? → A: Return valid issues and report malformed files as warnings/errors.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Issues from CLI (Priority: P1)

As a maintainer, I can create, view, list, edit, close, and reopen issues from the command line so I can manage project work in a Git repository without external services.

**Why this priority**: This is the primary value proposition and defines the MVP.

**Independent Test**: In an empty repository, a user creates an issue, updates it, changes status, and confirms all changes are persisted in issue files with valid metadata.

**Acceptance Scenarios**:

1. **Given** an empty `issues/` directory, **When** the user creates an issue with a title and body, **Then** the system creates one Markdown file with required metadata and status `open`.
2. **Given** an existing open issue, **When** the user closes the issue, **Then** the issue status becomes `closed` and `updated_at` changes.
3. **Given** an existing closed issue, **When** the user reopens the issue, **Then** the issue status becomes `open` and `updated_at` changes.
4. **Given** multiple issues, **When** the user lists issues, **Then** each issue appears with id, title, and status.
5. **Given** two concurrent create attempts that target the same next id, **When** one write wins first, **Then** the second create fails with an explicit ID conflict error and retry guidance.

---

### User Story 2 - Add and Read Issue Comments (Priority: P2)

As a collaborator, I can add comments to an issue and view its comment history so discussion is tracked alongside issue progress.

**Why this priority**: Comments provide essential context for issue collaboration while remaining separate from core issue creation.

**Independent Test**: Using an existing issue, a user adds multiple comments and confirms comments are persisted under the issue’s comment directory and can be listed in order.

**Acceptance Scenarios**:

1. **Given** an existing issue, **When** the user adds a comment, **Then** a new comment file is created under `comments/<issue-id>/` with sequential numbering.
2. **Given** an issue with comments, **When** the user views the issue discussion, **Then** comments are shown in chronological order with author and timestamp.
3. **Given** a created comment file, **When** it is validated, **Then** it must include front matter keys `id`, `issue_id`, `created_at`, and `author` before Markdown body content.

---

### User Story 3 - Enforce Format and Compatibility Rules (Priority: P3)

As an automation author, I can rely on stable issue document rules so scripts and tools continue to work after updates.

**Why this priority**: Deterministic parsing and compatibility governance are required by the constitution and prevent ecosystem breakage.

**Independent Test**: A user validates a repository containing valid and invalid issue documents and receives deterministic pass/fail results with actionable errors.

**Acceptance Scenarios**:

1. **Given** a valid issue file, **When** the user runs validation, **Then** validation succeeds with no errors.
2. **Given** an invalid issue file (missing required metadata), **When** the user runs validation, **Then** validation fails and identifies the missing field.
3. **Given** a schema contract change, **When** the change is classified as breaking, **Then** a compatibility impact note and migration guidance are required.

### Edge Cases

- Concurrent issue creation generating the same next numeric id MUST return an explicit ID conflict error and require retry.
- How does the system behave when an issue filename id does not match front matter id?
- What happens when comment numbering has gaps (for example, `0001.md`, `0003.md`)?
- Listing returns valid issues and reports malformed Markdown files in `issues/` as warnings/errors.
- What happens when a user attempts an invalid lifecycle transition (for example, `closed` to `in_progress` without reopening)?
- Validation rejects unknown top-level metadata keys that do not start with `x_`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store canonical issue data as Markdown files in the repository file system.
- **FR-002**: System MUST support CLI operations to create, list, show, edit, close, and reopen issues.
- **FR-003**: System MUST assign issue identifiers as zero-padded sequential numeric values unique within the repository.
- **FR-004**: System MUST enforce canonical issue filename format `<id>-<kebab-case-title>.md`.
- **FR-005**: System MUST maintain required metadata fields for each issue: `id`, `title`, `status`, `created_at`, `updated_at`, and `author`.
- **FR-006**: System MUST enforce lifecycle states `open`, `in_progress`, and `closed`, including allowed reopen transition from `closed` to `open`.
- **FR-007**: System MUST update `updated_at` on any change to issue metadata, status, title, or body.
- **FR-008**: System MUST store comments as separate Markdown files under `comments/<issue-id>/` with sequential numeric comment identifiers.
- **FR-009**: System MUST parse and validate YAML front matter and report deterministic, actionable validation errors for invalid documents.
- **FR-010**: System MUST preserve deterministic write behavior to minimize unnecessary diffs for semantically identical changes.
- **FR-011**: System MUST treat generated indexes or caches as non-canonical artifacts and keep issue/comment files as the source of truth.
- **FR-012**: System MUST provide compatibility classification for schema updates (breaking vs non-breaking) and require migration guidance for breaking changes.
- **FR-013**: If web interface work begins in later phases, system MUST enforce the same issue lifecycle and validation rules used by CLI.
- **FR-014**: On issue ID collision during create, system MUST fail the command with a deterministic conflict error and MUST NOT silently renumber.
- **FR-015**: System MUST allow non-canonical metadata extensions only for top-level keys prefixed with `x_`; any other unknown top-level metadata keys MUST fail validation.
- **FR-016**: Each comment document MUST include YAML front matter with required fields `id`, `issue_id`, `created_at`, and `author`, followed by Markdown body content.
- **FR-017**: All timestamp fields (`created_at`, `updated_at`) MUST use ISO 8601 UTC datetime format with a `Z` suffix.
- **FR-018**: `issue list` MUST return valid issues even when malformed issue files are present, and MUST report each malformed file with actionable warning/error details.

### Issue Document Contract *(mandatory for this project)*

- Front matter format: YAML, delimited by `---`, encoded as UTF-8.
- Required issue metadata fields and types:
  - `id` (string, zero-padded numeric)
  - `title` (string, non-empty)
  - `status` (enum: `open`, `in_progress`, `closed`)
  - `created_at` (ISO 8601 UTC datetime with `Z` suffix)
  - `updated_at` (ISO 8601 UTC datetime with `Z` suffix)
  - `author` (string, non-empty)
- Canonical issue path: `issues/<id>-<kebab-case-title>.md`.
- Canonical comment path: `comments/<issue-id>/<comment-id>.md`.
- Required comment metadata fields and types:
  - `id` (string, zero-padded numeric)
  - `issue_id` (string, must match parent issue id)
  - `created_at` (ISO 8601 UTC datetime with `Z` suffix)
  - `author` (string, non-empty)
- Missing required fields, invalid enum/date formats, and id/path mismatches MUST fail validation.
- Unknown top-level metadata keys that do not use the `x_` extension prefix MUST fail validation.
- Compatibility policy:
  - Non-breaking: additive optional fields or clarifying constraints.
  - Breaking: required field changes, semantic changes to existing fields, lifecycle change that invalidates existing documents.
  - Breaking changes require migration guidance before release.
- Interface parity note: web UI is post-MVP; when introduced, parity with CLI contract is mandatory.

### Key Entities *(include if feature involves data)*

- **Issue**: Primary work item stored as a Markdown document with identity, status, timestamps, author, and body content.
- **Comment**: Discussion entry linked to one issue, stored as a separate Markdown document with sequential id and timestamp.
- **Issue Schema Contract**: Versioned definition of valid metadata fields, field types, lifecycle states, and compatibility rules.

### Assumptions

- MVP runs in a single repository workspace and is operated by trusted collaborators.
- Timestamps use ISO 8601 with timezone information.
- CLI is the only required interface in MVP; web behavior is out of current delivery scope.

### Dependencies

- Repository has write access to create and update files under `issues/` and `comments/`.
- Team agrees on schema contract ownership and review process for breaking changes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of first-time users can create and close an issue from CLI in under 3 minutes using project documentation.
- **SC-002**: 100% of issue files produced by standard create/edit flows pass validation checks.
- **SC-003**: Validation reports identify invalid issue documents with specific field-level error messages in 100% of malformed test cases.
- **SC-004**: In acceptance testing, users can complete the full lifecycle (`open` → `in_progress` → `closed` → `open`) without manual file edits in 100% of trials.
- **SC-005**: For a repository with 1,000 issues, list and show workflows remain usable for operators with result display completed in under 2 seconds for typical local execution.
