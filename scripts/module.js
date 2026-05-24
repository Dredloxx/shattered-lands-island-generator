import { REGION_TEMPLATES } from "./region-data.js";
import { generateRegionJournalContent, pickRegionTemplate } from "./region-generator.js";

const MODULE_ID = "shattered-lands-island-generator";

Hooks.once("init", () => {
  console.log("[SL Island Generator] Initializing module");

  game.settings.registerMenu(MODULE_ID, "openGeneratorMenu", {
    name: "Generate Default Region Journal",
    label: "Generate Journal",
    hint: "Generate a region journal immediately using the default template.",
    icon: "fas fa-map",
    type: RegionGeneratorLauncher,
    restricted: true
  });

  game.settings.register(MODULE_ID, "defaultFolderName", {
    name: "Default Journal Folder",
    hint: "Folder name used for generated Shattered Lands region journals.",
    scope: "world",
    config: true,
    type: String,
    default: "Shattered Lands Regions"
  });

  game.settings.register(MODULE_ID, "prefixSceneName", {
    name: "Prefix Scene Name",
    hint: "Add the current scene name to generated region journal titles when available.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.once("ready", () => {
  game.shatteredLandsIslandGenerator = {
    openRegionJournalGenerator: openGenerator,
    createRegionJournal,
    templates: REGION_TEMPLATES
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
  button.innerHTML = '<i class="fas fa-map"></i> Generate Region Journal';
  button.addEventListener("click", () => openGenerator());
  headerActions.appendChild(button);
});

Hooks.on("getSceneControlButtons", (...args) => {
  if (!game.user?.isGM) return;

  const controlsArray = args.find((value) => Array.isArray(value))
    ?? args.find((value) => Array.isArray(value?.controls))?.controls;

  if (!Array.isArray(controlsArray)) {
    console.warn("[SL Island Generator] Could not resolve scene controls payload", args);
    return;
  }

  const notesControl = controlsArray.find((control) => control?.name === "notes");
  if (!notesControl) return;

  notesControl.tools ??= [];
  if (notesControl.tools.some((tool) => tool.name === "generate-region-journal")) return;

  notesControl.tools.push({
    name: "generate-region-journal",
    title: "Generate Region Journal",
    icon: "fas fa-book-open",
    button: true,
    onClick: () => openGenerator()
  });
});

async function openGenerator() {
  const activeScene = game.scenes?.current;
  const suggestedName = activeScene ? `${activeScene.name} Region` : "";
  const template = REGION_TEMPLATES[0];

  if (!template) {
    ui.notifications.error("No region templates are available.");
    return null;
  }

  return createRegionJournal({
    templateId: template.id,
    regionName: suggestedName
  });
}

async function createRegionJournal({ templateId, regionName } = {}) {
  const template = pickRegionTemplate(templateId);
  if (!template) {
    ui.notifications.error("No region template was found.");
    return null;
  }

  const folderName = game.settings.get(MODULE_ID, "defaultFolderName");
  const prefixSceneName = game.settings.get(MODULE_ID, "prefixSceneName");
  const activeScene = game.scenes?.current;

  let folder = game.folders?.find((entry) => entry.type === "JournalEntry" && entry.name === folderName);
  if (!folder) {
    folder = await Folder.create({ name: folderName, type: "JournalEntry" });
  }

  const finalRegionName = buildRegionName({ template, regionName, activeScene, prefixSceneName });
  const generated = generateRegionJournalContent(template, {
    regionName: finalRegionName,
    sceneName: activeScene?.name ?? null
  });

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
        templateId: template.id,
        generatedAt: new Date().toISOString(),
        sceneId: activeScene?.id ?? null,
        sceneName: activeScene?.name ?? null
      }
    }
  });

  ui.notifications.info(`Created region journal: ${journal.name}`);
  journal.sheet?.render(true);
  return journal;
}

function buildRegionName({ template, regionName, activeScene, prefixSceneName }) {
  const trimmed = regionName?.trim();
  if (trimmed) return trimmed;
  if (prefixSceneName && activeScene?.name) return `${activeScene.name} - ${template.name}`;
  return template.name;
}

class RegionGeneratorLauncher extends foundry.applications.api.ApplicationV2 {
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
