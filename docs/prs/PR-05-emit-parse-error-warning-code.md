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
- [ ] Classify parse/front-matter failures as `PARSE_ERROR`
- [ ] Keep metadata validation failures as `SCHEMA_ERROR`
- [ ] Add warning-code test coverage

### Explicitly out of scope
- [ ] No extension model alignment changes
- [ ] No CLI process smoke tests

## Files Touched
- [ ] src/infrastructure/fs/issue-repository.ts
- [ ] tests/integration/validate-cli.behavior.test.ts

## Requirements Mapping
- [ ] FR-018
- [ ] Contract: FileWarning enum includes `PARSE_ERROR`

## Implementation Checklist
- [ ] Warning code mapping is deterministic
- [ ] Existing PATH_MISMATCH behavior preserved

## Test Checklist
- [ ] Add malformed YAML/front-matter parse failure case
- [ ] Assert warning code `PARSE_ERROR`
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] Invalid YAML/front-matter returns `PARSE_ERROR`
- [ ] Missing required metadata returns `SCHEMA_ERROR`
