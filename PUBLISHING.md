# Publishing Guide

## Goal

Publish this module from its own git repository so Foundry can install it via manifest URL.

## Suggested Repo Name

`shattered-lands-island-generator-v2`

## Files to Host

At minimum, the published repo should contain:
- `module.json`
- `scripts/`
- `data/`
- `docs/`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`

## Manifest Fields To Fill In

Update `module.json` once the repo exists:
- `url`
- `manifest`
- `download`

Example GitHub pattern:
- `url`: `https://github.com/Dredloxx/shattered-lands-island-generator`
- `manifest`: `https://raw.githubusercontent.com/Dredloxx/shattered-lands-island-generator/main/module.json`
- `download`: `https://github.com/Dredloxx/shattered-lands-island-generator/archive/refs/heads/main.zip`

This raw-manifest + branch-zip setup is the fastest path until a proper GitHub Release flow is in place.

## Release Workflow

1. Create repo.
2. Push module contents.
3. Tag a release, for example `v0.0.1`.
4. Attach a zip containing the module root.
5. Attach or publish `module.json`.
6. Install in Foundry using the manifest URL.

## Notes

- Keep the module folder name stable.
- Bump `version` in `module.json` for every release.
- Update `compatibility` when Foundry major versions change.
