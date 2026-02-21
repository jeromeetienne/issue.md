# issue.md Website

This folder contains a standalone Next.js website for `issue.md`.

It is intentionally small and focused on three goals:

- Explain what `issue.md` is and why to use it.
- Provide lightweight documentation to get started quickly.
- Showcase a CLI demo flow that users can copy and run.

## Local development

From this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## GitHub Pages publishing

### One-time setup

1. Open repository **Settings → Pages**.
2. Set **Build and deployment** source to **GitHub Actions**.
3. Ensure workflow permissions allow Pages deploy (`pages:write`, `id-token:write`).

### Routine publish flow

1. Merge docs changes to `main` under `contribs/website_docs/**` (or workflow updates in `.github/workflows/website-docs-pages.yml`).
2. Wait for workflow `Website Docs Pages` to finish.
3. Check deploy URL from the workflow summary.

Canonical Pages URL:

- `https://jeromeetienne.github.io/issue.md/`

### Local verification before merge

```bash
npm ci
GITHUB_PAGES=true npm run build:pages
```

The build verifies:

- exported routes (`/`, `/docs`, `/demo`)
- static assets (`/_next` output + icon/style references)
- repository-path-aware links (`/issue.md/...`)

### Troubleshooting

- **Pages not deploying**: verify GitHub Pages source is set to GitHub Actions.
- **Permissions error**: verify workflow includes `pages: write` and `id-token: write` permissions.
- **404 on published routes/assets**: verify `GITHUB_PAGES=true` build and `next.config.ts` base/asset path settings.
- **Stale site content**: re-run workflow on latest `main` commit and confirm deploy summary SHA.