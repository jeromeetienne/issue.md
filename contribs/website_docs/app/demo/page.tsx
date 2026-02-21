export default function DemoPage() {
	return (
		<div className="py-2">
			<h1 className="display-6 fw-semibold">CLI Demo</h1>
			<p className="text-body-secondary">This walkthrough demonstrates a full issue lifecycle with commands you can run as-is.</p>

			<section className="mt-4">
				<h2 className="h4">Step 1: Create an issue</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- issue create --title "Publish documentation site" --repo issues`}</code>
				</pre>
			</section>

			<section className="mt-4">
				<h2 className="h4">Step 2: Move status forward</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- issue update --id 0001 --status in-progress --repo issues
npm run cli -- issue update --id 0001 --status done --repo issues`}</code>
				</pre>
			</section>

			<section className="mt-4">
				<h2 className="h4">Step 3: Track conversation</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- comment add --issue-id 0001 --body "Initial draft published" --repo issues
npm run cli -- comment list --issue-id 0001 --repo issues`}</code>
				</pre>
			</section>

			<section className="mt-4">
				<h2 className="h4">Step 4: Validate repository consistency</h2>
				<pre className="rounded border bg-body p-3">
					<code>{`npm run cli -- validate --repo issues`}</code>
				</pre>
			</section>
		</div>
	);
}
