import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { scoreRun } from '../../../src/core/scoreRun.js';
import { runTask } from '../../../src/core/runTask.js';

const failTrace = JSON.parse(fs.readFileSync('runs/sample-fail/trace.json', 'utf8'));
const passTrace = JSON.parse(fs.readFileSync('runs/sample-pass/trace.json', 'utf8'));
const expected = JSON.parse(fs.readFileSync('examples/widgetkit-sdk/expected/expected-files.json', 'utf8')).requiredFiles;

test('stable scoring for sample-fail', () => {
  const result = scoreRun(failTrace, expected);
  assert.equal(result.overallResult, 'fail');
});

test('stable scoring for sample-pass', () => {
  const result = scoreRun(passTrace, expected);
  assert.equal(result.overallResult, 'pass');
});

test('undocumented API is detected', () => {
  const result = scoreRun(failTrace, expected);
  assert.ok(result.observedFailures.some((x) => x.includes('undocumented API')));
});

test('invalid CLI command is detected', () => {
  const result = scoreRun(failTrace, expected);
  assert.ok(result.observedFailures.some((x) => x.includes('invalid CLI command')));
});

test('missing required files are detected', () => {
  const result = scoreRun(failTrace, expected);
  assert.ok(result.observedFailures.some((x) => x.includes('widget.config.json')));
});

test('report generation is deterministic', () => {
  const a = runTask('runs/sample-pass/trace.json', 'reports/_tmp1.md', 'examples/widgetkit-sdk/expected/expected-files.json');
  const b = runTask('runs/sample-pass/trace.json', 'reports/_tmp2.md', 'examples/widgetkit-sdk/expected/expected-files.json');
  assert.deepEqual(a, b);
});

test('docs-v2 pass scores better than docs-v1 fail', () => {
  const fail = scoreRun(failTrace, expected);
  const pass = scoreRun(passTrace, expected);
  const passCount = Object.values(pass.scorecard).filter((x) => x === 'pass').length;
  const failCount = Object.values(fail.scorecard).filter((x) => x === 'pass').length;
  assert.ok(passCount > failCount);
});
