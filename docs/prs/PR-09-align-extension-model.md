# PR-09 Checklist — Align extension-field model

## PR Metadata
- PR ID: PR-09
- Title: Align extension semantics across spec, contract, and validation
- Backlog item: ../mvp-gap-backlog.md (PR-09)
- Priority: Medium
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Choose single extension model (recommended: top-level `x_*`)
- [x] Update OpenAPI schema definitions to match chosen model
- [x] Update contract tests to enforce chosen model

### Explicitly out of scope
- [ ] No unrelated lifecycle changes
- [ ] No docs onboarding rewrite (PR-10)

## Files Touched
- [x] specs/001-build-issue-md/contracts/issue-api.openapi.yaml
- [ ] src/domain/schema/document-schemas.ts (if needed)
- [x] tests/contract/issue-schema.contract.test.ts
- [x] tests/contract/comment-schema.contract.test.ts

## Requirements Mapping
- [ ] FR-015
- [x] Contract parity for Issue/Comment/Create/Update payloads

## Implementation Checklist
- [x] Contract and runtime validation are semantically consistent
- [x] Backward-compatibility note added if behavior changes

## Test Checklist
- [x] Contract tests cover allowed extension and disallowed non-`x_` field
- [x] `npm test` passes

## Acceptance Criteria
- [x] One unambiguous extension strategy across spec/contract/code/tests
