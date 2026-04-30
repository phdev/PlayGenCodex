# PlayCanvas Vertical Slice Generator — Implementation Backlog

This backlog turns `VERTICAL_SLICE_PLAN.md` into a build sequence that can be executed by an engineering team and agent-orchestrated CI.

## Phase 0 — Foundation (Week 1)
- [ ] Repo bootstrap: `services/orchestrator`, `services/asset-pipeline`, `services/browser-harness`, `packages/shared-schema`.
- [ ] Define global run identifier (`slice_run_id`) and artifact storage structure.
- [ ] Add JSON schemas for: `PremiseBrief`, `TaskNode`, `AssetSpec`, `TestResult`.
- [ ] Add CI checks for schema validation and linting.

## Phase 1 — First Playable Skeleton (Weeks 2-3)
- [ ] Premise intake endpoint -> emits constrained `PremiseBrief`.
- [ ] Planner service emits dependency DAG with DoD and risk flags.
- [ ] PlayCanvas project assembler creates scenes: `boot`, `menu`, `gameplay`, `results`.
- [ ] Input abstraction layer for touch + keyboard/mouse.
- [ ] Browser harness smoke test: launch -> start -> complete objective -> restart.

## Phase 2 — Asset & Splat Pipeline (Weeks 3-4)
- [ ] Splat ingestion API and metadata normalization.
- [ ] Splat transform stage for web streamability (chunk metadata + LOD metadata).
- [ ] Proxy geometry generation for collision.
- [ ] Navigation mesh generation from proxy geometry.
- [ ] Lighting probe bake stage for dynamic entities.
- [ ] Validation gates: polycount, texture budgets, missing material refs.

## Phase 3 — Gameplay & Integration (Weeks 4-6)
- [ ] Deterministic integrator binds assets to prefabs and scripts.
- [ ] Data-driven tuning presets for movement/camera/enemies.
- [ ] Objective templates (single objective for MVP): collect, survive, reach-point.
- [ ] Telemetry events for progression funnel and failure points.

## Phase 4 — Device Matrix & Quality Gates (Weeks 6-7)
- [ ] Mobile touch suite (portrait + landscape).
- [ ] Keyboard/mouse suite.
- [ ] Controller suite with mapping parity checks.
- [ ] FPS/memory/frame pacing thresholds by device tier.
- [ ] Replay artifact capture for failed tests.

## Phase 5 — Player Validation & Share (Week 8)
- [ ] Hosted build handoff URL generation.
- [ ] In-product validation checklist and feedback capture.
- [ ] Share card + short gameplay capture generation.

## MVP Acceptance Criteria
- [ ] >=60% first-pass playable rate in constrained template.
- [ ] Median <=3 repair loops to green test suite.
- [ ] Playable loop completion under 5 minutes.
- [ ] Performance threshold pass on representative mobile tier.
