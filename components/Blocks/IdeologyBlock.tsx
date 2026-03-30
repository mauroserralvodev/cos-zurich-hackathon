"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../dashboard/controls/DistributionEditor";

type IdeologyBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function IdeologyBlock({
  stats,
  setStats,
}: IdeologyBlockProps) {
  return (
    <DistributionEditor
      title="Ideology"
      description="Political and social orientation of the population."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "right", label: "Right" },
        { key: "left", label: "Left" },
        { key: "apolitical", label: "Apolitical" },
        { key: "other", label: "Other" },
      ]}
    />
  );
}