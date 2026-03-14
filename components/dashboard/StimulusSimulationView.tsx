"use client";

import type {
  SimulationResult,
  StimulusFormState,
} from "@/lib/collective-os/types";
import ResultsPanel from "./ResultsPanel";
import StimulusForm from "./StimulusForm";

type StimulusSimulationViewProps = {
  form: StimulusFormState;
  setForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
  result: SimulationResult;
};

export default function StimulusSimulationView({
  form,
  setForm,
  result,
}: StimulusSimulationViewProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto pr-2 no-scrollbar">
      <div className="space-y-3">
        <StimulusForm form={form} setForm={setForm} />
        <ResultsPanel result={result} />
      </div>
    </div>
  );
}