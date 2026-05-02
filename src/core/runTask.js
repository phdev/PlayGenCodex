import fs from 'node:fs';
import path from 'node:path';
import { scoreRun } from './scoreRun.js';
import { generateReport } from './generateReport.js';

export function runTask(tracePath, reportPath, expectedFilesPath) {
  const trace = JSON.parse(fs.readFileSync(tracePath, 'utf8'));
  const expected = JSON.parse(fs.readFileSync(expectedFilesPath, 'utf8'));
  const result = scoreRun(trace, expected.requiredFiles);
  const markdown = generateReport(result);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, markdown);
  return result;
}
