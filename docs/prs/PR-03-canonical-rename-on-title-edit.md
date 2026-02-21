# PR-03 Checklist — Enforce canonical filename after title edit

## PR Metadata
- PR ID: PR-03
- Title: Rename issue file when title slug changes
- Backlog item: ../mvp-gap-backlog.md (PR-03)
- Priority: High
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Detect title slug change during update
- [x] Rename file to `<id>-<kebab-case-title>.md`
- [x] Preserve conflict-safe behavior on target path collision

### Explicitly out of scope
- [ ] No lifecycle command additions
- [ ] No validate warning code changes

## Files Touched
- [x] src/infrastructure/fs/issue-repository.ts
- [ ] src/application/use-cases/issue/get-update-issue.ts (if needed)
- [x] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [x] FR-004
- [x] FR-007

## Implementation Checklist
- [x] Rename executes only when slug changes
- [x] Updated content remains deterministic
- [x] Old file path no longer present after rename

## Test Checklist
- [x] Add assertion for renamed file path
- [x] Add assertion metadata/body preserved
- [x] `npm test` passes

## Acceptance Criteria
- [x] Renamed title results in renamed issue file
- [x] Content and metadata remain valid post-rename
