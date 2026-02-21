# Issue.md
application which store issues (ala github issues) in the filesystem.
it is parsable by computer to allow for automation, but also human readable and editable.
- possible command line interface to create and manage issues
- possible web interface to view and manage issues
- issues stored in a directory structure, with metadata in a front-matter and content in a markdown file

## Schema contract notes

- Front matter is YAML and canonical issue files are stored under `issues/<id>-<kebab-title>.md`.
- Comments are stored under `comments/<issue-id>/<comment-id>.md` with required front matter.
- Unknown top-level metadata keys are invalid unless they use the `x_` prefix.
- Generated artifacts (for example `.issue-cache/index.json`) are non-canonical and never the source of truth.