export function generateReport(result) {
  const fmt = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const row = (k, v) => `| ${k} | ${fmt(v)} |`;

  const observed = result.observedFailures.length
    ? result.observedFailures.map((x) => `- ${x}.`).join('\n')
    : '- None.';
  const causes = result.likelyAXCauses.length
    ? result.likelyAXCauses.map((x) => `- ${x}.`).join('\n')
    : '- None.';
  const fixes = result.recommendedFixes.length
    ? result.recommendedFixes.map((x) => `- ${x}.`).join('\n')
    : '- None.';

  return `# AgentReady AX Report

Scenario: WidgetKit Weather Widget
Docs Version: ${result.docsVersion}
Overall Result: ${result.overallResult.toUpperCase()}

## Scorecard

| Dimension | Result |
|---|---|
${row('Task completion', result.scorecard.taskCompletion)}
${row('Docs discovery', result.scorecard.docsDiscovery)}
${row('CLI correctness', result.scorecard.cliCorrectness)}
${row('API correctness', result.scorecard.apiCorrectness)}
${row('Required files', result.scorecard.requiredFiles)}
${row('Test pass rate', result.scorecard.testPassRate)}
${row('Repair loops', result.scorecard.repairLoops)}
${row('Context readiness', result.scorecard.contextReadiness)}

## Observed Failures

${observed}

## Likely AX Causes

${causes}

## Recommended Fixes

${fixes}

## Evidence

\`\`\`json
${JSON.stringify(result.evidence, null, 2)}
\`\`\`
`;
}
