# Open Issue — Application Outline

## 1) Purpose
Build an issue-tracking application that stores issues as Markdown files in a repository.
The system must be:
- Human-readable and directly editable
- Machine-parseable for automation
- Friendly to Git workflows (diff, merge, history)

## 2) Product Goals
- Create, update, list, and close issues stored on disk
- Keep issue format stable and deterministic
- Enable automation via strict metadata schema
- Provide at least one practical interface (CLI first)
- Optionally provide a web interface with parity to core CLI operations

## 3) Non-Goals (Initial MVP)
- Real-time collaboration
- External database as source of truth
- Complex role/permission system
- Full GitHub API replacement

## 4) Core Concepts
### Issue Document
Each issue is one Markdown file with:
1. YAML front matter (required metadata)
2. Markdown body (description/discussion)

### Suggested Required Metadata
- `id`: unique issue identifier
- `title`: short title
- `status`: `open | in_progress | closed`
- `created_at`: ISO datetime
- `updated_at`: ISO datetime
- `author`: creator identifier

Format decision (MVP):
- YAML front matter delimited by `---`
- UTF-8 encoded Markdown files

### Suggested Optional Metadata
- `assignees`: list
- `labels`: list
- `priority`: enum
- `related`: list of issue IDs

## 5) Directory Layout (Proposed)
```text
issues/
  0001-my-first-issue.md
  0002-fix-parser-edge-case.md

comments/
  0001/
    0001.md
    0002.md
```

ID strategy (MVP):
- Sequential numeric IDs with zero-padding (e.g., `0001`)
- Canonical filename format: `<id>-<kebab-case-title>.md`
- New issue creation computes `max(id) + 1`; collisions on concurrent edits are surfaced as validation errors

Optional generated/read-model artifacts (non-canonical):
```text
.issue-cache/
  index.json
```

Comments decision (MVP):
- Comments are stored in separate files under `comments/<issue-id>/`
- Comment files are sequentially numbered and Markdown-based

## 6) Issue Lifecycle
- `open` → `in_progress` → `closed`
- Reopen allowed: `closed` → `open`
- Every state change updates `updated_at`

## 7) Parsing and Validation Rules
- Markdown + front matter must parse deterministically
- Unknown required fields => validation error
- Invalid enum/date/id format => validation error
- Writes should preserve deterministic field order to reduce noisy diffs

## 8) Interfaces
### CLI (MVP)
Candidate commands:
- `issue create`
- `issue list`
- `issue show <id>`
- `issue edit <id>`
- `issue close <id>`
- `issue reopen <id>`

### Web (Phase 2)
- List and filter issues
- View issue details
- Create/edit/close/reopen issues
- Must enforce same validation and lifecycle rules as CLI

Scope decision:
- Web interface is explicitly post-MVP (Phase 2)

## 9) Testing Strategy
- Unit tests for parser/serializer and validators
- Integration tests for lifecycle transitions and file operations
- Contract tests for metadata schema compatibility

## 10) Milestones
### M1 — Format + Core Engine
- Define schema
- Implement parser/validator
- Implement deterministic read/write

### M2 — CLI MVP
- Create/list/show/edit/close/reopen
- Add integration tests

### M3 — Optional Web UI
- Read/write through same core engine
- Add parity tests against CLI behavior

## 11) Risks
- Schema drift over time
- Merge conflicts in concurrent edits
- Behavior divergence between CLI and web interfaces

## 12) Open Questions
No blocking open questions for MVP scope.
