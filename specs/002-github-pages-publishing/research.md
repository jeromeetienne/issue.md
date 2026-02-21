# Phase 0 Research — Website Docs GitHub Pages Publishing

## Decision 1: Deployment mechanism

### Decision
Use GitHub-native Pages deployment via GitHub Actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) triggered on pushes to the default branch.

### Rationale
- Minimal maintainer setup and no extra deploy tokens/secrets.
- First-class GitHub Pages support with deployment visibility in repository UI.
- Aligns with requirement for repository-native automation and diagnostics.

### Alternatives considered
- `gh-pages` branch publish action: workable but adds branch-management overhead and artifact commit noise.
- Manual local deploy scripts: fails “easy publish” and repeatability goals.

---

## Decision 2: Next.js output mode for Pages

### Decision
Use static export mode for `contribs/website_docs` (`output: 'export'`) and publish the generated `out/` artifact.

### Rationale
- GitHub Pages serves static assets only; this is the most direct compatibility path.
- No runtime server needed after build.
- Keeps deployment deterministic and simple.

### Alternatives considered
- Running Next server on external hosting: out of scope and not GitHub Pages-native.
- Client-side-only SPA fallback routing: unnecessary for current route structure and less explicit.

---

## Decision 3: Repository path compatibility

### Decision
Configure repository-scoped base paths (`basePath` and matching asset path strategy) so the site works at `/issue.md` on GitHub Pages.

### Rationale
- Project pages are published under `/owner/repo` path prefix.
- Prevents route and static asset 404s when directly opening nested pages.

### Alternatives considered
- Root-path-only config: would break assets/routes on project pages.
- Reverse-proxy path rewriting: unnecessary complexity for this deployment target.

---

## Decision 4: Workflow trigger and scope

### Decision
Trigger publishing on default-branch pushes and support manual re-run (`workflow_dispatch`), with build steps executed from `contribs/website_docs`.

### Rationale
- Automatic publishing for normal merges.
- Manual trigger supports recovery/redeploy without synthetic commits.
- Limits operational complexity while meeting maintainer needs.

### Alternatives considered
- Trigger on all branches: wastes CI resources and can create accidental deploy ambiguity.
- Tag-only publishing: adds release ceremony not requested for docs updates.

---

## Decision 5: Verification approach

### Decision
Use two-stage verification: (1) CI build success as deployment gate, (2) post-deploy route/asset smoke checks documented in maintainer quickstart.

### Rationale
- CI ensures reproducible artifact generation.
- Human-visible smoke checks catch path/asset regressions that still compile.
- Matches requirement for fast diagnosis and simple operations.

### Alternatives considered
- No post-deploy checks: risks silent broken public pages.
- Full browser E2E suite in CI: valuable later, but overkill for initial easy-publish objective.
