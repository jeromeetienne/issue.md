# PR-02 Checklist — Support --status in issue edit/update

## PR Metadata
- PR ID: PR-02
- Title: Support status patching in update issue flow
- Backlog item: ../mvp-gap-backlog.md (PR-02)
- Priority: High
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Extend update patch type with optional `status`
- [x] Add transition validation when status present
- [x] Add CLI option `--status <open|in_progress|closed>`

### Explicitly out of scope
- [ ] No schema extension model changes
- [ ] No comment validation expansion

## Files Touched
- [x] src/application/use-cases/issue/get-update-issue.ts
- [x] src/cli/commands/issue/index.ts
- [x] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [x] FR-006
- [x] FR-007
- [x] Contract: UpdateIssueRequest status support

## Implementation Checklist
- [x] `updated_at` changes when status changes
- [x] Invalid transitions fail with `VALIDATION_ERROR`
- [x] Existing title/body patch behavior preserved

## Test Checklist
- [x] Add/extend integration test for `issue edit --status`
- [x] Add invalid transition assertion
- [x] `npm test` passes

## Acceptance Criteria
- [x] `issue edit <id> --status in_progress` works from open
- [x] Invalid transitions return `VALIDATION_ERROR`
