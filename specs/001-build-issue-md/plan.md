# Implementation Plan: Issue.md MVP

**Branch**: `001-build-issue-md` | **Date**: 2026-02-21 | **Spec**: `/specs/001-build-issue-md/spec.md`
**Input**: Feature specification from `/specs/001-build-issue-md/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a filesystem-native issue tracker where issues/comments are Markdown files with strict YAML
front matter contracts, delivered as a Node.js + TypeScript CLI MVP. Implementation uses
deterministic serialization, strict schema validation (including `x_` extension policy and UTC `Z`
timestamps), optimistic sequential ID allocation with explicit collision errors, and best-effort
listing that returns valid items while reporting malformed files.

## Technical Context

**Language/Version**: Node.js 22 LTS, TypeScript 5.x  
**Primary Dependencies**: Commander, gray-matter, Ajv, js-yaml (serialization helper), Vitest  
**Storage**: Local filesystem (`issues/`, `comments/`, optional `.issue-cache/` as non-canonical)  
**Testing**: Vitest (unit, integration, contract)  
**Target Platform**: Local developer environments on macOS/Linux/Windows running Node.js
**Project Type**: Single project (CLI-first, web deferred)  
**Performance Goals**: `issue list` and `issue show` complete in <2s for ~1,000 issues on typical local hardware  
**Constraints**: Deterministic writes, YAML front matter contract, UTC `Z` timestamps, explicit ID conflict behavior, no external DB in MVP  
**Scale/Scope**: Single-repo MVP, up to low-thousands of issues/comments with local concurrent edits

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **File-system native**: The design stores issues as repository files and keeps generated artifacts
  non-canonical.
- **Human + machine format**: The issue format is Markdown with deterministic front matter parsing
  rules.
- **Metadata contract stability**: Schema changes are classified (breaking/non-breaking) and include
  migration guidance.
- **Interface parity**: If CLI and web are both in scope, parity of core operations is specified.
- **Automation coverage**: Plan includes unit/integration validation for parsing, schema, and lifecycle.

Initial gate assessment (pre-Phase 0):
- File-system native: PASS
- Human + machine format: PASS
- Metadata contract stability: PASS
- Interface parity: PASS (web explicitly out of MVP scope but parity requirement retained)
- Automation coverage: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-build-issue-md/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
src/
├── cli/
│   ├── commands/
│   └── index.ts
├── application/
│   ├── use-cases/
│   └── dto/
├── domain/
│   ├── issue/
│   ├── comment/
│   └── schema/
├── infrastructure/
│   ├── fs/
│   ├── markdown/
│   └── validation/
└── shared/
  ├── errors/
  └── time/

tests/
├── unit/
├── integration/
└── contract/
```

**Structure Decision**: Single-project TypeScript CLI architecture with layered boundaries to
preserve deterministic domain behavior and allow future web parity reuse.

## Phase 0 Output

Research findings documented in `/specs/001-build-issue-md/research.md`.

## Phase 1 Design Output

- Data model: `/specs/001-build-issue-md/data-model.md`
- Contracts: `/specs/001-build-issue-md/contracts/issue-api.openapi.yaml`
- Quickstart: `/specs/001-build-issue-md/quickstart.md`

Post-design constitution re-check:
- File-system native: PASS
- Human + machine format: PASS
- Metadata contract stability: PASS
- Interface parity: PASS
- Automation coverage: PASS

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations identified.
