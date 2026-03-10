"use client";

import Image from "next/image";
import type { ManualStats } from "@/lib/collective-os/types";
import PopulationCard from "./PopulationCard";
import SocioeconomicCard from "./SocioeconomicCard";
import BehavioralCard from "./BehavioralCard";

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
  return (
    <section className="flex h-full min-h-0 flex-col p-5 md:p-6">
      <div className="mb-5 shrink-0 flex items-center">
        <div className="relative h-18 w-18 overflow-hidden">
          <Image
            src="/logo.png"
            alt="COS logo"
            fill
            className="object-contain"
          />
        </div>
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
          className="h-full overflow-y-auto pr-2 no-scrollbar"
        >
          <div className="space-y-3">
            <PopulationCard
              peopleCount={peopleCount}
              setPeopleCount={setPeopleCount}
              stats={stats}
              setStats={setStats}
              ageTotal={ageTotal}
            />

            <SocioeconomicCard
              stats={stats}
              setStats={setStats}
              incomeTotal={incomeTotal}
              educationTotal={educationTotal}
              areaTotal={areaTotal}
            />

            <BehavioralCard
              stats={stats}
              setStats={setStats}
              ideologyTotal={ideologyTotal}
              trustTotal={trustTotal}
              adoptionTotal={adoptionTotal}
              priceSensitivityTotal={priceSensitivityTotal}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 shrink-0">
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