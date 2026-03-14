"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../dashboard/StatInput";
import TotalHint from "../dashboard/TotalHint";


type UrbanContextBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  areaTotal: number;
};

export default function UrbanContextBlock({
  stats,
  setStats,
  areaTotal,
}: UrbanContextBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">Urban context</p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Urban"
          value={stats.urban}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, urban: value }))
          }
        />
        <StatInput
          label="Suburban"
          value={stats.suburban}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, suburban: value }))
          }
        />
        <StatInput
          label="Rural"
          value={stats.rural}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, rural: value }))
          }
        />
      </div>

      <TotalHint total={areaTotal} />
    </ParameterCard>
  );
}