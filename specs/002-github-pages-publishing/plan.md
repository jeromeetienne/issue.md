# Implementation Plan: Website Docs GitHub Pages Publishing

**Branch**: `002-github-pages-publishing` | **Date**: 2026-02-21 | **Spec**: `/specs/002-github-pages-publishing/spec.md`
**Input**: Feature specification from `/specs/002-github-pages-publishing/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Enable low-friction publishing of `contribs/website_docs` to GitHub Pages using repository-native automation. The approach is to produce a static export from the Next.js docs site, deploy it with GitHub Actions Pages workflow primitives, and document first-time enablement plus verification so maintainers can publish without manual artifact handling.

## Technical Context

**Language/Version**: TypeScript 5.x (website), Node.js 18+ runtime for CI workflows  
**Primary Dependencies**: Next.js 15.x, React 19.x, Bootstrap 5.x, Bootstrap Icons 1.x, GitHub Actions Pages actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`)  
**Storage**: Static files exported to `contribs/website_docs/out` and published to GitHub Pages artifact storage  
**Testing**: `npm run build` in `contribs/website_docs`, deployment workflow run checks, manual route/asset verification against published URL  
**Target Platform**: GitHub-hosted Pages static site for repository `jeromeetienne/issue.md`
**Project Type**: Monorepo with standalone docs web app subproject (`contribs/website_docs`)  
**Performance Goals**: Publish pipeline completes in under 5 minutes for typical docs-only updates; first page load serves correctly with no missing core assets  
**Constraints**: Static export only; repository-scoped base path support (`/issue.md`); no manual commit of generated site output; default-branch driven publishing  
**Scale/Scope**: Single docs app (home/docs/demo routes), one Pages deployment workflow, maintainer setup documentation

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

Gate result (pre-research): **PASS**

- This feature does not change issue storage layout, issue markdown schema, lifecycle operations, or CLI/web parity semantics.
- Generated static website artifacts remain non-canonical and are deployment outputs only.
- Automation-first requirement is satisfied through CI deployment workflow plus build validation.

## Project Structure

### Documentation (this feature)

```text
specs/002-github-pages-publishing/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
.github/
└── workflows/
  └── website-docs-pages.yml

contribs/
└── website_docs/
  ├── app/
  ├── next.config.ts
  ├── package.json
  └── README.md

specs/
└── 002-github-pages-publishing/
  ├── plan.md
  ├── research.md
  ├── data-model.md
  ├── quickstart.md
  └── contracts/
```

**Structure Decision**: Keep the existing monorepo layout. Implement deployment automation under `.github/workflows/`, keep all website runtime/build config under `contribs/website_docs/`, and place design artifacts in the feature spec directory.

## Post-Design Constitution Check

Gate result (post-design): **PASS**

- **File-system native**: No issue source-of-truth changes; Pages artifacts are deployment outputs only.
- **Human + machine format**: Issue markdown/front matter parse contract remains unchanged.
- **Metadata contract stability**: Explicitly classified as non-breaking with no schema migration required.
- **Interface parity**: No core issue operation behavior changed in CLI or web issue tooling.
- **Automation coverage**: Plan requires automated build/deploy workflow and verification checks.

## Complexity Tracking

No constitution violations require complexity exceptions for this feature.
