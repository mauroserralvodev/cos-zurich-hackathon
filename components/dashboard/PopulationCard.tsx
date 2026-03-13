"use client";

import { ACCENT } from "@/lib/collective-os/constants";
import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "./ParameterCard";
import StatInput from "./StatInput";
import TotalHint from "./TotalHint";

type PopulationCardProps = {
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  ageTotal: number;
};

export default function PopulationCard({
  peopleCount,
  setPeopleCount,
  stats,
  setStats,
  ageTotal,
}: PopulationCardProps) {
  return (
    <ParameterCard>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-neutral-900">Population</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs text-neutral-600">
          {peopleCount.toLocaleString()} agents
        </span>
      </div>

      <div className="space-y-3">
        <input
          type="range"
          min={50}
          max={5000}
          step={50}
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: ACCENT }}
        />

        <input
          type="number"
          min={1}
          max={5000}
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
          className="h-9 w-full rounded-xl border border-black/10 bg-white px-2.5 text-sm text-neutral-900 outline-none focus:border-black/20"
        />
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-neutral-900">Age</p>
        <div className="grid grid-cols-4 gap-2.5">
          <StatInput
            label="18-24"
            value={stats.age18_24}
            onChange={(value) =>
              setStats((prev) => ({ ...prev, age18_24: value }))
            }
          />
          <StatInput
            label="25-39"
            value={stats.age25_39}
            onChange={(value) =>
              setStats((prev) => ({ ...prev, age25_39: value }))
            }
          />
          <StatInput
            label="40-64"
            value={stats.age40_64}
            onChange={(value) =>
              setStats((prev) => ({ ...prev, age40_64: value }))
            }
          />
          <StatInput
            label="65+"
            value={stats.age65Plus}
            onChange={(value) =>
              setStats((prev) => ({ ...prev, age65Plus: value }))
            }
          />
        </div>
        <TotalHint total={ageTotal} />
      </div>
    </ParameterCard>
  );
}