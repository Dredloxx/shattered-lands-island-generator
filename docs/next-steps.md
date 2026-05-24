# Next Implementation Steps

## Current State

The module now has:
- a v13-targeted manifest
- a scene-control button for GMs
- a journal directory button
- a settings launcher
- scene-linked island journal generation
- overwrite-in-place behavior for the current scene
- a 7-region by 7-hex content structure

## Immediate Next Milestone

Improve the island model by:
1. diversifying region template selection per island
2. making region roles affect the chosen content
3. optionally splitting each region into its own journal page

## Follow-Up Milestone

After island journal generation feels good, add:
- tile definition schema
- region tile asset references
- region placement coordinates
- tile placement action wired to the same generator flow
