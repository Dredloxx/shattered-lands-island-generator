# Changelog

## 0.1.0
- Shifted generation from single-region journals to full island journals
- Island journals now contain 7 regions, each with 7 hexes
- Generation now updates the scene-linked island journal in place instead of creating endless duplicates
- Updated module entry points and docs to match island-first behavior

## 0.0.9
- Made successful journal generation more obvious by opening the created journal immediately
- Kept the direct-create workflow but improved feedback so the action no longer feels invisible

## 0.0.8
- Fixed the scene control hook again by handling Foundry v13 hook arguments more defensively
- The module now searches hook arguments for the actual controls array instead of assuming the first argument is the payload
- Added better warnings when the controls payload cannot be resolved

## 0.0.7
- Fixed the scene control hook for Foundry v13 by handling the actual controls payload shape
- Added guardrails so the module no longer crashes scene controls when the hook argument is not a plain array
- Prevented duplicate tool insertion into the Notes control

## 0.0.6
- Replaced the deprecated FormApplication-based settings launcher with an ApplicationV2 launcher for Foundry v13
- Settings launcher now triggers direct region journal generation without relying on legacy form behavior

## 0.0.5
- Replaced the fragile prompt-based launcher with a direct journal generation fallback
- Generator now creates a journal immediately using the first region template and current scene context
- This prioritizes a reliable button workflow before reintroducing a richer selection dialog

## 0.0.4
- Fixed the generator dialog callback for Foundry v13's jQuery-wrapped dialog HTML
- Added a safer fallback when the form element cannot be read

## 0.0.3
- Added a reliable Module Settings launcher for the generator
- Exposed `game.shatteredLandsIslandGenerator.openRegionJournalGenerator()` as a direct fallback
- Improved install/test instructions with multiple entry points

## 0.0.2
- Improved Foundry v13 visibility for the journal generator entry points
- Added a Journal directory header button for generating region journals
- Moved the scene action onto the existing Notes controls for better v13 compatibility

## 0.0.1
- Initial island generator module scaffold
- Foundry v13 targeting
- Region journal generation as the first implemented subsystem
- Scene control button
- Sample region templates: Stormbreak Coast, Ember Isle
