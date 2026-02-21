# issue.md

## Summary
A simple, file-based issue tracking system using Markdown files with YAML front matter for metadata. Each issue is stored as a separate file in a designated directory, with support for comments stored in subdirectories. The system is designed for simplicity, ease of use, and integration with version control workflows.

### Target Audience
- Solo developer who want to keep track of their work without switching contexts (vscode, github, etc.)

## Quick Start

### Initialize and build
```bash
npm install
npm run build
mkdir -p issues comments
```

### MVP Command Reference

| Operation | Command |
|-----------|---------|
| **Create issue** | `npm run cli -- issue create --title "Title" --author "alice" --body "Body"` |
| **List issues** | `npm run cli -- issue list` |
| **Show issue** | `npm run cli -- issue show 0001` |
| **Edit issue** | `npm run cli -- issue edit 0001 --title "New title" --body "New body"` |
| **Change status** | `npm run cli -- issue edit 0001 --status in_progress` |
| **Start work** (shorthand) | `npm run cli -- issue start 0001` |
| **Close issue** | `npm run cli -- issue close 0001` |
| **Reopen issue** | `npm run cli -- issue reopen 0001` |
| **Add comment** | `npm run cli -- comment add 0001 --author "bob" --body "Comment text"` |
| **List comments** | `npm run cli -- comment list 0001` |
| **Validate repo** | `npm run cli -- issue validate` |

### Concurrency Behavior
If two `issue create` commands run simultaneously, one succeeds and the other fails with `ID_CONFLICT`. Retry the failed command with new title.

### Validate Example
```bash
npm run cli -- issue validate
```
Reports:
- Malformed YAML front matter (PARSE_ERROR)
- Invalid metadata schema (SCHEMA_ERROR)
- Filename/id mismatches (PATH_MISMATCH)

## Notes
- This is a minimal viable product (MVP) specification, focused on core functionality without implementation details.
- I had this project for a long time, and now im using AI + github-speckit to finally get it done. 
  - it is a way to experiment with pure AI coding too