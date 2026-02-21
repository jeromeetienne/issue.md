# PR-05 Checklist — Emit PARSE_ERROR distinctly

## PR Metadata
- PR ID: PR-05
- Title: Differentiate parse and schema warning codes in list/validate
- Backlog item: ../mvp-gap-backlog.md (PR-05)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Classify parse/front-matter failures as `PARSE_ERROR`
- [x] Keep metadata validation failures as `SCHEMA_ERROR`
- [x] Add warning-code test coverage

### Explicitly out of scope
- [ ] No extension model alignment changes
- [ ] No CLI process smoke tests

## Files Touched
- [x] src/infrastructure/fs/issue-repository.ts
- [x] tests/integration/validate-cli.behavior.test.ts

## Requirements Mapping
- [x] FR-018
- [x] Contract: FileWarning enum includes `PARSE_ERROR`

## Implementation Checklist
- [x] Warning code mapping is deterministic
- [x] Existing PATH_MISMATCH behavior preserved

## Test Checklist
- [x] Add malformed YAML/front-matter parse failure case
- [x] Assert warning code `PARSE_ERROR`
- [x] `npm test` passes

## Acceptance Criteria
- [x] Invalid YAML/front-matter returns `PARSE_ERROR`
- [x] Missing required metadata returns `SCHEMA_ERROR`
