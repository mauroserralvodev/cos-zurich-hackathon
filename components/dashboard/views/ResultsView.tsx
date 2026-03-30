"use client";

import type {
  OperationalReview,
  SimulationResult,
  StimulusFormState,
} from "@/lib/collective-os/types";
import ResultsPanel from "../cards/ResultsPanel";


type ResultsViewProps = {
  result: SimulationResult;
  stimulusType: StimulusFormState["type"];
  operationalReview: OperationalReview | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  showTopFade: boolean;
  showBottomFade: boolean;
  updateScrollFades: () => void;
};

export default function ResultsView({
  result,
  stimulusType,
  operationalReview,
  scrollRef,
  showTopFade,
  showBottomFade,
  updateScrollFades,
}: ResultsViewProps) {
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
        <div className="space-y-4">
          <ResultsPanel result={result} stimulusType={stimulusType} />

          {operationalReview && (
            <div className="rounded-3xl border border-black/10 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Operational review
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Post-simulation validation layer for consistency, risk and rollout readiness.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    {operationalReview.status}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    {operationalReview.riskBand} risk
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className="mb-2 text-sm text-neutral-500">
                    Consistency checks
                  </p>
                  <div className="space-y-2">
                    {operationalReview.consistencyChecks.map((item) => (
                      <p
                        key={item}
                        className="text-xs leading-5 text-neutral-700"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className="mb-2 text-sm text-neutral-500">
                    Recommended action
                  </p>
                  <p className="text-xs leading-5 text-neutral-700">
                    {operationalReview.recommendedAction}
                  </p>

                  <p className="mb-2 mt-4 text-sm text-neutral-500">
                    Review notes
                  </p>
                  <div className="space-y-2">
                    {operationalReview.reviewNotes.map((item) => (
                      <p
                        key={item}
                        className="text-xs leading-5 text-neutral-700"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}