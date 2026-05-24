# Changelog

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
