#!/usr/bin/env python3
import importlib.util
from pathlib import Path


def load_module(path: str, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


if __name__ == "__main__":
    orchestrator = load_module("services/orchestrator/run_slice.py", "orchestrator")
    asset = load_module("services/asset-pipeline/mock_asset_pipeline.py", "asset")
    harness = load_module("services/browser-harness/mock_harness.py", "harness")

    manifest = orchestrator.run("premise: neon rooftop extraction", Path("artifacts/latest"))
    assets = asset.run(manifest)
    tests = harness.run(manifest)

    print(f"manifest={manifest}")
    print(f"assets={assets}")
    print(f"tests={tests}")
