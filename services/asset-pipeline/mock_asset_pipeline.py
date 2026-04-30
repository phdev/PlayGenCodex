#!/usr/bin/env python3
import json
from pathlib import Path


def run(manifest_path: Path):
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    artifacts = {
        "slice_run_id": manifest["slice_run_id"],
        "assets": [
            {"asset_id": "splat_env_01", "kind": "splat", "lod": 1},
            {"asset_id": "collision_env_01", "kind": "mesh", "lod": 0},
            {"asset_id": "navmesh_env_01", "kind": "mesh", "lod": 0}
        ]
    }
    out = manifest_path.parent / "assets.json"
    out.write_text(json.dumps(artifacts, indent=2), encoding="utf-8")
    return out


if __name__ == "__main__":
    print(run(Path("artifacts/latest/manifest.json")))
