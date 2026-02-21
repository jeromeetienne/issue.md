# Tasks: Issue.md MVP

**Input**: Design documents from `/specs/001-build-issue-md/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included because automation coverage is a constitution gate and plan requirement.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Node.js + TypeScript project and baseline tooling.

- [X] T001 Initialize Node.js + TypeScript project configuration in package.json
- [X] T002 Create source and test directory scaffolding in src/.gitkeep
- [X] T003 [P] Configure TypeScript compiler options in tsconfig.json
- [X] T004 [P] Configure linting and formatting in .eslintrc.cjs
- [X] T005 [P] Configure Vitest test runner and scripts in vitest.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user stories.

- [X] T006 Define domain types and enums for issues/comments in src/domain/schema/types.ts
- [X] T007 [P] Define issue and comment JSON schemas in src/domain/schema/document-schemas.ts
- [X] T008 [P] Implement schema validator with `x_` extension policy and UTC `Z` timestamp checks in src/infrastructure/validation/schema-validator.ts
- [X] T009 [P] Implement markdown front matter parser/serializer in src/infrastructure/markdown/document-codec.ts
- [X] T010 Implement deterministic atomic file writes in src/infrastructure/fs/atomic-write.ts
- [X] T011 Implement sequential ID allocator with explicit conflict errors in src/infrastructure/fs/id-allocator.ts
- [X] T012 Implement filesystem document discovery and stable sorting in src/infrastructure/fs/document-scanner.ts
- [X] T013 Implement shared typed errors and exit-code mapping in src/shared/errors/errors.ts
- [X] T014 Wire CLI bootstrap and root command registration in src/cli/index.ts

**Checkpoint**: Foundation ready; user story work can begin.

---

## Phase 3: User Story 1 - Manage Issues from CLI (Priority: P1) 🎯 MVP

**Goal**: Users can create, list, show, edit, close, and reopen issues with deterministic file behavior.

**Independent Test**: Create and manage issues in an empty repository, including ID collision and malformed-file list reporting.

### Tests for User Story 1

- [X] T015 [P] [US1] Add issue schema and list-warning contract tests in tests/contract/issue-schema.contract.test.ts
- [X] T016 [P] [US1] Add CLI lifecycle integration tests for create/list/show/edit/close/reopen in tests/integration/issue-cli.lifecycle.test.ts
- [X] T017 [P] [US1] Add concurrent create conflict integration test in tests/integration/issue-cli.conflict.test.ts

### Implementation for User Story 1

- [X] T018 [P] [US1] Implement issue aggregate and lifecycle transition rules in src/domain/issue/issue.ts
- [X] T019 [P] [US1] Implement issue repository for canonical issue file paths in src/infrastructure/fs/issue-repository.ts
- [X] T020 [US1] Implement create-issue use case in src/application/use-cases/issue/create-issue.ts
- [X] T021 [US1] Implement list-issues use case with malformed-file warnings in src/application/use-cases/issue/list-issues.ts
- [X] T022 [US1] Implement show/edit issue use cases in src/application/use-cases/issue/get-update-issue.ts
- [X] T023 [US1] Implement close/reopen issue use cases in src/application/use-cases/issue/change-issue-status.ts
- [X] T024 [US1] Implement issue CLI commands (`create`, `list`, `show`, `edit`, `close`, `reopen`) in src/cli/commands/issue/index.ts

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Add and Read Issue Comments (Priority: P2)

**Goal**: Users can add and list comments stored separately per issue with required metadata.

**Independent Test**: Add multiple comments to an existing issue and verify ordering and contract validity.

### Tests for User Story 2

- [X] T025 [P] [US2] Add comment schema contract tests in tests/contract/comment-schema.contract.test.ts
- [X] T026 [P] [US2] Add add/list comments integration tests in tests/integration/comment-cli.flow.test.ts

### Implementation for User Story 2

- [X] T027 [P] [US2] Implement comment domain model and invariants in src/domain/comment/comment.ts
- [X] T028 [P] [US2] Implement comment repository and sequential comment ID allocation in src/infrastructure/fs/comment-repository.ts
- [X] T029 [US2] Implement add/list comment use cases in src/application/use-cases/comment/add-list-comments.ts
- [X] T030 [US2] Implement comment CLI commands in src/cli/commands/comment/index.ts
- [X] T031 [US2] Integrate comment command group into root CLI in src/cli/index.ts

**Checkpoint**: User Stories 1 and 2 are independently functional.

---

## Phase 5: User Story 3 - Enforce Format and Compatibility Rules (Priority: P3)

**Goal**: Users can validate repository documents and enforce compatibility policy for schema changes.

**Independent Test**: Validate mixed valid/invalid fixtures and verify deterministic errors and compatibility policy output.

### Tests for User Story 3

- [X] T032 [P] [US3] Add compatibility classification contract tests in tests/contract/schema-compatibility.contract.test.ts
- [X] T033 [P] [US3] Add repository validation integration tests in tests/integration/validate-cli.behavior.test.ts

### Implementation for User Story 3

- [X] T034 [P] [US3] Implement schema change compatibility classifier in src/domain/schema/compatibility.ts
- [X] T035 [US3] Implement migration-guidance policy checks in src/domain/schema/change-policy.ts
- [X] T036 [US3] Implement repository validation use case in src/application/use-cases/schema/validate-repository.ts
- [X] T037 [US3] Implement `issue validate` CLI command and diagnostics output in src/cli/commands/issue/validate.ts

**Checkpoint**: All user stories are independently functional and verifiable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass across stories.

- [X] T038 [P] Add deterministic serialization regression tests in tests/unit/markdown/serializer.test.ts
- [X] T039 [P] Add list performance sanity test for ~1000 issues in tests/integration/issue-cli.performance.test.ts
- [X] T040 [P] Add non-canonical artifact policy checks ensuring caches/indexes never become source of truth in tests/integration/noncanonical-artifacts.policy.test.ts
- [X] T041 [P] Add timed usability/integration trial for SC-001 in tests/integration/issue-cli.usability-timing.test.ts
- [X] T042 [P] Add deferred web parity checklist (lifecycle + validation parity gates) in specs/001-build-issue-md/contracts/web-parity-checklist.md
- [X] T043 [P] Finalize operator quickstart steps and expected outputs in specs/001-build-issue-md/quickstart.md
- [X] T044 Document schema contract and `x_` extension conventions in docs/APP_GOALS.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1; blocks all user stories.
- **User Stories (Phase 3-5)**: Depend on Phase 2 completion.
- **Polish (Phase 6)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no dependency on other stories.
- **US2 (P2)**: Starts after Phase 2; independently testable using fixture issue files even when implemented after US1 by priority.
- **US3 (P3)**: Starts after Phase 2; can validate fixtures independently but should run after US1 for full end-to-end behavior.

### Within Each User Story

- Tests are authored before implementation and should fail before coding.
- Domain/infrastructure before use-cases.
- Use-cases before CLI command wiring.

## Parallel Execution Examples

### User Story 1

```bash
# Parallel test authoring
T015, T016, T017

# Parallel core model/repository work
T018, T019
```

### User Story 2

```bash
# Parallel test authoring
T025, T026

# Parallel domain/repository work
T027, T028
```

### User Story 3

```bash
# Parallel test authoring
T032, T033

# Parallel compatibility core pieces
T034, T035
```

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate independently.
3. Demo CLI issue lifecycle before adding comments/validation extras.

### Incremental Delivery

1. Add US2 comment capabilities and validate independently.
2. Add US3 validation/compatibility enforcement.
3. Finish with Phase 6 polish and quickstart verification.
