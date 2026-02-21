# PR-04 Checklist — Validate comment documents in repository validation

## PR Metadata
- PR ID: PR-04
- Title: Extend validate repository to include comments
- Backlog item: ../mvp-gap-backlog.md (PR-04)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Scan `comments/<issue-id>/*.md` during validate
- [x] Validate required comment metadata fields
- [x] Include comment warnings in validate report

### Explicitly out of scope
- [ ] No PARSE_ERROR warning code work
- [ ] No CLI command additions

## Files Touched
- [x] src/application/use-cases/schema/validate-repository.ts
- [x] src/infrastructure/fs/comment-repository.ts (or shared helper)
- [x] tests/integration/validate-cli.behavior.test.ts

## Requirements Mapping
- [x] FR-016
- [x] User Story 2 acceptance validation clause

## Implementation Checklist
- [x] Report includes comment warning details
- [x] Validate ok/fail state reflects comment failures
- [x] Existing issue validation behavior remains intact

## Test Checklist
- [x] Add malformed comment fixture case
- [x] Assert failing validate report with actionable warning
- [x] `npm test` passes

## Acceptance Criteria
- [x] Malformed comment file fails validate with actionable warning/error
- [x] Valid comments do not alter issue counts incorrectly
