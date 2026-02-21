import type { Metadata } from 'next';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
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
			<body className="d-flex flex-column min-vh-100 bg-body-tertiary">
				<header className="border-bottom bg-white">
					<div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
						<Link href="/" className="navbar-brand m-0 fw-semibold">
							issue.md
						</Link>
						<nav className="nav nav-pills" aria-label="Main navigation">
							<Link href="/docs" className="nav-link px-2 py-1">
								Docs
							</Link>
							<Link href="/demo" className="nav-link px-2 py-1">
								CLI Demo
							</Link>
						</nav>
					</div>
				</header>
				<main className="container my-5 flex-grow-1">{children}</main>
				<footer className="border-top bg-white mt-auto">
					<div className="container py-3 text-body-secondary small">Built for simple, file-first issue workflows.</div>
				</footer>
			</body>
		</html>
	);
}
