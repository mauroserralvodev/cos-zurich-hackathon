"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../../dashboard/controls/DistributionEditor";

type AgeBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function AgeBlock({ stats, setStats }: AgeBlockProps) {
  return (
    <DistributionEditor
      title="Age"
      description="Population split by age group."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "age18_24", label: "18-24" },
        { key: "age25_39", label: "25-39" },
        { key: "age40_64", label: "40-64" },
        { key: "age65Plus", label: "65+" },
      ]}
    />
  );
}