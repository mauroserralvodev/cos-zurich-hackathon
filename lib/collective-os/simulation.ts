import {
  SAMPLE_NAMES,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  ZURICH_PATH,
} from "./constants";
import type { AgeGroup, ManualStats, Person } from "./types";

export function clampPercentage(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildSeed(
  peopleCount: number,
  stats: ManualStats,
  simulationVersion: number
) {
  const raw = [
    peopleCount,
    stats.right,
    stats.left,
    stats.apolitical,
    stats.other,
    stats.lowIncome,
    stats.mediumIncome,
    stats.highIncome,
    stats.age18_24,
    stats.age25_39,
    stats.age40_64,
    stats.age65Plus,
    stats.basicEducation,
    stats.secondaryEducation,
    stats.higherEducation,
    stats.urban,
    stats.suburban,
    stats.rural,
    stats.lowTrust,
    stats.mediumTrust,
    stats.highTrust,
    stats.earlyAdopters,
    stats.mainstreamAdopters,
    stats.lateAdopters,
    stats.lowPriceSensitivity,
    stats.mediumPriceSensitivity,
    stats.highPriceSensitivity,
    simulationVersion,
  ].join("-");

  let hash = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickWeightedLabel<T extends string>(
  entries: { label: T; value: number }[],
  random: () => number,
  fallback: T
): T {
  const total = entries.reduce((acc, entry) => acc + entry.value, 0);
  if (total <= 0) return fallback;

  const rand = random() * total;
  let cumulative = 0;

  for (const entry of entries) {
    cumulative += entry.value;
    if (rand < cumulative) return entry.label;
  }

  return fallback;
}

function pickAgeGroup(
  stats: ManualStats,
  random: () => number
): AgeGroup {
  return pickWeightedLabel(
    [
      { label: "18-24", value: stats.age18_24 },
      { label: "25-39", value: stats.age25_39 },
      { label: "40-64", value: stats.age40_64 },
      { label: "65+", value: stats.age65Plus },
    ],
    random,
    "25-39"
  );
}

function ageFromGroup(group: AgeGroup, random: () => number) {
  if (group === "18-24") return 18 + Math.floor(random() * 7);
  if (group === "25-39") return 25 + Math.floor(random() * 15);
  if (group === "40-64") return 40 + Math.floor(random() * 25);
  return 65 + Math.floor(random() * 26);
}

function randomName(index: number) {
  return SAMPLE_NAMES[index % SAMPLE_NAMES.length];
}

type ZoneType = "Zurich Core" | "Urban Belt" | "Rural";

function pickZoneForPoint(px: number, py: number): ZoneType {
  const x = px / VIEWBOX_WIDTH;
  const y = py / VIEWBOX_HEIGHT;

  const dxZurich = x - 0.43;
  const dyZurich = y - 0.43;
  const distZurich = Math.sqrt(dxZurich * dxZurich + dyZurich * dyZurich);

  const dxUrban = x - 0.47;
  const dyUrban = y - 0.48;
  const distUrban = Math.sqrt(dxUrban * dxUrban + dyUrban * dyUrban);

  if (distZurich < 0.09) return "Zurich Core";
  if (distUrban < 0.18) return "Urban Belt";
  return "Rural";
}

function zoneAcceptanceWeight(zone: ZoneType) {
  if (zone === "Zurich Core") return 1;
  if (zone === "Urban Belt") return 0.45;
  return 0.16;
}

function pickAreaTypeFromZone(
  zoneType: ZoneType,
  stats: ManualStats,
  random: () => number
): Person["areaType"] {
  if (zoneType === "Zurich Core") {
    return pickWeightedLabel(
      [
        { label: "Urban", value: 88 },
        { label: "Suburban", value: 10 },
        { label: "Rural", value: 2 },
      ],
      random,
      "Urban"
    );
  }

  if (zoneType === "Urban Belt") {
    return pickWeightedLabel(
      [
        { label: "Urban", value: 28 },
        { label: "Suburban", value: 58 },
        { label: "Rural", value: 14 },
      ],
      random,
      "Suburban"
    );
  }

  return pickWeightedLabel(
    [
      { label: "Urban", value: 6 },
      { label: "Suburban", value: 24 },
      { label: "Rural", value: 70 },
    ],
    random,
    "Rural"
  );
}

function computeFakeSentiment(person: {
  ideology: Person["ideology"];
  income: Person["income"];
  education: Person["education"];
  areaType: Person["areaType"];
  trust: Person["trust"];
  adoption: Person["adoption"];
  priceSensitivity: Person["priceSensitivity"];
}): { sentiment: number; sentimentLabel: "Positive" | "Neutral" | "Negative" } {
  let score = 50;

  if (person.trust === "High") score += 16;
  if (person.trust === "Low") score -= 16;

  if (person.adoption === "Early") score += 12;
  if (person.adoption === "Late") score -= 10;

  if (person.priceSensitivity === "High") score -= 10;
  if (person.priceSensitivity === "Low") score += 6;

  if (person.education === "Higher") score += 5;
  if (person.income === "High") score += 4;
  if (person.income === "Low") score -= 4;

  if (person.areaType === "Urban") score += 4;
  if (person.areaType === "Rural") score -= 3;

  score = Math.max(0, Math.min(100, score));

  const sentimentLabel =
    score >= 67 ? "Positive" : score >= 40 ? "Neutral" : "Negative";

  return {
    sentiment: score,
    sentimentLabel,
  };
}

export function generatePeopleInZurichShape(
  count: number,
  stats: ManualStats,
  simulationVersion: number
): Person[] {
  if (typeof window === "undefined") return [];

  const canvas = document.createElement("canvas");
  canvas.width = VIEWBOX_WIDTH;
  canvas.height = VIEWBOX_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const path = new Path2D(ZURICH_PATH);
  const seed = buildSeed(count, stats, simulationVersion);
  const random = createSeededRandom(seed);

  const people: Person[] = [];
  let attempts = 0;
  const maxAttempts = count * 200;

  while (people.length < count && attempts < maxAttempts) {
    attempts++;

    const px = random() * VIEWBOX_WIDTH;
    const py = random() * VIEWBOX_HEIGHT;

    if (!ctx.isPointInPath(path, px, py)) continue;

    const zoneType = pickZoneForPoint(px, py);
    if (random() > zoneAcceptanceWeight(zoneType)) continue;

    const ageGroup = pickAgeGroup(stats, random);

    const ideology = pickWeightedLabel(
      [
        { label: "Right", value: stats.right },
        { label: "Left", value: stats.left },
        { label: "Apolitical", value: stats.apolitical },
        { label: "Other", value: stats.other },
      ],
      random,
      "Apolitical"
    );

    const income = pickWeightedLabel(
      [
        { label: "Low", value: stats.lowIncome },
        { label: "Medium", value: stats.mediumIncome },
        { label: "High", value: stats.highIncome },
      ],
      random,
      "Medium"
    );

    const education = pickWeightedLabel(
      [
        { label: "Basic", value: stats.basicEducation },
        { label: "Secondary", value: stats.secondaryEducation },
        { label: "Higher", value: stats.higherEducation },
      ],
      random,
      "Secondary"
    );

    const trust = pickWeightedLabel(
      [
        { label: "Low", value: stats.lowTrust },
        { label: "Medium", value: stats.mediumTrust },
        { label: "High", value: stats.highTrust },
      ],
      random,
      "Medium"
    );

    const adoption = pickWeightedLabel(
      [
        { label: "Early", value: stats.earlyAdopters },
        { label: "Mainstream", value: stats.mainstreamAdopters },
        { label: "Late", value: stats.lateAdopters },
      ],
      random,
      "Mainstream"
    );

    const priceSensitivity = pickWeightedLabel(
      [
        { label: "Low", value: stats.lowPriceSensitivity },
        { label: "Medium", value: stats.mediumPriceSensitivity },
        { label: "High", value: stats.highPriceSensitivity },
      ],
      random,
      "Medium"
    );

    const areaType = pickAreaTypeFromZone(zoneType, stats, random);

    const sentimentData = computeFakeSentiment({
      ideology,
      income,
      education,
      areaType,
      trust,
      adoption,
      priceSensitivity,
    });

    people.push({
      id: people.length + 1,
      name: randomName(people.length),
      ageGroup,
      age: ageFromGroup(ageGroup, random),
      ideology,
      income,
      education,
      areaType,
      trust,
      adoption,
      priceSensitivity,
      zoneType,
      sentiment: sentimentData.sentiment,
      sentimentLabel: sentimentData.sentimentLabel,
      x: (px / VIEWBOX_WIDTH) * 78,
      y: (py / VIEWBOX_HEIGHT) * 80,
    });
  }

  return people;
}