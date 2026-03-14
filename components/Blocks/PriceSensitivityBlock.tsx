"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../ui/StatInput";
import TotalHint from "../ui/TotalHint";


type PriceSensitivityBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  priceSensitivityTotal: number;
};

export default function PriceSensitivityBlock({
  stats,
  setStats,
  priceSensitivityTotal,
}: PriceSensitivityBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">
        Price sensitivity
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Low"
          value={stats.lowPriceSensitivity}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, lowPriceSensitivity: value }))
          }
        />
        <StatInput
          label="Mid"
          value={stats.mediumPriceSensitivity}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, mediumPriceSensitivity: value }))
          }
        />
        <StatInput
          label="High"
          value={stats.highPriceSensitivity}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, highPriceSensitivity: value }))
          }
        />
      </div>

      <TotalHint total={priceSensitivityTotal} />
    </ParameterCard>
  );
}