# Tasks: Website Docs GitHub Pages Publishing

**Input**: Design documents from `/specs/002-github-pages-publishing/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit TDD/test-first requirement was requested in the feature spec, so test-file tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish shared project scaffolding for Pages publishing work.

- [X] T001 Create GitHub Pages workflow file scaffold in .github/workflows/website-docs-pages.yml
- [X] T002 Add Pages-oriented npm scripts (`build:pages`, `verify:pages`) in contribs/website_docs/package.json
- [X] T003 [P] Create static route/asset verification script scaffold in contribs/website_docs/scripts/verify-pages-routes.mjs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core publishing prerequisites that MUST be complete before any user story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Configure static export mode and repository path variables in contribs/website_docs/next.config.ts
- [X] T005 Implement workflow build job (checkout, node setup, install, export build) in .github/workflows/website-docs-pages.yml
- [X] T006 Implement workflow artifact upload and Pages deploy jobs with required permissions in .github/workflows/website-docs-pages.yml
- [X] T007 Implement route HTML assertions for `/`, `/docs`, and `/demo` in contribs/website_docs/scripts/verify-pages-routes.mjs
- [X] T008 Wire verification script execution into `build:pages` command in contribs/website_docs/package.json
- [X] T009 Document foundational environment assumptions for Pages publishing in contribs/website_docs/README.md

**Checkpoint**: Foundation ready; user story implementation can now begin.

---

## Phase 3: User Story 1 - Automatic public publishing (Priority: P1) 🎯 MVP

**Goal**: Publish `contribs/website_docs` automatically to GitHub Pages from default-branch updates.

**Independent Test**: Merge a docs change into default branch and confirm workflow deploys the updated site URL without manual artifact handling.

### Implementation for User Story 1

- [X] T010 [US1] Configure workflow triggers for default-branch push and manual dispatch with website/path filters in .github/workflows/website-docs-pages.yml
- [X] T011 [US1] Set website build working directory and deploy artifact path (`contribs/website_docs/out`) in .github/workflows/website-docs-pages.yml
- [X] T012 [US1] Add deployment environment URL output and run summary details in .github/workflows/website-docs-pages.yml
- [X] T013 [P] [US1] Add operator verification steps for workflow success/failure in specs/002-github-pages-publishing/quickstart.md
- [X] T014 [US1] Add deployed-versus-triggering commit SHA freshness assertion in .github/workflows/website-docs-pages.yml

**Checkpoint**: User Story 1 is independently functional and deployable.

---

## Phase 4: User Story 2 - Repository-path compatible site links (Priority: P2)

**Goal**: Ensure routes and static assets render correctly from the GitHub Pages repository path.

**Independent Test**: Open published `/`, `/docs`, and `/demo` pages and confirm no missing route or core asset failures.

### Implementation for User Story 2

- [X] T015 [US2] Configure repository-scoped `basePath` and `assetPrefix` behavior in contribs/website_docs/next.config.ts
- [X] T016 [P] [US2] Confirm public route contract for `/`, `/docs`, `/demo` in specs/002-github-pages-publishing/contracts/pages-site.openapi.yaml
- [X] T017 [US2] Update header/documentation links for repository-path-safe navigation assumptions in contribs/website_docs/app/layout.tsx
- [X] T018 [US2] Add CSS/icon/static asset existence checks to publish verifier in contribs/website_docs/scripts/verify-pages-routes.mjs
- [X] T019 [P] [US2] Document route and asset verification command usage in contribs/website_docs/README.md

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Simple maintainer workflow (Priority: P3)

**Goal**: Give maintainers concise setup, verification, and troubleshooting instructions for ongoing Pages publishing.

**Independent Test**: A maintainer follows repository docs to enable Pages once, trigger publishing, and triage a failed run.

### Implementation for User Story 3

- [X] T020 [US3] Add one-time GitHub Pages enablement instructions in contribs/website_docs/README.md
- [X] T021 [US3] Add deployment status checks and rerun steps in contribs/website_docs/README.md
- [X] T022 [US3] Add troubleshooting guidance for disabled Pages, permission errors, and path-based 404s in contribs/website_docs/README.md
- [X] T023 [P] [US3] Align maintainer quickstart with final operational workflow in specs/002-github-pages-publishing/quickstart.md

**Checkpoint**: All user stories are independently functional and operationally documented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency pass across workflow, docs, and feature artifacts.

- [X] T024 [P] Reconcile final branch/path/URL terminology across spec and plan in specs/002-github-pages-publishing/spec.md and specs/002-github-pages-publishing/plan.md
- [X] T025 [P] Execute quickstart validation pass and record expected outcomes (including SC measurement windows) in specs/002-github-pages-publishing/quickstart.md
- [X] T026 Finalize maintainer publishing section and public URL references in contribs/website_docs/README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phase 3-5)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no dependency on other stories.
- **US2 (P2)**: Starts after Phase 2; depends on US1 deployment baseline for published-path verification.
- **US3 (P3)**: Starts after Phase 2; can proceed in parallel with US2 but should consume finalized workflow behavior from US1.

### Dependency Graph

- **US1 → US2** (route/asset verification depends on active publishing pipeline)
- **US1 → US3** (operations runbook depends on actual workflow behavior)
- **US2 ↔ US3** (independent after US1; can run in parallel)

### Within Each User Story

- Implement foundational story mechanism first (workflow/config), then docs/runbook updates.
- Keep changes scoped to listed files for independent review and rollback.
- Validate each story independently against its stated test criteria before moving on.

## Parallel Opportunities

- Phase 1 parallelizable task: `T003`
- Phase 2 parallelizable tasks after workflow scaffold exists: `T007` and `T009`
- Phase 6 parallelizable tasks: `T024` and `T025`

### Parallel Example: User Story 1

```bash
# Parallelizable documentation vs workflow completion for US1
Task: "T012 [US1] Add deployment environment URL output and run summary details in .github/workflows/website-docs-pages.yml"
Task: "T013 [P] [US1] Add operator verification steps for workflow success/failure in specs/002-github-pages-publishing/quickstart.md"
```

### Parallel Example: User Story 2

```bash
# Parallelizable contract/docs updates while core path config is being finalized
Task: "T016 [P] [US2] Confirm public route contract for `/`, `/docs`, `/demo` in specs/002-github-pages-publishing/contracts/pages-site.openapi.yaml"
Task: "T019 [P] [US2] Document route and asset verification command usage in contribs/website_docs/README.md"
```

### Parallel Example: User Story 3

```bash
# Parallelizable quickstart alignment while README runbook is authored
Task: "T021 [US3] Add deployment status checks and rerun steps in contribs/website_docs/README.md"
Task: "T023 [P] [US3] Align maintainer quickstart with final operational workflow in specs/002-github-pages-publishing/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate automatic Pages deployment from default branch.
4. Demo/publish MVP.

### Incremental Delivery

1. Deliver US1 to establish reliable publishing.
2. Add US2 to guarantee route/asset correctness for public users.
3. Add US3 to reduce maintainer operational friction.
4. Apply Phase 6 polish for consistency and handoff quality.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. After US1 baseline is stable:
   - Engineer A: US2 path/asset compatibility
   - Engineer B: US3 maintainers’ runbook and quickstart
3. Merge with final polish tasks.
