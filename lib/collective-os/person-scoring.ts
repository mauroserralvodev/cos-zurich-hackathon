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

    const contributions: { label: string; value: number }[] = [];

    if (selectedBlocks.includes("ideology")) {
      contributions.push({
        label: `Ideology: ${person.ideology}`,
        value: normalizeWeight(w.ideology[person.ideology]),
      });
    }

    if (selectedBlocks.includes("income")) {
      contributions.push({
        label: `Income: ${person.income}`,
        value: normalizeWeight(w.income[person.income]),
      });
    }

    if (selectedBlocks.includes("education")) {
      contributions.push({
        label: `Education: ${person.education}`,
        value: normalizeWeight(w.education[person.education]),
      });
    }

    if (selectedBlocks.includes("urbanContext")) {
      contributions.push({
        label: `Area: ${person.areaType}`,
        value: normalizeWeight(w.areaType[person.areaType]),
      });
    }

    if (selectedBlocks.includes("institutionalTrust")) {
      contributions.push({
        label: `Trust: ${person.trust}`,
        value: normalizeWeight(w.trust[person.trust]),
      });
    }

    if (selectedBlocks.includes("innovationAdoption")) {
      contributions.push({
        label: `Adoption: ${person.adoption}`,
        value: normalizeWeight(w.adoption[person.adoption]),
      });
    }

    if (selectedBlocks.includes("priceSensitivity")) {
      contributions.push({
        label: `Price sensitivity: ${person.priceSensitivity}`,
        value: normalizeWeight(w.priceSensitivity[person.priceSensitivity]),
      });
    }

    if (selectedBlocks.includes("age")) {
      contributions.push({
        label: `Age group: ${person.ageGroup}`,
        value: normalizeWeight(w.ageGroup[person.ageGroup]),
      });
    }

    const safeBaseScore = clamp(w.baseScore, 35, 65);

    const contributionTotal = contributions.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const scaledContribution =
      contributions.length > 0 ? contributionTotal * 0.72 : 0;

    const score = clamp(Math.round(safeBaseScore + scaledContribution));

    const strongestContribution =
      contributions.length > 0
        ? [...contributions].sort(
            (a, b) => Math.abs(b.value) - Math.abs(a.value)
          )[0]
        : undefined;

    return {
      ...person,
      sentiment: score,
      sentimentLabel: labelFromScore(score),
      topDriver: strongestContribution?.label,
    };
  });
}