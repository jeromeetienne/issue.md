import { Command } from 'commander';
import { createIssue } from '../../../application/use-cases/issue/create-issue.js';
import { listIssues } from '../../../application/use-cases/issue/list-issues.js';
import { getIssue, updateIssue } from '../../../application/use-cases/issue/get-update-issue.js';
import { closeIssue, reopenIssue } from '../../../application/use-cases/issue/change-issue-status.js';
import { runValidate } from './validate.js';

export const buildIssueCommand = (): Command => {
  const issue = new Command('issue');

  issue
    .command('create')
    .requiredOption('--title <title>')
    .requiredOption('--author <author>')
    .requiredOption('--body <body>')
    .action(async (options) => {
      const created = await createIssue({
        rootDir: process.cwd(),
        title: options.title,
        body: options.body,
        author: options.author
      });
      console.log(JSON.stringify(created, null, 2));
    });

  issue.command('list').action(async () => {
    const result = await listIssues(process.cwd());
    console.log(JSON.stringify(result, null, 2));
  });

  issue
    .command('show <id>')
    .action(async (id) => {
      const result = await getIssue(process.cwd(), id);
      console.log(JSON.stringify(result, null, 2));
    });

  issue
    .command('edit <id>')
    .option('--title <title>')
    .option('--body <body>')
    .action(async (id, options) => {
      const result = await updateIssue(process.cwd(), id, {
        title: options.title,
        body: options.body
      });
      console.log(JSON.stringify(result, null, 2));
    });

  issue.command('close <id>').action(async (id) => {
    const result = await closeIssue(process.cwd(), id);
    console.log(JSON.stringify(result, null, 2));
  });

  issue.command('reopen <id>').action(async (id) => {
    const result = await reopenIssue(process.cwd(), id);
    console.log(JSON.stringify(result, null, 2));
  });

  issue.command('validate').action(async () => runValidate(process.cwd()));

  return issue;
};
