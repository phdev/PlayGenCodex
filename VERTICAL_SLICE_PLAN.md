# PlayCanvas Vertical Slice Generator Plan

## Goal
Build a pipeline where a player provides a game premise, gets concept imagery, and receives a playable PlayCanvas vertical slice that is validated across mobile touch, keyboard/mouse, and controller.

## Feasibility Summary
This is feasible as an orchestrated multi-agent build-and-test system, but only if scope constraints are strict:
- Restrict genre templates (e.g., third-person action, kart racer, top-down shooter).
- Restrict target runtime budgets (draw calls, texture memory, script size).
- Restrict generated gameplay to reusable mechanics assembled from known prefabs/components.

Without hard constraints, reliability drops quickly because fully open-ended generation can fail in art direction consistency, gameplay integration, and deterministic testability.

## Suggested End-to-End Pipeline

### 1) Premise Ingestion + Style Brief
Input:
- Prompt: "cozy sci-fi farming with hover drone companion"
- Optional references: moodboard, target games

Output:
- Structured brief JSON (genre, camera, loop, art style, content rating)
- Risk flags (multiplayer? physics-heavy? unsupported controls?)

### 2) Concept Art Generation ("GPT Images 2.0" stage)
Generate:
- Key art
- Character turnaround sheets
- Environment style frames
- UI mood exploration

Post-process:
- Vision model extracts tags, palette, shape language, scale cues
- Converts into style constraints used by downstream generators

### 3) Vertical Slice Planner Agent
Decomposes into:
- Core loop tasks (spawn, move, interact, score/fail/win)
- Technical tasks (input mappings, save state, camera rig)
- Asset tasks (characters, props, terrain splats, FX, audio stubs)
- QA tasks (smoke tests + device matrix)

Artifacts:
- DAG task graph with dependencies
- "Definition of done" for each task
- Timeboxed sprint plan for first playable

### 4) PlayCanvas Project Assembler
Creates project skeleton:
- Scenes: boot, menu, gameplay, results
- Entity hierarchy templates
- Script components with typed config schema
- Input abstraction layer for touch/KBM/controller

Also injects:
- Performance budget checker hooks
- Telemetry event schema
- Feature flags for optional systems

### 5) Asset Generation + Ingestion
"Splats, models, and assets generated" flow:
- Generate meshes/materials (or retrieve from licensed packs)
- Texture and LOD baking
- Collision proxy generation
- Splat conversion + placement tooling

Validation:
- Polycount + texture resolution gates
- Naming and folder conventions
- Auto-rig/retarget checks for character animation

### 6) Integration Agent
Does deterministic assembly:
- Binds assets to prefabs
- Connects gameplay scripts to data tables
- Applies tuning presets (movement, camera, enemy behavior)
- Runs static checks (missing refs, bad materials, script errors)

### 7) Browser Harness Test Agents
For each target profile:
- Mobile touch (portrait + landscape)
- Keyboard/mouse
- Controller (Xbox/PS mapping profile)

Runs:
- Load test, input responsiveness, objective completion, restart flow
- HUD readability checks at common resolutions
- Performance checks (FPS, frame pacing, memory)

Outputs:
- Pass/fail report with replay artifacts
- Bug list tied to owning task nodes in DAG

### 8) Player Validation + Sharing
Deliverables to player:
- Web build URL
- "What to test" checklist
- One-click feedback capture (rating + issue tags + comments)
- Share card/video capture for social distribution

## Technical Architecture (Pragmatic)
- **Orchestrator service**: queues, retries, task states, artifact store
- **Agent runtime**: planner, coder, integrator, tester specializations
- **PlayCanvas bridge**: project/file API wrapper + scene graph mutators
- **Asset pipeline service**: generation, conversion, validation, optimization
- **Test harness**: browser automation + virtualized input drivers
- **Observability**: tracing by slice run-id, per-stage metrics, cost tracking

## Should You Use Claude Agents SDK?
Short answer: it can work, but the better choice is whichever SDK gives you strongest tooling around:
- deterministic tool-calling
- structured outputs
- long-running workflow orchestration
- robust retries + checkpointing
- easy browser automation integration

Use Claude Agents SDK **if**:
- your team already has production experience with Anthropic stack
- you need Claude-specific planning/coding behavior and have evals proving better outcomes
- you can still cleanly integrate non-Claude models for image/asset generation and specialized tasks

Use an alternative orchestrator (or model-agnostic framework) **if**:
- you need flexible model routing per task (planner vs coder vs critic)
- you want to avoid vendor lock-in
- you expect rapid model swaps as quality/cost shifts

## Model Strategy Recommendation
For this product, don’t force one model for everything. Use a routed stack:
- **Planner model**: strong decomposition and constraint reasoning
- **Codegen model**: strong JS/TS + engine API grounding
- **Critic model**: catches logic/perf issues
- **Vision/Image model**: concept + style extraction

Then continuously evaluate with benchmarks tied to your own acceptance criteria:
- first-pass playable rate
- bug count per slice
- average repair iterations
- performance pass rate on mobile
- cost per successful vertical slice

## Key Risks and Mitigations
- **Open-ended premise explosion** -> template families + hard caps
- **Asset inconsistency** -> style guide extraction + similarity checks
- **Playability failures** -> automated objective-completion tests
- **Controller parity issues** -> shared input action map abstraction
- **Cost blowout** -> early reject gates + caching + staged fidelity

## MVP Scope (First 6–8 Weeks)
1. Support one genre template (e.g., top-down action).
2. Generate one playable level, one enemy archetype, one objective.
3. Support touch + KBM first; add controller once stable.
4. Build browser harness smoke suite + performance gates.
5. Add player feedback loop and shareable hosted build.

## What “Good” Looks Like
- 60%+ first-pass playable success on constrained template
- < 3 repair loops median to green tests
- Stable 30/60 FPS target on representative mobile device set
- Player can complete loop in < 5 minutes and provide feedback/share

## Model Selection Note
This document is model-agnostic by design. The implementation should support per-stage model routing and straightforward model swaps as provider capabilities change.

## Gaussian Splat-to-Gameplay Flow (PlayCanvas-Inspired)
To align with the PlayCanvas April 22, 2026 workflow, treat splats as a **visual substrate** and generate gameplay structure around them:

1. **Capture/Source Splat Scene**
   - Start from photogrammetry output or creator-provided splat data.
   - Normalize scale/origin and record an authoring coordinate system contract.

2. **Transform for Web Delivery**
   - Convert raw splat files into streamable SOG/LOD formats using a transform step.
   - Emit chunking metadata for progressive load on mobile and lower bandwidth profiles.

3. **Generate Physical Proxy Geometry**
   - Derive static collision meshes from splat density/occupancy.
   - Build walkable surfaces, wall blockers, and gameplay volumes (hazard, objective, trigger).

4. **Bake World Lighting Representation**
   - Generate a probe grid/light cache for dynamic actors so characters and props match splat lighting.
   - Add fallback probe decimation for mobile performance tiers.

5. **Navigation + NPC Enablement**
   - Build navmesh from physical proxy geometry (not the splat directly).
   - Populate pathing graph + semantic zones for AI behaviors.

6. **Gameplay Layering**
   - Add FPS/TPS mechanics, objective logic, encounter scripting, and spawn systems on top of the proxy world.
   - Keep splats read-only during runtime gameplay to avoid invalidating collision/nav/light artifacts.

7. **Cross-Input Playability Validation**
   - Browser harness validates movement, shooting/interactions, objective completion, and restart loops across touch/KBM/controller.
   - Include device-tier checks for load time, streaming stalls, FPS, and memory spikes.

### Why this matters for your generator
A splat-only scene is visually impressive but lacks core game affordances (colliders, navmesh, lighting response for dynamic actors). The generator should therefore treat splat ingestion as the start of a **world reconstruction pipeline**, not the end of content generation.
