export function validateResult(trace, expectedFiles = []) {
  const steps = trace.steps || [];
  const filesCreated = trace.artifacts?.filesCreated || [];
  const commandFailures = steps.filter((s) => s.type === 'command' && s.result === 'failed');
  const undocumentedApis = steps.filter((s) => s.type === 'code_generation' && s.documented === false);
  const missingFiles = expectedFiles.filter((f) => !filesCreated.includes(f));
  const testStep = steps.find((s) => s.type === 'test_run');

  return {
    commandFailures,
    undocumentedApis,
    missingFiles,
    testsPassed: Boolean(testStep?.passed),
    repairLoops: steps.filter((s) => s.type === 'command' && s.result === 'failed').length
  };
}
