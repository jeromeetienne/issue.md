export default function DocsPage() {
	return (
		<div className="py-2">
			<h1 className="display-6 fw-semibold">Documentation</h1>
			<p className="text-body-secondary">Use this page as the fast path to start using the `issue.md` CLI in your repository.</p>

			<section className="mt-4">
				<h2 className="h4">1) Initialize your repository</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm install
npm run build`}</code>
				</pre>
			</section>

			<section className="mt-4">
				<h2 className="h4">2) Create and update issues</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- issue create --title "My first issue" --repo issues
npm run cli -- issue update --id 0001 --status in-progress --repo issues
npm run cli -- issue list --repo issues`}</code>
				</pre>
			</section>

			<section className="mt-4">
				<h2 className="h4">3) Add comments</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- comment add --issue-id 0001 --body "Starting implementation" --repo issues
npm run cli -- comment list --issue-id 0001 --repo issues`}</code>
				</pre>
			</section>
		</div>
	);
}
