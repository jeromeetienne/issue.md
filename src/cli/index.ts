import { Command } from 'commander';
import { AppError } from '../shared/errors/errors.js';
import { buildIssueCommand } from './commands/issue/index.js';
import { buildCommentCommand } from './commands/comment/index.js';

const main = async () => {
  const program = new Command();
  program.name('issue-md').description('Filesystem-native issue tracker');
  program.addCommand(buildIssueCommand());
  program.addCommand(buildCommentCommand());
  await program.parseAsync(process.argv);
};

main().catch((error: unknown) => {
  if (error instanceof AppError) {
    console.error(`${error.code}: ${error.message}`);
    process.exit(error.exitCode);
  }
  console.error(error);
  process.exit(1);
});
