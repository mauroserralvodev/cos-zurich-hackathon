"use client";

import type { SimulationResult } from "@/lib/collective-os/types";
import ResultsPanel from "./ResultsPanel";

type ResultsViewProps = {
  result: SimulationResult;
};

export default function ResultsView({ result }: ResultsViewProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto pr-2 no-scrollbar">
      <div className="space-y-3">
        <ResultsPanel result={result} />
      </div>
    </div>
  );
}