export function generateReport(result) {
  const fmt = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const row = (k, v) => `| ${k} | ${fmt(v)} |`;

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

${result.observedFailures.map((x) => `- ${x}.`).join('\n') || '- None.'}

## Likely AX Causes

${result.likelyAXCauses.map((x) => `- ${x}.`).join('\n') || '- None.'}

## Recommended Fixes

${result.recommendedFixes.map((x) => `- ${x}.`).join('\n') || '- None.'}

## Evidence

\
\

t\`\`\`json
${JSON.stringify(result.evidence, null, 2)}
\`\`\`
`;
}
