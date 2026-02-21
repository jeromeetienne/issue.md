# PR-07 Checklist — Add real CLI process smoke test

## PR Metadata
- PR ID: PR-07
- Title: Add process-level CLI integration smoke flow
- Backlog item: ../mvp-gap-backlog.md (PR-07)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Add helper to spawn CLI process and capture output/exit code
- [x] Add smoke flow test: create -> list -> show
- [x] Ensure test runs against built CLI entry

### Explicitly out of scope
- [ ] No validate exit-code assertions (PR-08)
- [ ] No contract/schema modifications

## Files Touched
- [x] tests/integration/helpers.ts
- [x] tests/integration/issue-cli.process.test.ts (preferred) or issue-cli.lifecycle.test.ts

## Requirements Mapping
- [x] US1 CLI operation coverage integrity
- [x] Tasks alignment: “CLI integration” should exercise CLI surface

## Implementation Checklist
- [x] Spawn command is stable across local environments
- [x] Parses CLI output safely for assertions
- [x] Keeps current use-case integration tests intact

## Test Checklist
- [x] CLI process returns expected exit codes and payload shapes
- [x] `npm test` passes

## Acceptance Criteria
- [x] Commands execute through CLI binary path, not direct imports
