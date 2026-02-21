# PR-10 Checklist — Fix docs command drift and onboarding

## PR Metadata
- PR ID: PR-10
- Title: Correct quickstart command paths and complete README MVP usage
- Backlog item: ../mvp-gap-backlog.md (PR-10)
- Priority: Low
- Owner:
- Reviewer(s):

## Scope
### Included changes
- [x] Fix quickstart comment commands to top-level `comment`
- [x] Add concise README command matrix for MVP flows
- [x] Document validate behavior and conflict retry guidance

### Explicitly out of scope
- [ ] No source code behavior changes
- [ ] No schema/contract updates

## Files Touched
- [x] specs/001-build-issue-md/quickstart.md
- [x] README.md

## Requirements Mapping
- [x] Usability support for SC-001
- [x] Documentation correctness for CLI surface

## Implementation Checklist
- [x] All command examples match actual CLI names/options
- [x] Examples are runnable and minimal

## Test Checklist
- [x] Manual doc command spot-check performed
- [x] `npm test` still passes

## Acceptance Criteria
- [x] First-time user can execute core flows directly from docs without correction
