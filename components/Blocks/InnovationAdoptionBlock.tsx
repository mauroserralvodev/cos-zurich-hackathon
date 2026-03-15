"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../ui/DistributionEditor";

type InnovationAdoptionBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function InnovationAdoptionBlock({
  stats,
  setStats,
}: InnovationAdoptionBlockProps) {
  return (
    <DistributionEditor
      title="Innovation adoption"
      description="How fast different groups adopt new products."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "earlyAdopters", label: "Early" },
        { key: "mainstreamAdopters", label: "Mainstream" },
        { key: "lateAdopters", label: "Late" },
      ]}
    />
  );
}