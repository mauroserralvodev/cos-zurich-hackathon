"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../../dashboard/controls/DistributionEditor";

type IncomeBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function IncomeBlock({
  stats,
  setStats,
}: IncomeBlockProps) {
  return (
    <DistributionEditor
      title="Income"
      description="Low, medium and high income distribution."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "lowIncome", label: "Low" },
        { key: "mediumIncome", label: "Medium" },
        { key: "highIncome", label: "High" },
      ]}
    />
  );
}