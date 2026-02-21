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
- [ ] Choose single extension model (recommended: top-level `x_*`)
- [ ] Update OpenAPI schema definitions to match chosen model
- [ ] Update contract tests to enforce chosen model

### Explicitly out of scope
- [ ] No unrelated lifecycle changes
- [ ] No docs onboarding rewrite (PR-10)

## Files Touched
- [ ] specs/001-build-issue-md/contracts/issue-api.openapi.yaml
- [ ] src/domain/schema/document-schemas.ts (if needed)
- [ ] tests/contract/issue-schema.contract.test.ts
- [ ] tests/contract/comment-schema.contract.test.ts

## Requirements Mapping
- [ ] FR-015
- [ ] Contract parity for Issue/Comment/Create/Update payloads

## Implementation Checklist
- [ ] Contract and runtime validation are semantically consistent
- [ ] Backward-compatibility note added if behavior changes

## Test Checklist
- [ ] Contract tests cover allowed extension and disallowed non-`x_` field
- [ ] `npm test` passes

## Acceptance Criteria
- [ ] One unambiguous extension strategy across spec/contract/code/tests
