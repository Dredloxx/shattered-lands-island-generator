import { ISLAND_REGION_LAYOUT, REGION_TEMPLATES } from "./region-data.js";
import { generateIslandJournalContent } from "./region-generator.js";

const MODULE_ID = "shattered-lands-island-generator";

Hooks.once("init", () => {
  console.log("[SL Island Generator] Initializing module");

  game.settings.registerMenu(MODULE_ID, "openGeneratorMenu", {
    name: "Generate Island Journal",
    label: "Generate Island",
    hint: "Generate or update the island journal for the current scene.",
    icon: "fas fa-map",
    type: IslandGeneratorLauncher,
    restricted: true
  });

  game.settings.register(MODULE_ID, "defaultFolderName", {
    name: "Default Journal Folder",
    hint: "Folder name used for generated Shattered Lands island journals.",
    scope: "world",
    config: true,
    type: String,
    default: "Shattered Lands Islands"
  });

  game.settings.register(MODULE_ID, "prefixSceneName", {
    name: "Prefix Scene Name",
    hint: "Add the current scene name to generated island journal titles when available.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.once("ready", () => {
  game.shatteredLandsIslandGenerator = {
    openIslandJournalGenerator: openGenerator,
    openRegionJournalGenerator: openGenerator,
    createOrUpdateIslandJournal,
    templates: REGION_TEMPLATES,
    islandLayout: ISLAND_REGION_LAYOUT
  };

  window.shatteredLandsIslandGenerator = game.shatteredLandsIslandGenerator;

  console.log("[SL Island Generator] Ready");
});

Hooks.on("renderJournalDirectory", (_app, html) => {
  if (!game.user?.isGM) return;
  if (html[0]?.querySelector(`button[data-action="${MODULE_ID}-generate"]`)) return;

  const headerActions = html[0]?.querySelector(".directory-header .header-actions")
    ?? html[0]?.querySelector(".directory-header")
    ?? html[0];

  if (!headerActions) return;

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = `${MODULE_ID}-generate`;
  button.innerHTML = '<i class="fas fa-map"></i> Generate Island Journal';
  button.addEventListener("click", () => openGenerator());
  headerActions.appendChild(button);
});

Hooks.on("getSceneControlButtons", () => {
  return;
});

async function openGenerator() {
  const activeScene = game.scenes?.current;
  const islandName = activeScene?.name ? `${activeScene.name} Island` : "Generated Island";
  return createOrUpdateIslandJournal({ islandName });
}

async function createOrUpdateIslandJournal({ islandName } = {}) {
  const prefixSceneName = game.settings.get(MODULE_ID, "prefixSceneName");
  const folderName = game.settings.get(MODULE_ID, "defaultFolderName");
  const activeScene = game.scenes?.current;

  let folder = game.folders?.find((entry) => entry.type === "JournalEntry" && entry.name === folderName);
  if (!folder) {
    folder = await Folder.create({ name: folderName, type: "JournalEntry" });
  }

  const finalIslandName = buildIslandName({ islandName, activeScene, prefixSceneName });
  const generated = generateIslandJournalContent({
    islandName: finalIslandName,
    sceneName: activeScene?.name ?? null
  });

  const existingJournal = game.journal?.find((entry) => {
    const flags = entry.flags?.[MODULE_ID];
    return flags?.sceneId && flags.sceneId === activeScene?.id;
  });

  if (existingJournal) {
    const page = existingJournal.pages?.contents?.[0] ?? existingJournal.pages?.[0];
    if (page) {
      await page.update({
        name: "Overview",
        "text.content": generated.html,
        "text.format": 1
      });
    }

    await existingJournal.update({
      name: generated.title,
      folder: folder.id,
      flags: {
        [MODULE_ID]: {
          generatedAt: new Date().toISOString(),
          sceneId: activeScene?.id ?? null,
          sceneName: activeScene?.name ?? null,
          regionCount: generated.regionCount
        }
      }
    });

    ui.notifications.info(`Updated island journal: ${existingJournal.name}`);
    await existingJournal.sheet?.render(true);
    await existingJournal.sheet?.maximize?.();
    return existingJournal;
  }

  const journal = await JournalEntry.create({
    name: generated.title,
    folder: folder.id,
    pages: [
      {
        name: "Overview",
        type: "text",
        text: {
          format: 1,
          content: generated.html
        }
      }
    ],
    flags: {
      [MODULE_ID]: {
        generatedAt: new Date().toISOString(),
        sceneId: activeScene?.id ?? null,
        sceneName: activeScene?.name ?? null,
        regionCount: generated.regionCount
      }
    }
  });

  ui.notifications.info(`Created island journal: ${journal.name}`);
  await journal.sheet?.render(true);
  await journal.sheet?.maximize?.();
  return journal;
}

function buildIslandName({ islandName, activeScene, prefixSceneName }) {
  const trimmed = islandName?.trim();
  if (trimmed) return trimmed;
  if (prefixSceneName && activeScene?.name) return `${activeScene.name} Island`;
  return "Generated Island";
}

class IslandGeneratorLauncher extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-launcher`,
    tag: "div",
    window: {
      title: "Shattered Lands Island Generator"
    }
  };

  async _renderHTML() {
    await openGenerator();
    return "<div></div>";
  }
}
