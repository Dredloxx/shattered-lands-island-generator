# Next Implementation Steps

## Current State

The module now has:
- a v13-targeted manifest
- a scene-control button for GMs
- a generator dialog
- sample region templates
- journal creation with metadata flags
- the first subsystem of the broader island generator in place

## Immediate Next Milestone

Make the module testable inside the existing Foundry world by:
1. copying it into the Foundry Data modules directory
2. enabling it in the target world
3. clicking the Shattered Lands scene control button
4. generating a test region journal

## After First In-World Test

1. confirm the scene control icon works in v13
2. verify the JournalEntry page renders cleanly
3. add at least 2 more region templates
4. move template data from JS constants to external JSON loading
5. decide whether each hex should become its own page or remain one structured overview page

## Follow-Up Milestone

After journal generation feels good, add:
- tile definition schema
- region tile asset references
- region placement coordinates
- tile placement action wired to the same generator flow
