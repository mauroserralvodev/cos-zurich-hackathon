"use client";

import type { StimulusFormState } from "@/lib/collective-os/types";
import StimulusForm from "./StimulusForm";

type StimulusSimulationViewProps = {
  form: StimulusFormState;
  setForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
  showTopFade: boolean;
  showBottomFade: boolean;
  updateScrollFades: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export default function StimulusSimulationView({
  form,
  setForm,
  scrollRef,
  showTopFade,
  showBottomFade,
  updateScrollFades,
}: StimulusSimulationViewProps) {
  return (
    <div className="relative min-h-0 flex-1">
      {showTopFade && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-15 bg-linear-to-b from-neutral-50 to-transparent" />
      )}

      {showBottomFade && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-15 bg-linear-to-t from-neutral-50 to-transparent" />
      )}

      <div
        ref={scrollRef}
        onScroll={updateScrollFades}
        className="h-full overflow-y-auto pr-2 no-scrollbar"
      >
        <div className="space-y-3">
          <StimulusForm form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
}