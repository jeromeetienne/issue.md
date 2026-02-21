export default function DocsPage() {
	return (
		<div className="section">
			<h1>Documentation</h1>
			<p>Use this page as the fast path to start using the `issue.md` CLI in your repository.</p>

			<section className="section">
				<h2>1) Initialize your repository</h2>
				<pre>
					<code>{`npm install
npm run build`}</code>
				</pre>
			</section>

			<section className="section">
				<h2>2) Create and update issues</h2>
				<pre>
					<code>{`npm run cli -- issue create --title "My first issue" --repo issues
npm run cli -- issue update --id 0001 --status in-progress --repo issues
npm run cli -- issue list --repo issues`}</code>
				</pre>
			</section>

			<section className="section">
				<h2>3) Add comments</h2>
				<pre>
					<code>{`npm run cli -- comment add --issue-id 0001 --body "Starting implementation" --repo issues
npm run cli -- comment list --issue-id 0001 --repo issues`}</code>
				</pre>
			</section>
		</div>
	);
}
