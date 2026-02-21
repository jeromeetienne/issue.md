# PR-08 Checklist — Validate CLI exit behavior for issue validate

## PR Metadata
- PR ID: PR-08
- Title: Add process-level tests for validate command exit semantics
- Backlog item: ../mvp-gap-backlog.md (PR-08)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Add process test for `issue validate` on passing repository
- [x] Add process test for `issue validate` on malformed repository
- [x] Assert diagnostics payload includes warnings

### Explicitly out of scope
- [ ] No issue/comment schema design changes
- [ ] No CLI command additions

## Files Touched
- [x] tests/integration/validate-cli.process.test.ts (preferred) or validate-cli.behavior.test.ts
- [x] tests/integration/helpers.ts (if helper reused)

## Requirements Mapping
- [x] FR-009
- [x] FR-018
- [x] Task T037 diagnostics output confidence

## Implementation Checklist
- [x] Exit code `0` for passing repo
- [x] Exit code `2` for warning/error repo
- [x] Output remains actionable

## Test Checklist
- [x] Covers both success and failure process paths
- [x] `npm test` passes

## Acceptance Criteria
- [x] Passing repo exits 0
- [x] Failing repo exits 2 and includes warning details
