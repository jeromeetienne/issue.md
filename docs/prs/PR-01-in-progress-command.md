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
- [ ] Add `startIssue(rootDir, id)` use-case helper
- [ ] Add CLI command `issue start <id>`
- [ ] Extend lifecycle integration test for in_progress step

### Explicitly out of scope
- [ ] No title-rename canonical path work
- [ ] No validate command/report changes

## Files Touched
- [ ] src/application/use-cases/issue/change-issue-status.ts
- [ ] src/cli/commands/issue/index.ts
- [ ] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [ ] FR-006
- [ ] SC-004

## Implementation Checklist
- [ ] Uses existing transition guard logic
- [ ] Keeps close/reopen behavior unchanged
- [ ] Returns actionable error on invalid transition

## Test Checklist
- [ ] Integration test includes `open -> in_progress -> closed -> open`
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Status changes to `in_progress` via CLI/use-case
- [ ] Transition guard remains active
