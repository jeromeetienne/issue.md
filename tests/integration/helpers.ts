import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

export const makeTempWorkspace = async (): Promise<string> => {
	const path = await fs.mkdtemp(join(tmpdir(), 'issue-md-'));
	await fs.mkdir(join(path, 'issues'), { recursive: true });
	await fs.mkdir(join(path, 'comments'), { recursive: true });
	return path;
};

const currentFile = fileURLToPath(import.meta.url);
const integrationDir = dirname(currentFile);
const workspaceRoot = join(integrationDir, '..', '..');
const cliEntryPoint = join(workspaceRoot, 'dist', 'src', 'cli', 'index.js');

let isCliBuilt = false;

export const ensureCliBuilt = (): void => {
	if (isCliBuilt) {
		return;
	}
	execFileSync('npm', ['run', 'build'], {
		cwd: workspaceRoot,
		stdio: 'pipe'
	});
	isCliBuilt = true;
};

export interface CliRunResult {
	exitCode: number;
	stdout: string;
	stderr: string;
}

export const runCliCommand = (args: string[], cwd: string): CliRunResult => {
	ensureCliBuilt();
	const result = spawnSync('node', [cliEntryPoint, ...args], {
		cwd,
		encoding: 'utf8',
		env: {
			...process.env,
			NO_COLOR: '1'
		}
	});

	return {
		exitCode: result.status ?? 1,
		stdout: result.stdout ?? '',
		stderr: result.stderr ?? ''
	};
};
