# Data Model — Website Docs GitHub Pages Publishing

## Entity: PagesDeploymentConfiguration

### Purpose
Defines repository-level configuration needed to build and deploy `contribs/website_docs` to GitHub Pages.

### Fields
- `workflow_name` (string): identifier for the deployment workflow.
- `trigger_branches` (array<string>): branches that are allowed to deploy.
- `working_directory` (string): build root for docs app (`contribs/website_docs`).
- `artifact_path` (string): exported static output path (`contribs/website_docs/out`).
- `pages_source` (enum): deployment source strategy (`github_actions`).
- `permissions` (object): workflow permissions required for pages/artifacts.

### Validation Rules
- `trigger_branches` MUST include the default branch.
- `artifact_path` MUST point to static export output.
- `permissions` MUST include `pages: write` and `id-token: write`.
- Deployment configuration MUST avoid committing generated artifacts.

---

## Entity: StaticSiteArtifact

### Purpose
Represents the generated static website bundle that is deployed to GitHub Pages.

### Fields
- `build_id` (string): unique build/run identifier.
- `generated_at` (datetime): timestamp of artifact generation.
- `output_root` (string): export root (`out/`).
- `routes` (array<string>): expected route entry points (e.g., `/`, `/docs`, `/demo`).
- `asset_manifest_present` (boolean): indicates core static asset mapping exists.

### Validation Rules
- Artifact MUST be generated from default-branch source for production deployment.
- All required routes MUST have corresponding static HTML output.
- Core CSS/JS/icon assets referenced by routes MUST exist in artifact output.

---

## Entity: PublishVerificationRecord

### Purpose
Captures deployment run outcome and evidence used by maintainers to verify success.

### Fields
- `run_id` (string): workflow run identifier.
- `commit_sha` (string): source revision deployed.
- `status` (enum): `queued | in_progress | success | failed`.
- `environment_url` (string): published GitHub Pages URL.
- `failed_step` (string, optional): failing stage when status is `failed`.
- `diagnostic_summary` (string, optional): concise failure reason.

### Validation Rules
- `environment_url` MUST be present when status is `success`.
- `failed_step` and `diagnostic_summary` SHOULD be present when status is `failed`.
- `commit_sha` MUST map to repository history.

## Relationships

- One `PagesDeploymentConfiguration` governs many `StaticSiteArtifact` builds.
- One `StaticSiteArtifact` maps to one `PublishVerificationRecord` for a given deployment run.
- `PublishVerificationRecord.commit_sha` links deployment status to source changes.
