# PR-01 Checklist — Add in_progress command path

## PR Metadata
- PR ID: PR-01
- Title: Add issue start flow for in_progress lifecycle state
- Backlog item: ../mvp-gap-backlog.md (PR-01)
- Priority: High
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Add `startIssue(rootDir, id)` use-case helper
- [x] Add CLI command `issue start <id>`
- [x] Extend lifecycle integration test for in_progress step

### Explicitly out of scope
- [ ] No title-rename canonical path work
- [ ] No validate command/report changes

## Files Touched
- [x] src/application/use-cases/issue/change-issue-status.ts
- [x] src/cli/commands/issue/index.ts
- [x] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [ ] FR-006
- [ ] SC-004

## Implementation Checklist
- [x] Uses existing transition guard logic
- [ ] Keeps close/reopen behavior unchanged
- [ ] Returns actionable error on invalid transition

## Test Checklist
- [x] Integration test includes `open -> in_progress -> closed -> open`
- [x] `npm test` passes

## Acceptance Criteria
- [x] Status changes to `in_progress` via CLI/use-case
- [x] Transition guard remains active
