# AgentReady

AgentReady is an AX validation harness for developer-agent onboarding journeys.

## Why it exists
Modern DevEx has two users: humans and coding agents. AgentReady checks whether docs, CLI, templates, and tests are usable by both.

## What v0.1 includes
- Deterministic simulated agent traces
- WidgetKit onboarding lab with weak and improved docs
- Scorecard + friction report generation
- Static before/after viewer
- Lightweight tests

## Run
- `npm run agentready:fail`
- `npm run agentready:pass`
- `npm run agentready:report`
- `npm run agentready:test`
- `npm run agentready:viewer`

## Viewer
Run `npm run agentready:report`, then open `viewer/index.html`.

## Non-goals (v0.1)
No live model API integrations, no SaaS dashboard, no database.
