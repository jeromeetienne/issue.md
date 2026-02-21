import Link from 'next/link';

export default function HomePage() {
	return (
		<>
			<section className="py-5">
				<h1 className="display-5 fw-semibold mb-3">Track issues in plain Markdown.</h1>
				<p className="lead text-body-secondary mb-4">
					<strong>issue.md</strong> is a file-first issue system powered by a CLI. Keep issue data human
					readable, versionable, and easy to review in pull requests.
				</p>
				<div className="d-flex flex-wrap gap-2">
					<Link href="/docs" className="btn btn-primary">
						Read docs
					</Link>
					<Link href="/demo" className="btn btn-outline-secondary">
						View CLI demo
					</Link>
				</div>
			</section>

			<section className="row g-3" aria-label="Key value points">
				<article className="col-12 col-md-4">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h3 className="h5 card-title">Git-native workflow</h3>
							<p className="card-text text-body-secondary">Issues live in your repository, so updates naturally flow through commits and code review.</p>
						</div>
					</div>
				</article>
				<article className="col-12 col-md-4">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h3 className="h5 card-title">Readable by humans</h3>
							<p className="card-text text-body-secondary">Every issue and comment is plain Markdown with structured frontmatter for automation.</p>
						</div>
					</div>
				</article>
				<article className="col-12 col-md-4">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h3 className="h5 card-title">Built for automation</h3>
							<p className="card-text text-body-secondary">Stable schemas and CLI commands make CI validation and team tooling straightforward.</p>
						</div>
					</div>
				</article>
			</section>

			<section className="mt-5">
				<h2 className="h3">Quick start</h2>
				<p className="text-body-secondary">Create an issue and list everything from your terminal.</p>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- issue create --title "Add website docs" --repo issues
npm run cli -- issue list --repo issues`}</code>
				</pre>
			</section>
		</>
	);
}
