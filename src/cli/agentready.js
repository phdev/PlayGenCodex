#!/usr/bin/env node
import fs from 'node:fs';
import { runTask } from '../core/runTask.js';
import { stableJson } from '../core/stableJson.js';

const cmd = process.argv[2];
const expectedFiles = 'examples/widgetkit-sdk/expected/expected-files.json';

if (cmd === 'run') {
  const trace = process.argv[3];
  const out = process.argv[4];
  const result = runTask(trace, out, expectedFiles);
  console.log(`Generated ${out} (${result.overallResult.toUpperCase()})`);
} else if (cmd === 'report') {
  const fail = runTask('runs/sample-fail/trace.json', 'reports/sample-fail.md', expectedFiles);
  const pass = runTask('runs/sample-pass/trace.json', 'reports/sample-pass.md', expectedFiles);
  const latest = {
    thesis: 'Modern DevEx has two users: the human developer and the coding agent.',
    fail,
    pass
  };
  fs.writeFileSync('viewer/report-data.json', JSON.stringify(latest, null, 2));
  fs.writeFileSync('reports/latest.md', `# Latest AgentReady Reports\n\n- sample-fail: ${fail.overallResult}\n- sample-pass: ${pass.overallResult}\n`);
  console.log('Generated fail/pass/latest reports and viewer data.');
} else if (cmd === 'viewer') {
  console.log('Open viewer/index.html in a browser (or serve with: python3 -m http.server 4173).');
} else {
  console.log('Usage: node src/cli/agentready.js [run|report|viewer]');
}

export { stableJson };
