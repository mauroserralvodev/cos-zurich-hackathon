import type { ParameterBlockId, Person } from "@/lib/collective-os/types";
import type { SimulationApiResult } from "./simulation-result-schema";

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function labelFromScore(score: number): "Positive" | "Neutral" | "Negative" {
  if (score >= 60) return "Positive";
  if (score >= 42) return "Neutral";
  return "Negative";
}

function normalizeWeight(value: number, limit = 18) {
  return clamp(value, -limit, limit);
}

export function applySimulationScoresToPeople(
  people: Person[],
  result: SimulationApiResult,
  selectedBlocks: ParameterBlockId[]
): Person[] {
  return people.map((person) => {
    const w = result.weights;

    const activeContributions: number[] = [];

    if (selectedBlocks.includes("ideology")) {
      activeContributions.push(normalizeWeight(w.ideology[person.ideology]));
    }

    if (selectedBlocks.includes("income")) {
      activeContributions.push(normalizeWeight(w.income[person.income]));
    }

    if (selectedBlocks.includes("education")) {
      activeContributions.push(normalizeWeight(w.education[person.education]));
    }

    if (selectedBlocks.includes("urbanContext")) {
      activeContributions.push(normalizeWeight(w.areaType[person.areaType]));
    }

    if (selectedBlocks.includes("institutionalTrust")) {
      activeContributions.push(normalizeWeight(w.trust[person.trust]));
    }

    if (selectedBlocks.includes("innovationAdoption")) {
      activeContributions.push(normalizeWeight(w.adoption[person.adoption]));
    }

    if (selectedBlocks.includes("priceSensitivity")) {
      activeContributions.push(
        normalizeWeight(w.priceSensitivity[person.priceSensitivity])
      );
    }

    if (selectedBlocks.includes("age")) {
      activeContributions.push(normalizeWeight(w.ageGroup[person.ageGroup]));
    }

    const safeBaseScore = clamp(w.baseScore, 32, 68);

    const contributionTotal = activeContributions.reduce(
      (sum, value) => sum + value,
      0
    );

    const scaledContribution =
      activeContributions.length > 0
        ? contributionTotal * 1
        : 0;

    const score = clamp(Math.round(safeBaseScore + scaledContribution));

    return {
      ...person,
      sentiment: score,
      sentimentLabel: labelFromScore(score),
    };
  });
}