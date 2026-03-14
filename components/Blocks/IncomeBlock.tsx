"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../dashboard/StatInput";
import TotalHint from "../dashboard/TotalHint";


type IncomeBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  incomeTotal: number;
};

export default function IncomeBlock({
  stats,
  setStats,
  incomeTotal,
}: IncomeBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">Income</p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Low"
          value={stats.lowIncome}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, lowIncome: value }))
          }
        />
        <StatInput
          label="Medium"
          value={stats.mediumIncome}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, mediumIncome: value }))
          }
        />
        <StatInput
          label="High"
          value={stats.highIncome}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, highIncome: value }))
          }
        />
      </div>

      <TotalHint total={incomeTotal} />
    </ParameterCard>
  );
}