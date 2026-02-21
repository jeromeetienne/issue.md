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
- [ ] Detect title slug change during update
- [ ] Rename file to `<id>-<kebab-case-title>.md`
- [ ] Preserve conflict-safe behavior on target path collision

### Explicitly out of scope
- [ ] No lifecycle command additions
- [ ] No validate warning code changes

## Files Touched
- [ ] src/infrastructure/fs/issue-repository.ts
- [ ] src/application/use-cases/issue/get-update-issue.ts (if needed)
- [ ] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [ ] FR-004
- [ ] FR-007

## Implementation Checklist
- [ ] Rename executes only when slug changes
- [ ] Updated content remains deterministic
- [ ] Old file path no longer present after rename

## Test Checklist
- [ ] Add assertion for renamed file path
- [ ] Add assertion metadata/body preserved
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Renamed title results in renamed issue file
- [ ] Content and metadata remain valid post-rename
