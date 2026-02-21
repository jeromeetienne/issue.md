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
- [ ] Convert conflict test to real concurrency race
- [ ] Assert one success + one `ID_CONFLICT`
- [ ] Assert retry guidance in error message

### Explicitly out of scope
- [ ] No implementation logic refactor unless test requires it
- [ ] No CLI process-level assertions

## Files Touched
- [ ] tests/integration/issue-cli.conflict.test.ts

## Requirements Mapping
- [ ] FR-014
- [ ] Edge case: concurrent create collision

## Implementation Checklist
- [ ] Uses `Promise.allSettled` (or equivalent) for concurrent attempts
- [ ] Avoids flaky timing assumptions

## Test Checklist
- [ ] Deterministically validates conflict behavior
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Under concurrent creates, one operation fails with `ID_CONFLICT`
- [ ] Error message includes retry guidance
