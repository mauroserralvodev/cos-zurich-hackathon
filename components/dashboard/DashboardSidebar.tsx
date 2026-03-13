"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import type { ManualStats } from "@/lib/collective-os/types";
import AddParameterModal from "./AddParameterModal";
import BehavioralCard from "./BehavioralCard";
import PopulationCard from "./PopulationCard";
import SocioeconomicCard from "./SocioeconomicCard";

type DashboardSidebarProps = {
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
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
  hasStarted: boolean;
  onStartSimulation: () => void;
  accent: string;
};

export default function DashboardSidebar({
  peopleCount,
  setPeopleCount,
  stats,
  setStats,
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
  hasStarted,
  onStartSimulation,
  accent,
}: DashboardSidebarProps) {
  const [showAddParameterModal, setShowAddParameterModal] = useState(false);

  const cards = useMemo(
    () => [
      <PopulationCard
        key="population"
        peopleCount={peopleCount}
        setPeopleCount={setPeopleCount}
        stats={stats}
        setStats={setStats}
        ageTotal={ageTotal}
      />,
      <SocioeconomicCard
        key="socioeconomic"
        stats={stats}
        setStats={setStats}
        incomeTotal={incomeTotal}
        educationTotal={educationTotal}
        areaTotal={areaTotal}
      />,
      <BehavioralCard
        key="behavioral"
        stats={stats}
        setStats={setStats}
        ideologyTotal={ideologyTotal}
        trustTotal={trustTotal}
        adoptionTotal={adoptionTotal}
        priceSensitivityTotal={priceSensitivityTotal}
      />,
    ],
    [
      peopleCount,
      setPeopleCount,
      stats,
      setStats,
      ageTotal,
      incomeTotal,
      educationTotal,
      areaTotal,
      ideologyTotal,
      trustTotal,
      adoptionTotal,
      priceSensitivityTotal,
    ]
  );

  return (
    <section className="relative flex h-full min-h-0 flex-col p-5 md:p-6">
      <AddParameterModal
        open={showAddParameterModal}
        onClose={() => setShowAddParameterModal(false)}
      />

      <div className="mb-5 flex shrink-0 items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-18 w-18 overflow-hidden">
            <Image
              src="/logo.png"
              alt="COS logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddParameterModal(true)}
          className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 border-dashed transition hover:border-[#FF5500]"
          aria-label="Add parameter"
        >
          <Plus className="h-5 w-5 text-neutral-500 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#FF5500]" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        {showTopFade && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-15 bg-linear-to-b from-white to-transparent" />
        )}

        {showBottomFade && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-15 bg-linear-to-t from-white to-transparent" />
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollFades}
          className="h-full overflow-y-auto  no-scrollbar"
        >
          {cards.length > 0 ? (
            <div className="space-y-3">{cards}</div>
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 bg-neutral-50 px-5 py-8 text-center">
              <p className="text-sm font-medium text-neutral-900">
                No parameter cards yet
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Use the + button to simulate adding your first parameter.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 pt-4">
        <button
          onClick={onStartSimulation}
          className="h-12 w-full cursor-pointer rounded-3xl px-4 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
          style={{ backgroundColor: accent }}
        >
          {hasStarted ? "Regenerate simulation" : "Start simulation"}
        </button>
      </div>
    </section>
  );
}