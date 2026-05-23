import { REGION_TEMPLATES } from "./region-data.js";
import { generateRegionJournalContent, pickRegionTemplate } from "./region-generator.js";

const MODULE_ID = "shattered-lands-island-generator";

Hooks.once("init", () => {
  console.log("[SL Island Generator] Initializing module");

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

  console.log("[SL Island Generator] Ready");
});

Hooks.on("getJournalDirectoryEntryContext", (_html, entries) => {
  entries.push({
    name: "Generate Shattered Lands Region Journal",
    icon: '<i class="fas fa-map"></i>',
    condition: () => game.user?.isGM,
    callback: () => openGenerator()
  });
});

Hooks.on("getSceneControlButtons", (controls) => {
  if (!game.user?.isGM) return;

  controls.push({
    name: "sl-island-generator",
    title: "Shattered Lands",
    icon: "fas fa-island-tropical",
    layer: "TilesLayer",
    tools: [
      {
        name: "generate-region-journal",
        title: "Generate Region Journal",
        icon: "fas fa-book-open",
        button: true,
        onClick: () => openGenerator()
      }
    ]
  });
});

async function openGenerator() {
  const templateOptions = REGION_TEMPLATES.map((template) => `\n        <option value="${template.id}">${template.name}</option>`).join("");
  const activeScene = game.scenes?.current;
  const suggestedName = activeScene ? `${activeScene.name} Region` : "";

  const content = `
    <form>
      <div class="form-group">
        <label>Region Template</label>
        <select name="templateId">${templateOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Region Name Override</label>
        <input type="text" name="regionName" value="${suggestedName}" placeholder="Optional custom name" />
      </div>
    </form>
  `;

  return Dialog.prompt({
    title: "Generate Region Journal",
    content,
    label: "Generate",
    callback: async (html) => {
      const form = html.querySelector("form");
      const formData = new FormDataExtended(form).object;
      return createRegionJournal(formData);
    }
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
