# Install Notes

## Current Module Path

`/home/dredlox/.openclaw/workspace/shattered-lands/island-generator`

## Manual Install

Copy or symlink this folder into your Foundry VTT Data `modules` directory, then enable:

`Shattered Lands Island Generator`

## First Test

1. Open the target world in Foundry v13.
2. Enable the module.
3. Try one of these entry points:
   - Game Settings -> Module Settings -> Shattered Lands Island Generator -> Open Generator
   - Journal sidebar header button
   - Notes controls button
   - browser console: `game.shatteredLandsIslandGenerator.openRegionJournalGenerator()`
4. Generate a test journal and confirm it appears in the journal directory.

## Notes

This is the full island-generator project, but right now the implemented feature set is still journal-first. Tile placement is not implemented yet.
