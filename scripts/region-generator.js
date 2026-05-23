import { REGION_TEMPLATES } from "./region-data.js";

export function pickRegionTemplate(templateId) {
  return REGION_TEMPLATES.find((entry) => entry.id === templateId) ?? null;
}

export function generateRegionJournalContent(template, { regionName, sceneName } = {}) {
  const title = regionName?.trim() || template.name;

  const hexSections = template.hexes.map((hex) => `
    <section>
      <h2>${hex.label}: ${hex.terrain}</h2>
      <p><strong>Feature Type:</strong> ${hex.featureType}</p>
      <p><strong>Occupants/Threats:</strong> ${hex.occupants}</p>
      <p><strong>Discovery:</strong> ${hex.discovery}</p>
      <p><strong>Adventure Hook:</strong> ${hex.hook}</p>
      <p><strong>GM Note:</strong> ${hex.gmNote}</p>
    </section>
  `).join("\n");

  const sceneBlock = sceneName
    ? `<p><strong>Scene Context:</strong> ${sceneName}</p>`
    : "";

  const html = `
    <h1>Region: ${title}</h1>
    ${sceneBlock}
    <p><strong>Region Type:</strong> ${template.regionType}</p>
    <p><strong>Danger Level:</strong> ${template.dangerLevel}</p>
    <p><strong>Faction Influence:</strong> ${template.factionInfluence.join(", ")}</p>
    <p><strong>Theme Tags:</strong> ${template.themeTags.join(", ")}</p>
    <p><strong>Travel Feel:</strong> ${template.travelFeel}</p>
    <hr/>
    <p>${template.summary}</p>
    <hr/>
    ${hexSections}
  `;

  return { title: `Region: ${title}`, html };
}
