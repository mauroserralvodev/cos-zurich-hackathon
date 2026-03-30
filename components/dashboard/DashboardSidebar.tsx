"use client";

import Image from "next/image";
import { ArrowLeft, BookOpen, LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import type {
  DashboardPhase,
  ManualStats,
  OperationalReview,
  ParameterBlockId,
  SimulationResult,
  StimulusFormState,
} from "@/lib/collective-os/types";
import AddParameterModal from "./modals/AddParameterModal";
import PopulationSetupView from "./views/PopulationSetupView";
import StimulusTemplateModal from "./modals/StimulusTemplateModal";
import StimulusSimulationView from "./views/StimulusSimulationView";
import ResultsView from "./views/ResultsView";

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
  selectedBlocks: ParameterBlockId[];
  setSelectedBlocks: React.Dispatch<React.SetStateAction<ParameterBlockId[]>>;
  isSimulating: boolean;
  operationalReview: OperationalReview | null;
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
  onPrimaryAction,
  onBack,
  accent,
  stimulusForm,
  setStimulusForm,
  simulationResult,
  selectedBlocks,
  setSelectedBlocks,
  isSimulating,
  operationalReview,
}: DashboardSidebarProps) {
  const [showAddParameterModal, setShowAddParameterModal] = useState(false);
  const [showStimulusTemplateModal, setShowStimulusTemplateModal] = useState(false);

  const toggleBlock = (blockId: ParameterBlockId) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((item) => item !== blockId)
        : [...prev, blockId]
    );
  };

  const applyStimulusTemplate = (template: StimulusFormState) => {
    setStimulusForm(template);
    setShowStimulusTemplateModal(false);
  };

  return (
    <>
      <AddParameterModal
        open={showAddParameterModal}
        selectedBlocks={selectedBlocks}
        onToggleBlock={toggleBlock}
        onClose={() => setShowAddParameterModal(false)}
      />

      <StimulusTemplateModal
        open={showStimulusTemplateModal}
        onClose={() => setShowStimulusTemplateModal(false)}
        onApplyTemplate={applyStimulusTemplate}
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

          <div className="flex items-center gap-2">
            {phase === "setup" && (
              <button
                type="button"
                onClick={() => setShowAddParameterModal(true)}
                disabled={isSimulating}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dashed border-neutral-300 transition hover:border-[#FF5500] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Add parameter"
              >
                <Plus className="h-5 w-5 text-neutral-500 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#FF5500]" />
              </button>
            )}

            {phase !== "setup" && (
              <button
                type="button"
                onClick={onBack}
                disabled={isSimulating}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dashed border-black/10 bg-neutral-50 transition hover:border-black/20 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-500" />
              </button>
            )}

            {phase === "stimulus" && (
              <button
                type="button"
                onClick={() => setShowStimulusTemplateModal(true)}
                disabled={isSimulating}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dashed bg-neutral-50 transition border-[#FF5500]/40 hover:bg-[#FF5500]/10 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Open stimulus templates"
              >
                <BookOpen className="h-5 w-5 transition text-[#FF5500]" />
              </button>
            )}
          </div>
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
            scrollRef={scrollRef}
            showTopFade={showTopFade}
            showBottomFade={showBottomFade}
            updateScrollFades={updateScrollFades}
          />
        )}

        {phase === "results" && (
          <ResultsView
            result={simulationResult}
            stimulusType={stimulusForm.type}
            operationalReview={operationalReview}
            scrollRef={scrollRef}
            showTopFade={showTopFade}
            showBottomFade={showBottomFade}
            updateScrollFades={updateScrollFades}
          />
        )}
        
        <div className="shrink-0 pt-4">
          <button
            onClick={onPrimaryAction}
            disabled={isSimulating || (phase === "setup" && selectedBlocks.length === 0)}
            className="h-12 w-full cursor-pointer rounded-3xl px-4 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: accent }}
          >
            {isSimulating
              ? "Running simulation..."
              : phase === "setup"
                ? "Continue"
                : phase === "stimulus"
                  ? "Run simulation"
                  : "Run again"}
          </button>
        </div>
      </section>
      
      {isSimulating && (
        <div className="absolute inset-1 z-200 flex items-center justify-center bg-neutral-50/65 backdrop-blur-md md:inset-1">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative h-24 w-24 overflow-hidden">
              <Image
                src="/cos-logo.png"
                alt="COS logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center gap-3 rounded-full ">
              <LoaderCircle className="h-4 w-4 animate-spin text-neutral-700" />
              <span className="text-md text-neutral-800">
                Running simulation
              </span>
            </div>

            <p className="max-w-55 text-xs leading-5 text-neutral-600">
              Processing the stimulus and calculating group reactions.
            </p>
          </div>
        </div>
      )}
    </>
  );
}