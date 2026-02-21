# PR Checklist Template (MVP Gaps)

Use this template for each backlog PR (`PR-01` ... `PR-10`).

## PR Metadata

- PR ID: `PR-__`
- Title:
- Backlog item link:
- Priority: High / Medium / Low
- Owner:
- Reviewer(s):

## Scope

### Included changes
- [ ] Itemized change 1
- [ ] Itemized change 2
- [ ] Itemized change 3

### Explicitly out of scope
- [ ] No unrelated refactors
- [ ] No contract/schema changes unless this PR requires them
- [ ] No docs updates unless listed in backlog item

## Files Touched

- [ ] `path/to/file-1`
- [ ] `path/to/file-2`
- [ ] `path/to/test-file`

## Requirements Mapping

- Spec requirement(s):
  - [ ] FR-___
  - [ ] FR-___
- Task mapping (if relevant):
  - [ ] T___
- Contract mapping (if relevant):
  - [ ] `issue-api.openapi.yaml` section/path:

## Implementation Checklist

- [ ] Behavior implemented exactly for this slice
- [ ] Error handling/exit code behavior updated (if applicable)
- [ ] Deterministic file behavior preserved (UTF-8, `\n`, trailing newline)
- [ ] Existing public behavior unchanged outside this scope

## Test Checklist

### Added/updated tests
- [ ] Unit test(s)
- [ ] Integration test(s)
- [ ] Contract test(s)

### Test execution
- [ ] `npm test` passes
- [ ] New tests fail before fix and pass after fix
- [ ] No skipped tests added

## CLI/UX Validation (if applicable)

- [ ] Command help/flags updated
- [ ] Output shape and error messages are actionable
- [ ] Exit codes match expectations

## Docs Validation (if applicable)

- [ ] README/quickstart updated for any command or workflow changes
- [ ] Examples verified against actual CLI behavior

## Risk & Rollback

- Risk level: Low / Medium / High
- Main risk:
- Rollback plan:
  - [ ] Revert commit(s) cleanly
  - [ ] No migration required

## Acceptance Criteria (copy from backlog item)

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Final Verification Before Merge

- [ ] PR scope is minimal and focused
- [ ] All checklist items completed
- [ ] Reviewer sign-off received
