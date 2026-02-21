# Phase 0 Research — Issue.md MVP

## Decision 1: Runtime and language stack

### Decision
Use **Node.js 22 LTS + TypeScript 5.x** for a single-project CLI-first implementation.

### Rationale
- Matches user direction for Node.js + TypeScript.
- Strong filesystem APIs and mature Markdown/front matter ecosystem.
- Fast iteration and broad contributor familiarity.

### Alternatives considered
- **Python**: strong scripting ergonomics, but diverges from requested stack.
- **Go/Rust**: strong binaries/performance, but higher setup and iteration cost for MVP.

---

## Decision 2: CLI framework and layering

### Decision
Use **Commander** for command routing with a layered architecture:
- `src/cli` for command definitions and argument parsing
- `src/application` for use cases
- `src/domain` for issue/comment rules
- `src/infrastructure` for filesystem + serialization

### Rationale
- Keeps CLI UX concerns separate from business rules.
- Improves testability and future web parity.
- Commander is lightweight and stable for subcommand CLIs.

### Alternatives considered
- **oclif**: powerful plugin model but heavier than needed for MVP.
- **yargs**: flexible but less structured command composition for this use case.

---

## Decision 3: Markdown parsing and schema validation

### Decision
Use **gray-matter** for front matter extraction and **Ajv (JSON Schema)** for validation.
Validation policy:
- Required keys enforced per schema.
- Unknown top-level keys rejected unless prefixed `x_`.
- Timestamps enforced as ISO 8601 UTC datetime with `Z` suffix.

### Rationale
- Separates parse and validation concerns cleanly.
- JSON Schema supports strict additional property constraints and pattern-based allowances.
- Deterministic and machine-friendly validation output.

### Alternatives considered
- **Zod-only validation**: excellent DX, but stricter unknown-key + prefix policy is less declarative.
- **remark-frontmatter pipeline**: useful for AST-heavy markdown workflows, unnecessary for MVP.

---

## Decision 4: Sequential ID allocation under concurrency

### Decision
Use optimistic allocation with **atomic exclusive create**:
1. Compute candidate id as `max(existing) + 1`.
2. Attempt file creation with exclusive semantics (`wx`).
3. If collision occurs (`EEXIST`), return deterministic `ID_CONFLICT` and require retry.

### Rationale
- Directly matches clarified requirement: no silent renumber.
- Keeps behavior predictable in Git-based workflows.
- Avoids lock-file portability and stale-lock complexity.

### Alternatives considered
- **Global lock file**: reduces collisions but introduces lock lifecycle complexity.
- **Automatic renumber retry**: non-compliant with explicit conflict behavior.

---

## Decision 5: Deterministic writing and durability

### Decision
Use canonical serialization with atomic replace:
- Stable front matter key ordering
- UTF-8 with `\n` line endings and trailing newline
- Write temp file in same directory, then atomic rename

### Rationale
- Minimizes noisy diffs for semantically equivalent updates.
- Prevents partial writes on interruption.
- Produces reproducible content for tests and automation.

### Alternatives considered
- **Direct overwrite**: simpler but riskier for partial writes.
- **Partial patching**: more complex and harder to keep deterministic.

---

## Decision 6: Malformed file handling in list operations

### Decision
`issue list` returns valid issues and emits structured warnings/errors for malformed files.

### Rationale
- Matches clarified requirement for operational resilience.
- Preserves visibility into good data while surfacing bad records.

### Alternatives considered
- **Fail-fast list**: blocks valid output due to one malformed file.
- **Silent skip**: hides integrity problems.

---

## Decision 7: Testing strategy

### Decision
Use **Vitest** with:
- Unit tests for parser/serializer/validators
- Integration tests for lifecycle and filesystem behavior
- Contract tests for schema compliance and compatibility classification

### Rationale
- Fast TypeScript-native test runner.
- Aligns with constitution requirement for automation-first validation.

### Alternatives considered
- **Jest**: mature but slower startup and less lightweight for this scope.
- **Node built-in test runner only**: fewer ergonomics for snapshot/contract patterns.
