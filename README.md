# AgentReady

AgentReady is an **AX validation harness** for developer-agent onboarding journeys.

It validates whether a coding agent can complete a real onboarding task using product docs, CLI commands, templates, and tests.

## Thesis

Modern DevEx has two users:
1. Human developers
2. Coding agents helping those developers

AgentReady checks whether your SDK is ready for both.

## What this v0.1 prototype does

- Runs deterministic onboarding traces (no live model APIs)
- Scores runs across 8 AX dimensions
- Produces markdown friction reports with recommended fixes
- Compares weak docs vs. agent-ready docs
- Includes a fictional SDK lab (`WidgetKit`) with CLI, docs, template, and tests
- Includes a static viewer for before/after analysis

## What it does *not* do yet

- No live Codex / Claude / OpenAI / Anthropic runtime capture
- No hosted dashboard, auth, or database
- No leaderboard or benchmark marketplace

## Repository layout

- `src/core`: harness functions (`runTask`, `validateResult`, `scoreRun`, `generateReport`)
- `src/cli`: CLI entrypoint
- `examples/widgetkit-sdk`: onboarding lab and docs variants
- `runs`: deterministic run traces
- `reports`: generated markdown reports
- `viewer`: static report viewer
- `docs`: product spec and AX guidance

## Quick start

```bash
npm install
npm run agentready:report
npm run agentready:test
```

## Commands

- `npm run agentready:fail` — generate fail report from weak docs trace
- `npm run agentready:pass` — generate pass report from agent-ready docs trace
- `npm run agentready:report` — generate both and refresh `reports/latest.md` + `viewer/report-data.json`
- `npm run agentready:test` — run deterministic tests
- `npm run agentready:viewer` — prints instructions for viewing static viewer

## Open the viewer

1. Run `npm run agentready:report`
2. Either open `viewer/index.html` directly, or serve locally:

```bash
cd viewer
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
