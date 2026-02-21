import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repositoryBasePath = '/issue.md';

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		unoptimized: true
	},
	trailingSlash: true,
	basePath: isGithubPages ? repositoryBasePath : undefined,
	assetPrefix: isGithubPages ? `${repositoryBasePath}/` : undefined
};

export default nextConfig;
