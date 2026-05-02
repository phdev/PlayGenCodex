# AgentReady AX Report

Scenario: WidgetKit Weather Widget
Docs Version: v1-weak
Overall Result: FAIL

## Scorecard

| Dimension | Result |
|---|---|
| Task completion | Fail |
| Docs discovery | Partial |
| CLI correctness | Fail |
| API correctness | Fail |
| Required files | Partial |
| Test pass rate | Fail |
| Repair loops | Pass |
| Context readiness | Partial |

## Observed Failures

- Used undocumented API createWeatherCard.
- Used invalid CLI command: widgetkit --init weather.
- Missing required file: widget.config.json.
- Missing required file: src/widget.js.
- Integration test failed.

## Likely AX Causes

- API reference did not provide a task-oriented canonical example or discourage common hallucinated API names.
- Quickstart did not provide a complete copy/paste CLI command.
- Troubleshooting and template docs did not reinforce required output files.
- Onboarding path lacked deterministic validation steps.

## Recommended Fixes

- Add a minimal working example and a "do not use undocumented APIs" section.
- Add canonical CLI command with expected output.
- Document required output files and link failures to troubleshooting.
- Add explicit "run tests" step in quickstart with expected pass output.

## Evidence


t```json
[
  {
    "type": "doc_lookup",
    "target": "README.md",
    "result": "found"
  },
  {
    "type": "command",
    "command": "widgetkit --init weather",
    "result": "failed",
    "error": "Unknown flag --init"
  },
  {
    "type": "code_generation",
    "apiUsed": "createWeatherCard",
    "documented": false
  },
  {
    "type": "test_run",
    "command": "npm test",
    "passed": false
  }
]
```
