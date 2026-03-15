"use client";

import type { StimulusFormState } from "@/lib/collective-os/types";
import StimulusForm from "./StimulusForm";

type StimulusSimulationViewProps = {
  form: StimulusFormState;
  setForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
};

export default function StimulusSimulationView({
  form,
  setForm,
}: StimulusSimulationViewProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto pr-2 no-scrollbar">
      <div className="space-y-3">
        <StimulusForm form={form} setForm={setForm} />
      </div>
    </div>
  );
}