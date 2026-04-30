#!/usr/bin/env python3
import json
import uuid
from pathlib import Path


def build_task_graph():
    return [
        {"id": "t1", "title": "Generate concept image", "owner": "planner", "depends_on": [], "definition_of_done": ["style tags extracted"]},
        {"id": "t2", "title": "Assemble PlayCanvas scenes", "owner": "assembler", "depends_on": ["t1"], "definition_of_done": ["boot/menu/gameplay/results created"]},
        {"id": "t3", "title": "Splat proxy collision", "owner": "asset", "depends_on": ["t1"], "definition_of_done": ["collision mesh created", "navmesh created"]},
        {"id": "t4", "title": "Run browser harness", "owner": "qa", "depends_on": ["t2", "t3"], "definition_of_done": ["touch/kbm/controller smoke pass"]}
    ]


def run(premise: str, out_dir: Path):
    run_id = f"slice-{uuid.uuid4().hex[:8]}"
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest = {
        "slice_run_id": run_id,
        "premise": premise,
        "task_graph": build_task_graph(),
        "status": "planned"
    }
    manifest_path = out_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return manifest_path


if __name__ == "__main__":
    output = run("cozy sci-fi farming with hover drone companion", Path("artifacts/latest"))
    print(output)
