import { validateRepository } from '../../../application/use-cases/schema/validate-repository.js';
import { printValidateReport } from '../../output.js';

export const runValidate = async (rootDir: string) => {
	const report = await validateRepository(rootDir);
	printValidateReport(report);
	if (report.ok) {
		return;
	}
	process.exitCode = 2;
};
