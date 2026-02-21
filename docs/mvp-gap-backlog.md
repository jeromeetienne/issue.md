# MVP Gap Backlog (Ordered PR Slices)

Generated: 2026-02-21
Scope: Missing implementation against Speckit artifacts (`spec.md`, `tasks.md`, `issue-api.openapi.yaml`)

## How to use

- Execute PRs in order (`PR-01` → `PR-10`)
- Keep each PR focused to the listed files and acceptance checks
- Avoid bundling unrelated refactors

---

## PR-01 — Add `in_progress` command path (High)

**Gap**
- CLI cannot move an issue to `in_progress`, blocking full lifecycle (`open → in_progress → closed → open`).

**Files to change (smallest set)**
- `src/cli/commands/issue/index.ts`
- `src/application/use-cases/issue/change-issue-status.ts`
- `tests/integration/issue-cli.lifecycle.test.ts`

**Minimal implementation**
- Add `startIssue(rootDir, id)` helper that sets status to `in_progress` through existing transition checks.
- Add CLI command `issue start <id>`.
- Extend lifecycle integration test to include `startIssue` before close.

**Acceptance checks**
- Status changes to `in_progress` via CLI/use-case.
- Existing transition guard remains active.

---

## PR-02 — Support `--status` in issue edit/update (High)

**Gap**
- Contract `UpdateIssueRequest` allows `status`, but implementation only accepts `title/body`.

**Files to change (smallest set)**
- `src/application/use-cases/issue/get-update-issue.ts`
- `src/cli/commands/issue/index.ts`
- `tests/integration/issue-cli.lifecycle.test.ts` (or dedicated new integration test)

**Minimal implementation**
- Extend patch type to include optional `status`.
- Validate transition when `status` is provided.
- Add CLI option `--status <open|in_progress|closed>` to `issue edit`.

**Acceptance checks**
- `issue edit <id> --status in_progress` works from `open`.
- Invalid transitions return `VALIDATION_ERROR`.

---

## PR-03 — Enforce canonical filename after title edit (High)

**Gap**
- Title edits do not rename file to `<id>-<kebab-case-title>.md`.

**Files to change (smallest set)**
- `src/infrastructure/fs/issue-repository.ts`
- `src/application/use-cases/issue/get-update-issue.ts` (only if needed for signal)
- `tests/integration/issue-cli.lifecycle.test.ts`

**Minimal implementation**
- During update, if title slug changes, compute target path and rename atomically.
- Keep conflict-safe behavior if target file already exists.

**Acceptance checks**
- Renamed title results in renamed issue file.
- Content and metadata still valid after rename.

---

## PR-04 — Validate comment documents in repository validation (Medium)

**Gap**
- `issue validate` currently validates issues only.

**Files to change (smallest set)**
- `src/application/use-cases/schema/validate-repository.ts`
- `src/infrastructure/fs/comment-repository.ts` (or shared scanner/validator helper)
- `tests/integration/validate-cli.behavior.test.ts`

**Minimal implementation**
- Scan `comments/<issue-id>/*.md` and validate required comment front matter.
- Include comment validation warnings in validate report.

**Acceptance checks**
- Malformed comment file makes validate fail with actionable warning/error.
- Valid comments pass without affecting issue counts.

---

## PR-05 — Emit `PARSE_ERROR` distinctly (Medium)

**Gap**
- Contract includes `PARSE_ERROR`, but implementation currently collapses failures into `SCHEMA_ERROR`.

**Files to change (smallest set)**
- `src/infrastructure/fs/issue-repository.ts`
- `tests/integration/validate-cli.behavior.test.ts` (or new warning-code focused test)

**Minimal implementation**
- Differentiate parser/front-matter failures from schema failures.
- Emit warning code `PARSE_ERROR` for parse failures, `SCHEMA_ERROR` for validation failures.

**Acceptance checks**
- Invalid YAML/front-matter returns `PARSE_ERROR`.
- Missing required field returns `SCHEMA_ERROR`.

---

## PR-06 — Add true concurrent ID collision test (Medium)

**Gap**
- Existing conflict test checks sequential uniqueness, not real concurrency race.

**Files to change (smallest set)**
- `tests/integration/issue-cli.conflict.test.ts`

**Minimal implementation**
- Fire two create operations concurrently (`Promise.allSettled`).
- Assert one success, one `ID_CONFLICT` with retry guidance.

**Acceptance checks**
- Deterministic conflict semantics under race are verified.

---

## PR-07 — Add real CLI process smoke test (Medium)

**Gap**
- Current integration tests call use-cases directly, not command process surface.

**Files to change (smallest set)**
- `tests/integration/helpers.ts`
- `tests/integration/issue-cli.lifecycle.test.ts` (or add `issue-cli.process.test.ts`)

**Minimal implementation**
- Add helper to spawn built CLI process and capture stdout/stderr/exit code.
- Add one smoke flow: create → list → show.

**Acceptance checks**
- Commands execute through CLI binary path, not direct imports.

---

## PR-08 — Validate CLI exit behavior for `issue validate` (Medium)

**Gap**
- No process-level assertion for validate command exit code and diagnostics.

**Files to change (smallest set)**
- `tests/integration/validate-cli.behavior.test.ts` (or add `validate-cli.process.test.ts`)
- `tests/integration/helpers.ts` (if shared spawn helper is reused)

**Minimal implementation**
- Execute `issue validate` through CLI against malformed fixture.
- Assert non-zero exit (`2`) and warning payload structure.

**Acceptance checks**
- Passing repo exits 0, failing repo exits 2.

---

## PR-09 — Align extension-field model (Medium)

**Gap**
- Contract models nested `extensions`; implementation enforces top-level `x_*` keys.

**Files to change (smallest set)**
- `specs/001-build-issue-md/contracts/issue-api.openapi.yaml`
- `src/domain/schema/document-schemas.ts` (only if choosing nested model)
- `tests/contract/issue-schema.contract.test.ts`
- `tests/contract/comment-schema.contract.test.ts`

**Minimal implementation (recommended)**
- Keep top-level `x_*` (as required by spec FR-015) and update OpenAPI to match.
- Add/adjust contract tests for chosen model.

**Acceptance checks**
- One unambiguous extension strategy across spec/contract/code/tests.

---

## PR-10 — Fix docs command drift and operator onboarding (Low)

**Gap**
- Quickstart uses wrong command prefix for comments; README lacks runnable MVP flows.

**Files to change (smallest set)**
- `specs/001-build-issue-md/quickstart.md`
- `README.md`

**Minimal implementation**
- Replace `issue comment add/list` with `comment add/list` in quickstart.
- Add concise README command matrix: create/list/show/edit/close/reopen/comment/validate.

**Acceptance checks**
- A first-time user can run all core commands from docs without correction.

---

## Suggested sequencing constraints

- Merge `PR-01` before `PR-02` (both touch lifecycle behavior).
- Merge `PR-07` before `PR-08` if sharing CLI spawn test helper.
- Merge `PR-09` before broader API/web parity work.

## Definition of done for this backlog

- All 10 PRs merged in order
- `npm test` fully green
- `issue validate` covers issues + comments with correct warning codes
- CLI lifecycle supports the full state path including `in_progress`
- Docs match actual command surface
