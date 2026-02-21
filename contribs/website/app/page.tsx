import Link from 'next/link';

export default function HomePage() {
	return (
		<>
			<section className="hero">
				<h1>Track issues in plain Markdown.</h1>
				<p>
					<strong>issue.md</strong> is a file-first issue system powered by a CLI. Keep issue data human
					readable, versionable, and easy to review in pull requests.
				</p>
				<div className="button-row">
					<Link href="/docs" className="button primary">
						Read docs
					</Link>
					<Link href="/demo" className="button">
						View CLI demo
					</Link>
				</div>
			</section>

			<section className="grid" aria-label="Key value points">
				<article className="card">
					<h3>Git-native workflow</h3>
					<p>Issues live in your repository, so updates naturally flow through commits and code review.</p>
				</article>
				<article className="card">
					<h3>Readable by humans</h3>
					<p>Every issue and comment is plain Markdown with structured frontmatter for automation.</p>
				</article>
				<article className="card">
					<h3>Built for automation</h3>
					<p>Stable schemas and CLI commands make CI validation and team tooling straightforward.</p>
				</article>
			</section>

			<section className="section">
				<h2>Quick start</h2>
				<p>Create an issue and list everything from your terminal.</p>
				<pre>
					<code>{`npm run cli -- issue create --title "Add website docs" --repo issues
npm run cli -- issue list --repo issues`}</code>
				</pre>
			</section>
		</>
	);
}
