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
- [ ] Extend update patch type with optional `status`
- [ ] Add transition validation when status present
- [ ] Add CLI option `--status <open|in_progress|closed>`

### Explicitly out of scope
- [ ] No schema extension model changes
- [ ] No comment validation expansion

## Files Touched
- [ ] src/application/use-cases/issue/get-update-issue.ts
- [ ] src/cli/commands/issue/index.ts
- [ ] tests/integration/issue-cli.lifecycle.test.ts

## Requirements Mapping
- [ ] FR-006
- [ ] FR-007
- [ ] Contract: UpdateIssueRequest status support

## Implementation Checklist
- [ ] `updated_at` changes when status changes
- [ ] Invalid transitions fail with `VALIDATION_ERROR`
- [ ] Existing title/body patch behavior preserved

## Test Checklist
- [ ] Add/extend integration test for `issue edit --status`
- [ ] Add invalid transition assertion
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] `issue edit <id> --status in_progress` works from open
- [ ] Invalid transitions return `VALIDATION_ERROR`
