"use client";

import type { SimulationResult } from "@/lib/collective-os/types";

type ResultsPanelProps = {
  result: SimulationResult;
};

function ResultBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm text-neutral-700">{label}</p>
        <p className="text-sm font-medium text-neutral-900">{value}%</p>
      </div>
      <div className="h-2.5 w-full rounded-full bg-neutral-200">
        <div
          className="h-2.5 rounded-full bg-[#FF5500]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
      <div className="mb-4">
        <p className="text-sm font-medium text-neutral-900">Synthetic response</p>
        <p className="mt-1 text-sm text-neutral-500">
          Mock output for the demo. Later this block will be filled from the API response.
        </p>
      </div>

      <div className="space-y-4">
        <ResultBar label="Public acceptance" value={result.publicAcceptance} />
        <ResultBar label="Purchase intent" value={result.purchaseIntent} />
        <ResultBar label="Trust impact" value={result.trustImpact} />
        <ResultBar label="Virality potential" value={result.virality} />
        <ResultBar label="Negative reaction" value={result.negativeReaction} />
      </div>
    </div>
  );
}