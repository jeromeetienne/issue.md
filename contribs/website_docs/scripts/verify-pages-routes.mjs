import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');

const requiredFiles = ['index.html', 'docs/index.html', 'demo/index.html', '_next'];

async function ensureFile(relativePath) {
    const fullPath = join(outDir, relativePath);
    await access(fullPath, constants.R_OK);
}

async function ensureContains(relativePath, text) {
    const fullPath = join(outDir, relativePath);
    const content = await readFile(fullPath, 'utf8');
    if (!content.includes(text)) {
        throw new Error(`Expected ${relativePath} to include '${text}'`);
    }
}

async function main() {
    for (const path of requiredFiles) {
        await ensureFile(path);
    }

    await ensureContains('index.html', '/issue.md/docs');
    await ensureContains('index.html', '/issue.md/demo');
    await ensureContains('index.html', '/issue.md/_next');
    await ensureContains('index.html', 'bi bi-github');
    await ensureContains('docs/index.html', '/issue.md/docs');
    await ensureContains('demo/index.html', '/issue.md/demo');
    await ensureContains('docs/index.html', '/issue.md/_next');
    await ensureContains('demo/index.html', '/issue.md/_next');

    console.log('Pages route and asset verification passed');
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
});
