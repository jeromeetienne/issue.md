<!--
Sync Impact Report
- Version change: template-unset → 1.0.0
- Modified principles:
	- Principle 1 placeholder → I. File-System Native Issues
	- Principle 2 placeholder → II. Human-Readable, Machine-Parseable Format
	- Principle 3 placeholder → III. Stable Metadata Contract
	- Principle 4 placeholder → IV. Interface Parity (CLI and Web)
	- Principle 5 placeholder → V. Automation and Validation First
- Added sections:
	- Section 2 placeholder → Data and Repository Constraints
	- Section 3 placeholder → Delivery Workflow and Quality Gates
- Removed sections: None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present)
- Deferred items:
	- TODO(RATIFICATION_DATE): original ratification date is not available in repository history.
-->

# Issue.md Constitution

## Core Principles

### I. File-System Native Issues
Issues MUST be stored as files in a repository-managed directory structure, not as opaque
records in an external system. Each issue MUST remain portable through normal file operations
(copy, diff, merge, backup) and MUST be addressable by stable paths.
Rationale: the product goal is local-first issue management compatible with Git workflows.

### II. Human-Readable, Machine-Parseable Format
Every issue document MUST be valid Markdown with structured front matter that can be parsed
deterministically by automation. The body MUST remain directly editable by humans without
special tooling, and parsing rules MUST be documented and testable.
Rationale: the format must support both manual authoring and reliable automation.

### III. Stable Metadata Contract
Issue metadata keys, required fields, and allowed value types MUST be versioned as a public
contract. Contract changes MUST include migration guidance and backward-compatibility policy.
Any breaking schema change MUST be accompanied by validation and upgrade tooling.
Rationale: stable contracts prevent data drift and preserve long-term repository integrity.

### IV. Interface Parity (CLI and Web)
If both CLI and web interfaces exist, they MUST implement the same core issue operations and
honor the same validation rules and state transitions. Behavior differences MUST be treated as
defects unless explicitly documented as intentional constraints.
Rationale: users must be able to switch interfaces without data loss or semantic mismatch.

### V. Automation and Validation First
Parsing, validation, and issue lifecycle operations MUST be covered by automated tests at unit
and integration levels before release. CI MUST fail on schema-invalid fixtures and contract
regressions. Manual-only verification is insufficient for merge approval.
Rationale: automation is required to maintain correctness as tooling and schema evolve.

## Data and Repository Constraints

- Canonical issue files MUST include front matter for identity, status, timestamps, and
	authorship fields required by the schema contract.
- Timestamps MUST use ISO 8601 date or datetime formats; identifiers MUST be unique within the
	repository.
- File writes MUST be deterministic to minimize unnecessary diffs (stable field order and line
	ending policy).
- Any generated artifacts (indexes, caches, exports) MUST be reproducible and MUST NOT be the
	source of truth.

## Delivery Workflow and Quality Gates

- Feature specs MUST define issue lifecycle changes, metadata impacts, and compatibility plan.
- Implementation plans MUST include explicit constitution checks for parseability, contract
	versioning, interface parity, and automated validation coverage.
- Task breakdowns MUST include schema-validation tasks and contract/integration test tasks when
	issue behavior changes.
- Pull requests MUST include evidence of tests covering parsing and lifecycle operations.

## Governance

This constitution overrides conflicting project conventions for issue format, lifecycle, and
tooling behavior.

Amendment procedure:
1. Propose a change with rationale, migration impact, and affected principles/sections.
2. Review proposal with maintainers and document approval in repository history.
3. Update dependent templates and guidance docs in the same change set.

Versioning policy (semantic versioning):
- MAJOR: remove or redefine principles/governance in a backward-incompatible way.
- MINOR: add a principle/section or materially expand mandatory guidance.
- PATCH: clarifications, wording, or non-semantic edits.

Compliance review expectations:
- Every plan and PR MUST include a constitution compliance check.
- Reviewers MUST block changes that violate mandatory rules without approved amendment.

**Version**: 1.0.0 | **Ratified**: 2026-02-21 | **Last Amended**: 2026-02-21
