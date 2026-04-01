"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../controls/DistributionEditor";

type UrbanContextBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function UrbanContextBlock({
  stats,
  setStats,
}: UrbanContextBlockProps) {
  return (
    <DistributionEditor
      title="Urban context"
      description="Urban, suburban and rural composition."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "urban", label: "Urban" },
        { key: "suburban", label: "Suburban" },
        { key: "rural", label: "Rural" },
      ]}
    />
  );
}