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
- [ ] Add helper to spawn CLI process and capture output/exit code
- [ ] Add smoke flow test: create -> list -> show
- [ ] Ensure test runs against built CLI entry

### Explicitly out of scope
- [ ] No validate exit-code assertions (PR-08)
- [ ] No contract/schema modifications

## Files Touched
- [ ] tests/integration/helpers.ts
- [ ] tests/integration/issue-cli.process.test.ts (preferred) or issue-cli.lifecycle.test.ts

## Requirements Mapping
- [ ] US1 CLI operation coverage integrity
- [ ] Tasks alignment: “CLI integration” should exercise CLI surface

## Implementation Checklist
- [ ] Spawn command is stable across local environments
- [ ] Parses JSON output safely for assertions
- [ ] Keeps current use-case integration tests intact

## Test Checklist
- [ ] CLI process returns expected exit codes and payload shapes
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Commands execute through CLI binary path, not direct imports
