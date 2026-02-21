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
- [ ] Add process test for `issue validate` on passing repository
- [ ] Add process test for `issue validate` on malformed repository
- [ ] Assert diagnostics payload includes warnings

### Explicitly out of scope
- [ ] No issue/comment schema design changes
- [ ] No CLI command additions

## Files Touched
- [ ] tests/integration/validate-cli.process.test.ts (preferred) or validate-cli.behavior.test.ts
- [ ] tests/integration/helpers.ts (if helper reused)

## Requirements Mapping
- [ ] FR-009
- [ ] FR-018
- [ ] Task T037 diagnostics output confidence

## Implementation Checklist
- [ ] Exit code `0` for passing repo
- [ ] Exit code `2` for warning/error repo
- [ ] Output remains actionable

## Test Checklist
- [ ] Covers both success and failure process paths
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Passing repo exits 0
- [ ] Failing repo exits 2 and includes warning details
