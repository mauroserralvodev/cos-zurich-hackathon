"use client";

import { ACCENT } from "@/lib/collective-os/constants";
import ParameterCard from "./ParameterCard";

type PopulationCardProps = {
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function PopulationCard({
  peopleCount,
  setPeopleCount,
}: PopulationCardProps) {
  return (
    <ParameterCard>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-neutral-900">Population</p>
        <span className="rounded-full text-xs text-neutral-600">
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
    </ParameterCard>
  );
}