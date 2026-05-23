export const REGION_TEMPLATES = [
  {
    id: "stormbreak-coast-01",
    name: "Stormbreak Coast",
    regionType: "Storm-worn tropical coast",
    dangerLevel: "Medium",
    factionInfluence: ["Wreck scavengers", "Imperial surveyors"],
    themeTags: ["shipwrecks", "salt rot", "old wards"],
    travelFeel: "Wind-battered shores, humid jungle paths, and unstable stone ridges.",
    summary: "A fractured coastal region where wreckage, old magic, and opportunistic raiders create constant tension.",
    hexes: [
      {
        label: "Hex 1",
        terrain: "Beach cove",
        featureType: "Minor Feature",
        occupants: "Carrion crabs and scavenger birds",
        discovery: "A broken cargo chest with waterlogged charts",
        hook: "One chart references an inland shrine marked with a warning sigil.",
        gmNote: "Foreshadows Hex 5."
      },
      {
        label: "Hex 2",
        terrain: "Jungle path",
        featureType: "Travel",
        occupants: "Skittish reptiles and biting insects",
        discovery: "Fresh bootprints vanishing into heavy brush",
        hook: "A cautious party can shadow the tracks to a hidden camp.",
        gmNote: "Use as pacing space."
      },
      {
        label: "Hex 3",
        terrain: "Cliff overlook",
        featureType: "Encounter",
        occupants: "A scavenger lookout with trained glider lizards",
        discovery: "Signal mirrors pointed toward the sea",
        hook: "The lookout can reveal which wrecks were deliberately lured ashore.",
        gmNote: "Can become social or combat."
      },
      {
        label: "Hex 4",
        terrain: "Mangrove inlet",
        featureType: "Minor Feature",
        occupants: "No permanent occupants",
        discovery: "A half-sunken skiff carrying ceremonial masks",
        hook: "The masks belong to a nearby island culture and were not meant to be here.",
        gmNote: "Good clue hex."
      },
      {
        label: "Hex 5",
        terrain: "Ruin-choked ridge",
        featureType: "Adventure Site",
        occupants: "Storm-touched guardians bound to old wardstones",
        discovery: "A cracked shrine with a sealed lower chamber",
        hook: "The chamber contains a map fragment tied to another region.",
        gmNote: "Primary set-piece hex."
      },
      {
        label: "Hex 6",
        terrain: "Interior jungle basin",
        featureType: "Secret",
        occupants: "A hidden hermit observer",
        discovery: "A freshwater pool under luminous vines",
        hook: "The hermit knows why imperial scouts are really here.",
        gmNote: "Reward cautious exploration."
      },
      {
        label: "Hex 7",
        terrain: "Broken watch post",
        featureType: "Faction Activity",
        occupants: "Imperial surveyors under guard",
        discovery: "Survey stakes hammered into ancient stone",
        hook: "Their maps imply a planned claim over the whole island chain.",
        gmNote: "Strong campaign-pressure hex."
      }
    ]
  },
  {
    id: "ember-isle-01",
    name: "Ember Isle",
    regionType: "Volcanic jungle island",
    dangerLevel: "High",
    factionInfluence: ["Ash cult remnants", "Independent salvagers"],
    themeTags: ["ashfall", "lava vents", "buried relics"],
    travelFeel: "Hot stone underfoot, sulfur in the air, and sudden bursts of tropical overgrowth.",
    summary: "A dangerous island region where volcanic activity and old rites have left the land unstable and spiritually charged.",
    hexes: [
      {
        label: "Hex 1",
        terrain: "Black sand shore",
        featureType: "Travel",
        occupants: "Heat-hazed scavengers and skittish shore birds",
        discovery: "Obsidian shards arranged in a ritual spiral",
        hook: "The spiral marks a safe landing known only to former cult guides.",
        gmNote: "Low-pressure entry hex."
      },
      {
        label: "Hex 2",
        terrain: "Steam jungle",
        featureType: "Encounter",
        occupants: "Boar-sized reptiles flushed from cover by geothermal vents",
        discovery: "A scorched camp with journals fused by heat",
        hook: "The camp journal mentions a relic vault deeper inland.",
        gmNote: "Good early danger beat."
      },
      {
        label: "Hex 3",
        terrain: "Cracked lava field",
        featureType: "Minor Feature",
        occupants: "No permanent occupants",
        discovery: "Heat shimmer reveals a hidden stone causeway at dusk",
        hook: "The causeway only becomes visible during temperature drops.",
        gmNote: "Environmental puzzle hex."
      },
      {
        label: "Hex 4",
        terrain: "Basalt shrine",
        featureType: "Adventure Site",
        occupants: "Fanatics attempting to rekindle old ward-fires",
        discovery: "A shrine core humming with unstable energy",
        hook: "If reactivated, the shrine can calm or worsen the island's eruptions.",
        gmNote: "Primary dramatic hex."
      },
      {
        label: "Hex 5",
        terrain: "Canopy ravine",
        featureType: "Secret",
        occupants: "A hidden salvage broker and two guards",
        discovery: "Crates of relics tagged for off-island sale",
        hook: "The broker has already sold one key artifact to a rival faction.",
        gmNote: "Useful faction connector."
      },
      {
        label: "Hex 6",
        terrain: "Ash orchard ruins",
        featureType: "Minor Feature",
        occupants: "Charred insect swarms",
        discovery: "Stone fruit trees still bearing warm, ember-like pods",
        hook: "The pods can be refined into a rare alchemical fuel.",
        gmNote: "Reward/resource hex."
      },
      {
        label: "Hex 7",
        terrain: "Outer vent ridge",
        featureType: "Faction Activity",
        occupants: "Salvagers surveying a new fissure line",
        discovery: "Fresh cracks exposing ancient masonry below",
        hook: "The fissure has opened a path into something older than the cult.",
        gmNote: "Strong follow-up hook hex."
      }
    ]
  }
];
