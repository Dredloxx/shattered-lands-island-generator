import { ISLAND_REGION_LAYOUT, REGION_TEMPLATES } from "./region-data.js";

export function pickRegionTemplate(templateId) {
  return REGION_TEMPLATES.find((entry) => entry.id === templateId) ?? null;
}

export function generateIslandJournalContent({ islandName, sceneName } = {}) {
  const title = islandName?.trim() || "Generated Island";
  const regionBlocks = ISLAND_REGION_LAYOUT.map((region) => {
    const template = pickRegionTemplate(region.templateId);
    if (!template) return "";

    const hexSections = template.hexes.map((hex) => `
      <section>
        <h4>${hex.label}: ${hex.terrain}</h4>
        <p><strong>Feature Type:</strong> ${hex.featureType}</p>
        <p><strong>Occupants/Threats:</strong> ${hex.occupants}</p>
        <p><strong>Discovery:</strong> ${hex.discovery}</p>
        <p><strong>Adventure Hook:</strong> ${hex.hook}</p>
        <p><strong>GM Note:</strong> ${hex.gmNote}</p>
      </section>
    `).join("\n");

    return `
      <article>
        <h2>${region.label}: ${template.name}</h2>
        <p><strong>Region Role:</strong> ${region.regionRole}</p>
        <p><strong>Region Type:</strong> ${template.regionType}</p>
        <p><strong>Danger Level:</strong> ${template.dangerLevel}</p>
        <p><strong>Faction Influence:</strong> ${template.factionInfluence.join(", ")}</p>
        <p><strong>Theme Tags:</strong> ${template.themeTags.join(", ")}</p>
        <p><strong>Travel Feel:</strong> ${template.travelFeel}</p>
        <p>${template.summary}</p>
        ${hexSections}
      </article>
      <hr/>
    `;
  }).join("\n");

  const sceneBlock = sceneName ? `<p><strong>Scene Context:</strong> ${sceneName}</p>` : "";

  const html = `
    <h1>Island: ${title}</h1>
    ${sceneBlock}
    <p><strong>Structure:</strong> 7 regions, each containing 7 hexes.</p>
    <p><strong>Generation Mode:</strong> Regenerate in place for the current scene.</p>
    <hr/>
    ${regionBlocks}
  `;

  return {
    title: `Island: ${title}`,
    html,
    regionCount: ISLAND_REGION_LAYOUT.length
  };
}
