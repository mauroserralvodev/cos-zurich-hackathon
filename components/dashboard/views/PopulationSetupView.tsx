"use client";

import { useState } from "react";
import type { ManualStats, ParameterBlockId } from "@/lib/collective-os/types";
import UrbanContextBlock from "../../blocks/UrbanContextBlock";
import IdeologyBlock from "../../blocks/IdeologyBlock";
import InstitutionalTrustBlock from "../../blocks/InstitutionalTrustBlock";
import InnovationAdoptionBlock from "../../blocks/InnovationAdoptionBlock";
import PriceSensitivityBlock from "../../blocks/PriceSensitivityBlock";
import PopulationCard from "../cards/PopulationCard";
import AgeBlock from "../../blocks/AgeBlock";
import IncomeBlock from "../../blocks/IncomeBlock";
import EducationBlock from "../../blocks/EducationBlock";
import UploadFilesNoticeModal from "../modals/UploadFilesNoticeModal2";
import { FileText } from "lucide-react";

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
}: PopulationSetupViewProps) {
  const [isUploadNoticeOpen, setIsUploadNoticeOpen] = useState(false);

  const blockMap: Record<ParameterBlockId, React.ReactNode> = {
    age: <AgeBlock stats={stats} setStats={setStats} />,
    income: <IncomeBlock stats={stats} setStats={setStats} />,
    education: <EducationBlock stats={stats} setStats={setStats} />,
    urbanContext: <UrbanContextBlock stats={stats} setStats={setStats} />,
    ideology: <IdeologyBlock stats={stats} setStats={setStats} />,
    institutionalTrust: (
      <InstitutionalTrustBlock stats={stats} setStats={setStats} />
    ),
    innovationAdoption: (
      <InnovationAdoptionBlock stats={stats} setStats={setStats} />
    ),
    priceSensitivity: (
      <PriceSensitivityBlock stats={stats} setStats={setStats} />
    ),
  };

  return (
    <div className="relative min-h-0 flex-1">
      <UploadFilesNoticeModal
        open={isUploadNoticeOpen}
        onClose={() => setIsUploadNoticeOpen(false)}
      />

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

          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-4">
            <div className="flex min-h-36 flex-col items-center justify-center gap-2 text-center">
              <p className="text-md font-medium text-neutral-800">
                Add historical company data
              </p>

              <p className="max-w-64 text-xs  text-neutral-400">
                Upload feedback from past campaigns, reports, or internal data so
                the AI can simulate future reactions with better context.
              </p>

              <button
                type="button"
                onClick={() => setIsUploadNoticeOpen(true)}
                className="mt-2 flex items-center justify-center gap-3 cursor-pointer rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-neutral-700 transition hover:border-[#FF5500] hover:text-[#FF5500]"
              >
                Upload files <FileText size={18} className="text-neutral-500" />
              </button>
            </div>
          </div>

          {selectedBlocks.length > 0 ? (
            selectedBlocks.map((blockId) => (
              <div key={blockId}>{blockMap[blockId]}</div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 px-5 py-8 text-center">
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