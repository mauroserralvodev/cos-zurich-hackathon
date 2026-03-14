"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../ui/StatInput";
import TotalHint from "../ui/TotalHint";


type InnovationAdoptionBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  adoptionTotal: number;
};

export default function InnovationAdoptionBlock({
  stats,
  setStats,
  adoptionTotal,
}: InnovationAdoptionBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">
        Innovation adoption
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Early"
          value={stats.earlyAdopters}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, earlyAdopters: value }))
          }
        />
        <StatInput
          label="Mainstream"
          value={stats.mainstreamAdopters}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, mainstreamAdopters: value }))
          }
        />
        <StatInput
          label="Late"
          value={stats.lateAdopters}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, lateAdopters: value }))
          }
        />
      </div>

      <TotalHint total={adoptionTotal} />
    </ParameterCard>
  );
}