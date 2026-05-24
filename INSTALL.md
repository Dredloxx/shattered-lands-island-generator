# Install Notes

## Current Module Path

`/home/dredlox/.openclaw/workspace/shattered-lands/island-generator`

## Manifest URL

`https://raw.githubusercontent.com/Dredloxx/shattered-lands-island-generator/main/module.json`

## First Test

1. Open the target world in Foundry v13.
2. Update/enable the module.
3. Use one of these entry points:
   - Game Settings -> Module Settings -> Shattered Lands Island Generator -> Generate Island
   - Journal sidebar header button
   - Notes controls button
   - browser console: `game.shatteredLandsIslandGenerator.openIslandJournalGenerator()`
4. Confirm an island journal opens immediately.
5. Run it again and confirm it updates the same scene-linked journal instead of making another one.

## Notes

This is still journal-first. Tile placement is not implemented yet.
