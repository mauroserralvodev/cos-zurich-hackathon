"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../dashboard/StatInput";
import TotalHint from "../dashboard/TotalHint";

type AgeBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  ageTotal: number;
};

export default function AgeBlock({
  stats,
  setStats,
  ageTotal,
}: AgeBlockProps) {
  return (
    <ParameterCard>
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
    </ParameterCard>
  );
}