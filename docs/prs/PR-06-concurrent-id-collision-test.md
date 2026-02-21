# PR-06 Checklist — Add true concurrent ID collision test

## PR Metadata
- PR ID: PR-06
- Title: Verify deterministic ID conflict behavior under concurrent creates
- Backlog item: ../mvp-gap-backlog.md (PR-06)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Convert conflict test to real concurrency race
- [x] Assert one success + one `ID_CONFLICT`
- [x] Assert retry guidance in error message

### Explicitly out of scope
- [ ] No implementation logic refactor unless test requires it
- [ ] No CLI process-level assertions

## Files Touched
- [x] tests/integration/issue-cli.conflict.test.ts

## Requirements Mapping
- [x] FR-014
- [x] Edge case: concurrent create collision

## Implementation Checklist
- [x] Uses `Promise.allSettled` (or equivalent) for concurrent attempts
- [x] Avoids flaky timing assumptions

## Test Checklist
- [x] Deterministically validates conflict behavior
- [x] `npm test` passes

## Acceptance Criteria
- [x] Under concurrent creates, one operation fails with `ID_CONFLICT`
- [x] Error message includes retry guidance
