# Deferred Web Parity Checklist

This checklist applies when web interface work begins.

## Lifecycle parity
- [ ] Web create maps to same issue metadata contract as CLI create.
- [ ] Web edit updates `updated_at` with same UTC `Z` semantics.
- [ ] Web close/reopen obey same transition rules and error codes.

## Validation parity
- [ ] Web rejects unknown top-level metadata keys unless prefixed `x_`.
- [ ] Web enforces path/id mismatch detection behavior.
- [ ] Web list returns valid records and malformed file warnings without fail-fast behavior.

## Contract parity
- [ ] Web/API output aligns with `issue-api.openapi.yaml` schemas.
- [ ] Web validation output includes actionable field-level diagnostics.
