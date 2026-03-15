"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../ui/DistributionEditor";

type InstitutionalTrustBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function InstitutionalTrustBlock({
  stats,
  setStats,
}: InstitutionalTrustBlockProps) {
  return (
    <DistributionEditor
      title="Institutional trust"
      description="Confidence in institutions and official messaging."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "lowTrust", label: "Low" },
        { key: "mediumTrust", label: "Mid" },
        { key: "highTrust", label: "High" },
      ]}
    />
  );
}