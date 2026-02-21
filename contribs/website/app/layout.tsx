import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
	title: 'issue.md',
	description: 'Documentation and marketing site for issue.md'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<header className="site-header">
					<div className="container nav-row">
						<Link href="/" className="brand">
							issue.md
						</Link>
						<nav className="nav-links" aria-label="Main navigation">
							<Link href="/docs">Docs</Link>
							<Link href="/demo">CLI Demo</Link>
						</nav>
					</div>
				</header>
				<main className="container">{children}</main>
				<footer className="site-footer">
					<div className="container footer-inner">Built for simple, file-first issue workflows.</div>
				</footer>
			</body>
		</html>
	);
}
