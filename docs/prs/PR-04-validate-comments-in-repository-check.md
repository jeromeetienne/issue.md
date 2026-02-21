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
- [ ] Scan `comments/<issue-id>/*.md` during validate
- [ ] Validate required comment metadata fields
- [ ] Include comment warnings in validate report

### Explicitly out of scope
- [ ] No PARSE_ERROR warning code work
- [ ] No CLI command additions

## Files Touched
- [ ] src/application/use-cases/schema/validate-repository.ts
- [ ] src/infrastructure/fs/comment-repository.ts (or shared helper)
- [ ] tests/integration/validate-cli.behavior.test.ts

## Requirements Mapping
- [ ] FR-016
- [ ] User Story 2 acceptance validation clause

## Implementation Checklist
- [ ] Report includes comment warning details
- [ ] Validate ok/fail state reflects comment failures
- [ ] Existing issue validation behavior remains intact

## Test Checklist
- [ ] Add malformed comment fixture case
- [ ] Assert failing validate report with actionable warning
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Malformed comment file fails validate with actionable warning/error
- [ ] Valid comments do not alter issue counts incorrectly
