import { validateResult } from './validateResult.js';

const PASS = 'pass';
const FAIL = 'fail';
const PARTIAL = 'partial';

export function scoreRun(trace, expectedFiles) {
  const v = validateResult(trace, expectedFiles);
  const docsLookup = (trace.steps || []).filter((s) => s.type === 'doc_lookup');
  const contextReadiness = trace.docsVersion === 'v2-agent-ready' ? PASS : PARTIAL;

  const scorecard = {
    taskCompletion: v.testsPassed && v.missingFiles.length === 0 && v.commandFailures.length === 0 ? PASS : FAIL,
    docsDiscovery: docsLookup.length > 1 ? PASS : docsLookup.length === 1 ? PARTIAL : FAIL,
    cliCorrectness: v.commandFailures.length === 0 ? PASS : FAIL,
    apiCorrectness: v.undocumentedApis.length === 0 ? PASS : FAIL,
    requiredFiles: v.missingFiles.length === 0 ? PASS : PARTIAL,
    testPassRate: v.testsPassed ? PASS : FAIL,
    repairLoops: v.repairLoops <= 1 ? PASS : FAIL,
    contextReadiness
  };

  const observedFailures = [];
  const likelyAXCauses = [];
  const recommendedFixes = [];

  for (const api of v.undocumentedApis) {
    observedFailures.push(`Used undocumented API ${api.apiUsed}`);
    likelyAXCauses.push('API reference did not provide a task-oriented canonical example or discourage common hallucinated API names');
    recommendedFixes.push('Add a minimal working example and a "do not use undocumented APIs" section');
  }
  for (const cmd of v.commandFailures) {
    observedFailures.push(`Used invalid CLI command: ${cmd.command}`);
    likelyAXCauses.push('Quickstart did not provide a complete copy/paste CLI command');
    recommendedFixes.push('Add canonical CLI command with expected output');
  }
  for (const file of v.missingFiles) {
    observedFailures.push(`Missing required file: ${file}`);
    likelyAXCauses.push('Troubleshooting and template docs did not reinforce required output files');
    recommendedFixes.push('Document required output files and link failures to troubleshooting');
  }
  if (!v.testsPassed) {
    observedFailures.push('Integration test failed');
    likelyAXCauses.push('Onboarding path lacked deterministic validation steps');
    recommendedFixes.push('Add explicit "run tests" step in quickstart with expected pass output');
  }

  return {
    scenarioId: trace.scenarioId,
    docsVersion: trace.docsVersion,
    scorecard,
    observedFailures: [...new Set(observedFailures)],
    likelyAXCauses: [...new Set(likelyAXCauses)],
    recommendedFixes: [...new Set(recommendedFixes)],
    overallResult: Object.values(scorecard).every((s) => s === PASS) ? PASS : FAIL,
    evidence: trace.steps
  };
}
