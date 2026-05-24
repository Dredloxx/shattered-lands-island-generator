# Shattered Lands Island Generator

Foundry VTT module scaffold for generating Shattered Lands island journals.

## Current Scope

This repo is for the **full island generator project**.

The first implemented subsystem is now **island journal generation**, which gives us the content backbone for later map and tile automation.

## Current Behavior

The module currently generates **one island journal per scene**.

Each generated island journal contains:
- an island summary
- **7 regions**
- **7 hexes inside each region**

Regeneration updates the existing scene-linked island journal in place instead of creating an endless list of new journals.

## Planned Milestones

### Milestone 1, Island Journal Backbone
- Module scaffold
- Register settings
- Add `Generate Island Journal` entry points
- Generate one island journal containing 7 regions with 7 hexes each
- Overwrite the scene-linked generated journal instead of duplicating it

### Milestone 2, Region Tile Layer
- Region tile definitions
- Asset mapping
- Placement coordinates for 7-hex regions
- Link journals to generated region placements

### Milestone 3, Island Assembly
- Multi-region island layout generation
- Placement rules between region tiles
- Randomization controls
- Scene note / map pin integration

## Project Layout

- `module.json` Foundry manifest
- `scripts/` Foundry entrypoint and generator logic
- `templates/` Handlebars templates for dialogs or journal rendering
- `data/regions/` Region template definitions
- `docs/` Design notes and schemas

## Target Platform

- Foundry VTT v13, build 344
