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
- [ ] Fix quickstart comment commands to top-level `comment`
- [ ] Add concise README command matrix for MVP flows
- [ ] Document validate behavior and conflict retry guidance

### Explicitly out of scope
- [ ] No source code behavior changes
- [ ] No schema/contract updates

## Files Touched
- [ ] specs/001-build-issue-md/quickstart.md
- [ ] README.md

## Requirements Mapping
- [ ] Usability support for SC-001
- [ ] Documentation correctness for CLI surface

## Implementation Checklist
- [ ] All command examples match actual CLI names/options
- [ ] Examples are runnable and minimal

## Test Checklist
- [ ] Manual doc command spot-check performed
- [ ] `npm test` still passes

## Acceptance Criteria
- [ ] First-time user can execute core flows directly from docs without correction
