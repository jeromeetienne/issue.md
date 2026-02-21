# Quickstart — Issue.md MVP (Node.js + TypeScript)

## Prerequisites
- Node.js 22 LTS
- npm 10+

## 1) Install dependencies
```bash
npm install
```

## 2) Build
```bash
npm run build
```

## 3) Run tests
```bash
npm test
```

## 4) Initialize local issue directories
```bash
mkdir -p issues comments
```

## 5) CLI MVP workflows

### Create issue
```bash
npm run cli -- issue create --title "First issue" --author "alice" --body "Initial body"
```
Expected:
- Creates `issues/0001-first-issue.md`
- Front matter includes `id`, `title`, `status=open`, `created_at`, `updated_at`, `author`

### List issues
```bash
npm run cli -- issue list
```
Expected:
- Returns valid issues sorted by id
- Reports malformed files as warnings/errors without hiding valid records
- Uses issue files (not `.issue-cache`) as canonical source of truth

### Show issue
```bash
npm run cli -- issue show 0001
```

### Edit issue
```bash
npm run cli -- issue edit 0001 --title "Renamed issue" --body "Updated body"
```
Expected:
- `updated_at` changes and file remains canonical/deterministic

### Close and reopen
```bash
npm run cli -- issue close 0001
npm run cli -- issue reopen 0001
```

### Add and list comments
```bash
npm run cli -- issue comment add 0001 --author "bob" --body "Looks good"
npm run cli -- issue comment list 0001
```
Expected:
- Creates `comments/0001/0001.md` with required comment front matter

## 6) Validate repository documents
```bash
npm run cli -- issue validate
```
Expected:
- Fails for required field/path/timestamp/schema violations
- Rejects unknown top-level metadata keys unless prefixed `x_`
- Includes path mismatch diagnostics when filename id and front matter id differ

## 7) Concurrency behavior check
Run two `issue create` commands nearly simultaneously.
Expected:
- One succeeds
- One fails with `ID_CONFLICT` and retry guidance

## 8) Performance sanity check
With ~1,000 issues present:
```bash
time npm run cli -- issue list > /tmp/issues.json
```
Target:
- Typical local run completes in under 2 seconds.
