"use client";

import Image from "next/image";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { DEFAULT_PARAMETER_BLOCKS } from "@/lib/collective-os/parameter-blocks";
import type {
  DashboardPhase,
  ManualStats,
  ParameterBlockId,
  SimulationResult,
  StimulusFormState,
} from "@/lib/collective-os/types";
import AddParameterModal from "./AddParameterModal";
import PopulationSetupView from "./PopulationSetupView";
import ResultsView from "./ResultsView";
import StimulusSimulationView from "./StimulusSimulationView";

type DashboardSidebarProps = {
  phase: DashboardPhase;
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  showTopFade: boolean;
  showBottomFade: boolean;
  updateScrollFades: () => void;
  hasStarted: boolean;
  onPrimaryAction: () => void;
  onBack: () => void;
  accent: string;
  stimulusForm: StimulusFormState;
  setStimulusForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
  simulationResult: SimulationResult;
};

export default function DashboardSidebar({
  phase,
  peopleCount,
  setPeopleCount,
  stats,
  setStats,
  scrollRef,
  showTopFade,
  showBottomFade,
  updateScrollFades,
  hasStarted,
  onPrimaryAction,
  onBack,
  accent,
  stimulusForm,
  setStimulusForm,
  simulationResult,
}: DashboardSidebarProps) {
  const [showAddParameterModal, setShowAddParameterModal] = useState(false);
  const [selectedBlocks, setSelectedBlocks] =
    useState<ParameterBlockId[]>(DEFAULT_PARAMETER_BLOCKS);

  const toggleBlock = (blockId: ParameterBlockId) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((item) => item !== blockId)
        : [...prev, blockId]
    );
  };

  return (
    <>
      <AddParameterModal
        open={showAddParameterModal}
        selectedBlocks={selectedBlocks}
        onToggleBlock={toggleBlock}
        onClose={() => setShowAddParameterModal(false)}
      />

      <section className="relative flex h-full min-h-0 flex-col p-5 md:p-6">
        <div className="mb-5 shrink-0 flex items-center justify-between">
          <div className="relative h-18 w-18 overflow-hidden">
            <Image
              src="/cos-logo.png"
              alt="COS logo"
              fill
              className="object-contain"
            />
          </div>

          {phase === "setup" ? (
            <button
              type="button"
              onClick={() => setShowAddParameterModal(true)}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dashed border-neutral-300 transition hover:border-[#FF5500]"
              aria-label="Add parameter"
            >
              <Plus className="h-5 w-5 text-neutral-500 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#FF5500]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dashed border-black/10 bg-neutral-50 transition hover:border-black/20 hover:bg-neutral-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-500" />
            </button>
          )}
        </div>

        {phase === "setup" && (
          <PopulationSetupView
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            stats={stats}
            setStats={setStats}
            selectedBlocks={selectedBlocks}
            scrollRef={scrollRef}
            showTopFade={showTopFade}
            showBottomFade={showBottomFade}
            updateScrollFades={updateScrollFades}
          />
        )}

        {phase === "stimulus" && (
          <StimulusSimulationView
            form={stimulusForm}
            setForm={setStimulusForm}
          />
        )}

        {phase === "results" && <ResultsView result={simulationResult} />}

        <div className="shrink-0 pt-4">
          <button
            onClick={onPrimaryAction}
            disabled={phase === "setup" && selectedBlocks.length === 0}
            className="h-12 w-full cursor-pointer rounded-3xl px-4 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: accent }}
          >
            {phase === "setup"
              ? "Continue"
              : phase === "stimulus"
                ? "Run simulation"
                : "Run again"}
          </button>
        </div>
      </section>
    </>
  );
}