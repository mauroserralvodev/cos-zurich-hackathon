"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../controls/DistributionEditor";

type PriceSensitivityBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function PriceSensitivityBlock({
  stats,
  setStats,
}: PriceSensitivityBlockProps) {
  return (
    <DistributionEditor
      title="Price sensitivity"
      description="How strongly price affects user decisions."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "lowPriceSensitivity", label: "Low" },
        { key: "mediumPriceSensitivity", label: "Mid" },
        { key: "highPriceSensitivity", label: "High" },
      ]}
    />
  );
}