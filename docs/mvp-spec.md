# MVP Spec

## Goal

Build the first useful slice of the broader Shattered Lands island generator for Foundry.

## User Story

As a GM, I want the island generator to create a structured journal for a 7-hex region so I can immediately run or expand that island region during prep or play.

## Target Runtime

- Foundry VTT v13 build 344

## MVP Scope

### Included
- Foundry module scaffold
- One sample region template
- One dialog to select a template
- One generated JournalEntry with a page containing:
  - region metadata
  - summary
  - seven hex sections

### Excluded for now
- Tile placement
- Scene notes
- Walls, lighting, sounds
- AI calls
- Per-hex page splitting
- Persistent random seed

## Data Model Draft

Each region template should define:
- `id`
- `name`
- `regionType`
- `dangerLevel`
- `factionInfluence[]`
- `themeTags[]`
- `travelFeel`
- `summary`
- `hexes[]`

Each hex should define:
- `label`
- `terrain`
- `featureType`
- `occupants`
- `discovery`
- `hook`
- `gmNote`

## Next Build Targets

1. Make region templates load from external JSON files.
2. Add lightweight random variation tables.
3. Add scene control button.
4. Add region tile definitions and placement coordinates.
