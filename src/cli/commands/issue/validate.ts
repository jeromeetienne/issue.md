import { validateRepository } from '../../../application/use-cases/schema/validate-repository.js';

export const runValidate = async (rootDir: string) => {
  const report = await validateRepository(rootDir);
  if (report.ok) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = 2;
};
