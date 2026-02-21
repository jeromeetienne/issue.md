# Quickstart — Publish `contribs/website_docs` to GitHub Pages

## Prerequisites
- Repository admin access (one-time Pages enablement)
- Node.js 18+ and npm
- Access to default branch

## 1) Build locally from website directory
```bash
cd contribs/website_docs
npm ci
npm run build
```
Expected outcome:
- Build succeeds
- Static export output is generated for deployment (`out/`)

## 2) Enable GitHub Pages once
In repository settings:
1. Open **Settings → Pages**
2. Set **Build and deployment** source to **GitHub Actions**

## 3) Merge docs changes to default branch
Push or merge changes to one of these paths:

- `contribs/website_docs/**`
- `.github/workflows/website-docs-pages.yml`

Expected outcome:
- Website Pages workflow starts automatically.

## 4) Verify deployment workflow
In **Actions**:
1. Open latest website-pages workflow run
2. Confirm build and deploy jobs succeeded
3. Capture deployed environment URL
4. Record timestamps for measurement:
	- `t_start`: when the maintainer begins Pages enablement (for first-time publish timing)
	- `t_fail`: when a failed run status is first observed (for failure diagnosis timing)
	- `t_identified`: when root-cause stage is identified from logs

## 5) Verify public website routes
Open the published URL and verify:
- `/` loads
- `/docs` loads
- `/demo` loads
- core styles and GitHub icon render without missing assets
- deployment summary includes triggering commit SHA and freshness assertion note

## 6) Troubleshooting quick checks
- If workflow cannot deploy: verify workflow permissions include Pages + ID token write.
- If routes/assets 404 on Pages: verify repository path base configuration for project pages.
- If site does not update: ensure changes were merged to default branch and rerun workflow manually.

## 7) Success criteria measurement protocol

Use this protocol to make SC-002 and SC-004 objective and repeatable.

- **SC-002 (first-time publish in under 15 minutes)**
	1. Measure once for a maintainer with no prior Pages setup in this repository.
	2. Start timer at `t_start` (before Step 2 begins).
	3. Stop timer when Step 4 confirms a successful deploy with environment URL.
	4. Pass condition: elapsed time `< 15 minutes`.

- **SC-004 (identify failure root-cause stage in under 5 minutes)**
	1. Use a run in failed state.
	2. Start timer at `t_fail` (when failure is first observed in Actions).
	3. Stop timer at `t_identified` (when a specific failed stage is named, e.g., build, artifact upload, deploy).
	4. Pass condition: elapsed time `< 5 minutes`.

- **Recording guidance**
	- Record measurements in the feature validation notes for auditability.
	- If timing fails, capture the blocking step and update runbook guidance before release.
