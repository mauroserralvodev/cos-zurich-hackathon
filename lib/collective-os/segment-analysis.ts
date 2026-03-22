import type {
  ParameterBlockId,
  Person,
  SegmentSummary,
  SimulationAnalysis,
  DriverSummary,
} from "./types";

function round(value: number) {
  return Math.round(value);
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function percentage(part: number, total: number) {
  if (total <= 0) return 0;
  return round((part / total) * 100);
}

function buildSegmentSummary(label: string, people: Person[]): SegmentSummary {
  const count = people.length;
  const avg =
    count > 0
      ? people.reduce((sum, person) => sum + person.sentiment, 0) / count
      : 0;

  const positive = people.filter((p) => p.sentimentLabel === "Positive").length;
  const negative = people.filter((p) => p.sentimentLabel === "Negative").length;

  return {
    label,
    count,
    share: count,
    averageSentiment: round(avg),
    positiveRate: percentage(positive, count),
    negativeRate: percentage(negative, count),
  };
}

function withPopulationShare(
  summaries: SegmentSummary[],
  populationSize: number
): SegmentSummary[] {
  return summaries.map((summary) => ({
    ...summary,
    share: percentage(summary.count, populationSize),
  }));
}

function getStdDev(values: number[]) {
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function groupBy<T extends string>(
  people: Person[],
  keyGetter: (person: Person) => T
): Record<T, Person[]> {
  return people.reduce(
    (acc, person) => {
      const key = keyGetter(person);
      if (!acc[key]) acc[key] = [];
      acc[key].push(person);
      return acc;
    },
    {} as Record<T, Person[]>
  );
}

function summariesFromGroup<T extends string>(
  people: Person[],
  keyGetter: (person: Person) => T,
  labelFormatter?: (key: T) => string
) {
  const grouped = groupBy(people, keyGetter);

  const summaries = (Object.entries(grouped) as [T, Person[]][]).map(
    ([key, members]) =>
      buildSegmentSummary(labelFormatter ? labelFormatter(key) : key, members)
  );

  return withPopulationShare(summaries, people.length);
}

function getMinGroupSize(population: number) {
  return Math.max(12, Math.round(population * 0.08));
}

function getDriverLabel(block: ParameterBlockId) {
  switch (block) {
    case "age":
      return "Age";
    case "income":
      return "Income";
    case "education":
      return "Education";
    case "urbanContext":
      return "Urban context";
    case "ideology":
      return "Ideology";
    case "institutionalTrust":
      return "Institutional trust";
    case "innovationAdoption":
      return "Innovation adoption";
    case "priceSensitivity":
      return "Price sensitivity";
    default:
      return "Segment";
  }
}

function getDriverSummaries(
  people: Person[],
  selectedBlocks: ParameterBlockId[]
): DriverSummary[] {
  const drivers: DriverSummary[] = [];

  const blockConfigs: {
    block: ParameterBlockId;
    summaries: SegmentSummary[];
  }[] = [
    {
      block: "age",
      summaries: summariesFromGroup(people, (p) => p.ageGroup),
    },
    {
      block: "income",
      summaries: summariesFromGroup(people, (p) => p.income),
    },
    {
      block: "education",
      summaries: summariesFromGroup(people, (p) => p.education),
    },
    {
      block: "urbanContext",
      summaries: summariesFromGroup(people, (p) => p.areaType),
    },
    {
      block: "ideology",
      summaries: summariesFromGroup(people, (p) => p.ideology),
    },
    {
      block: "institutionalTrust",
      summaries: summariesFromGroup(people, (p) => p.trust),
    },
    {
      block: "innovationAdoption",
      summaries: summariesFromGroup(people, (p) => p.adoption),
    },
    {
      block: "priceSensitivity",
      summaries: summariesFromGroup(people, (p) => p.priceSensitivity),
    },
  ];

  for (const config of blockConfigs) {
    if (!selectedBlocks.includes(config.block)) continue;

    const valid = config.summaries.filter((item) => item.count >= getMinGroupSize(people.length));
    if (valid.length < 2) continue;

    const sorted = [...valid].sort(
      (a, b) => b.averageSentiment - a.averageSentiment
    );

    const best = sorted[0];
    const worst = sorted[sorted.length - 1];

    drivers.push({
      label: getDriverLabel(config.block),
      spread: Math.abs(best.averageSentiment - worst.averageSentiment),
      strongestPositive: best.label,
      strongestNegative: worst.label,
    });
  }

  return drivers.sort((a, b) => b.spread - a.spread).slice(0, 3);
}

export function analyzeSimulation(
  people: Person[],
  selectedBlocks: ParameterBlockId[]
): SimulationAnalysis {
  const positive = people.filter((p) => p.sentimentLabel === "Positive").length;
  const neutral = people.filter((p) => p.sentimentLabel === "Neutral").length;
  const negative = people.filter((p) => p.sentimentLabel === "Negative").length;

  const minGroupSize = getMinGroupSize(people.length);

  const allSegments = [
    ...summariesFromGroup(people, (p) => p.ageGroup),
    ...summariesFromGroup(people, (p) => p.ideology),
    ...summariesFromGroup(people, (p) => p.income),
    ...summariesFromGroup(people, (p) => p.education),
    ...summariesFromGroup(people, (p) => p.areaType),
    ...summariesFromGroup(people, (p) => p.trust),
    ...summariesFromGroup(people, (p) => p.adoption),
    ...summariesFromGroup(people, (p) => p.priceSensitivity),
  ].filter((segment) => segment.count >= minGroupSize);

  const topSupportiveSegments = [...allSegments]
    .sort((a, b) => b.averageSentiment - a.averageSentiment)
    .slice(0, 3);

  const topResistantSegments = [...allSegments]
    .sort((a, b) => a.averageSentiment - b.averageSentiment)
    .slice(0, 3);

  const zoneBreakdown = summariesFromGroup(
    people,
    (p) => p.zoneType,
    (zone) => zone
  ).sort((a, b) => b.averageSentiment - a.averageSentiment);

  const stdDev = getStdDev(people.map((p) => p.sentiment));
  const polarization = clamp(round(stdDev * 3.2));

  return {
    sentimentDistribution: {
      positive: percentage(positive, people.length),
      neutral: percentage(neutral, people.length),
      negative: percentage(negative, people.length),
    },
    polarization,
    topSupportiveSegments,
    topResistantSegments,
    zoneBreakdown,
    leadingDrivers: getDriverSummaries(people, selectedBlocks),
  };
}