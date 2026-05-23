# Shattered Lands Island Generator

Foundry VTT module scaffold for generating Shattered Lands island regions.

## Current Scope

This repo is for the **full island generator project**.

The first implemented subsystem is **region journal generation**, which gives us the content backbone for later map and tile automation.

## MVP Goal

Create a Foundry module that lets a GM:

1. Click a button from the Journal sidebar or scene controls.
2. Choose a region template.
3. Generate a journal entry with:
   - region summary
   - 7 hex sections
   - hooks, threats, discoveries, and GM notes
4. Grow from there into region tile placement and full island assembly.

## Planned Milestones

### Milestone 1, Journal Backbone
- Module scaffold
- Register settings
- Add `Generate Region Journal` dialog
- Load region templates from JSON
- Create a Foundry JournalEntry from structured data

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
- JournalEntry pages are the primary output target

## Open Questions

- Whether generated journals should be plain text, HTML, or richer page-based multi-page entries
- Whether each hex should become a separate journal page later
