"use client";

import type { ManualStats, ParameterBlockId } from "@/lib/collective-os/types";
import UrbanContextBlock from "../Blocks/UrbanContextBlock";
import IdeologyBlock from "../Blocks/IdeologyBlock";
import InstitutionalTrustBlock from "../Blocks/InstitutionalTrustBlock";
import InnovationAdoptionBlock from "../Blocks/InnovationAdoptionBlock";
import PriceSensitivityBlock from "../Blocks/PriceSensitivityBlock";
import PopulationCard from "./PopulationCard";
import AgeBlock from "../Blocks/AgeBlock";
import IncomeBlock from "../Blocks/IncomeBlock";
import EducationBlock from "../Blocks/EducationBlock";


type PopulationSetupViewProps = {
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  selectedBlocks: ParameterBlockId[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  showTopFade: boolean;
  showBottomFade: boolean;
  updateScrollFades: () => void;
  ageTotal: number;
  incomeTotal: number;
  educationTotal: number;
  areaTotal: number;
  ideologyTotal: number;
  trustTotal: number;
  adoptionTotal: number;
  priceSensitivityTotal: number;
};

export default function PopulationSetupView({
  peopleCount,
  setPeopleCount,
  stats,
  setStats,
  selectedBlocks,
  scrollRef,
  showTopFade,
  showBottomFade,
  updateScrollFades,
  ageTotal,
  incomeTotal,
  educationTotal,
  areaTotal,
  ideologyTotal,
  trustTotal,
  adoptionTotal,
  priceSensitivityTotal,
}: PopulationSetupViewProps) {
  const blockMap: Record<ParameterBlockId, React.ReactNode> = {
    age: (
      <AgeBlock
        stats={stats}
        setStats={setStats}
        ageTotal={ageTotal}
      />
    ),
    income: (
      <IncomeBlock
        stats={stats}
        setStats={setStats}
        incomeTotal={incomeTotal}
      />
    ),
    education: (
      <EducationBlock
        stats={stats}
        setStats={setStats}
        educationTotal={educationTotal}
      />
    ),
    urbanContext: (
      <UrbanContextBlock
        stats={stats}
        setStats={setStats}
        areaTotal={areaTotal}
      />
    ),
    ideology: (
      <IdeologyBlock
        stats={stats}
        setStats={setStats}
        ideologyTotal={ideologyTotal}
      />
    ),
    institutionalTrust: (
      <InstitutionalTrustBlock
        stats={stats}
        setStats={setStats}
        trustTotal={trustTotal}
      />
    ),
    innovationAdoption: (
      <InnovationAdoptionBlock
        stats={stats}
        setStats={setStats}
        adoptionTotal={adoptionTotal}
      />
    ),
    priceSensitivity: (
      <PriceSensitivityBlock
        stats={stats}
        setStats={setStats}
        priceSensitivityTotal={priceSensitivityTotal}
      />
    ),
  };

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
          <PopulationCard
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
          />

          {selectedBlocks.length > 0 ? (
            selectedBlocks.map((blockId) => (
              <div key={blockId}>{blockMap[blockId]}</div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10  px-5 py-8 text-center">
              <p className="text-sm font-medium text-neutral-900">
                No parameter blocks selected
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Use the + button to add the blocks you want to evaluate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}