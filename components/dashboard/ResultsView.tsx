"use client";

import type { SimulationResult, StimulusFormState } from "@/lib/collective-os/types";
import ResultsPanel from "./ResultsPanel";

type ResultsViewProps = {
  result: SimulationResult;
  stimulusType: StimulusFormState["type"];
};

export default function ResultsView({ result, stimulusType }: ResultsViewProps) {
  return <ResultsPanel result={result} stimulusType={stimulusType} />;
}