# MVP Spec

## Goal

Build the first useful slice of the broader Shattered Lands island generator for Foundry.

## Target Runtime

- Foundry VTT v13 build 344

## User Story

As a GM, I want the island generator to create a structured journal for an island made of 7 regions, each with 7 hexes, so I can immediately run or expand that island during prep or play.

## MVP Scope

### Included
- Foundry module scaffold
- Scene-linked island journal generation
- Overwrite-in-place behavior for the current scene's generated island journal
- One journal page containing:
  - island summary
  - 7 region sections
  - 7 hex entries inside each region

### Excluded for now
- Tile placement
- Scene notes
- Walls, lighting, sounds
- AI calls
- Per-region page splitting
- Persistent random seed

## Data Model Draft

Each island generation pass should define:
- island title
- scene context
- 7 region slots

Each region should define:
- region slot
- label
- role
- template reference
- 7 hexes

Each hex should define:
- label
- terrain
- featureType
- occupants
- discovery
- hook
- gmNote

## Next Build Targets

1. Add more region templates and region-role variation.
2. Add lightweight random variation tables.
3. Split regions into separate journal pages if helpful.
4. Add region tile definitions and placement coordinates.
