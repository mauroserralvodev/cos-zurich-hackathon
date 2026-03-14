"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../ui/StatInput";
import TotalHint from "../ui/TotalHint";


type InstitutionalTrustBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  trustTotal: number;
};

export default function InstitutionalTrustBlock({
  stats,
  setStats,
  trustTotal,
}: InstitutionalTrustBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">
        Institutional trust
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Low"
          value={stats.lowTrust}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, lowTrust: value }))
          }
        />
        <StatInput
          label="Mid"
          value={stats.mediumTrust}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, mediumTrust: value }))
          }
        />
        <StatInput
          label="High"
          value={stats.highTrust}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, highTrust: value }))
          }
        />
      </div>

      <TotalHint total={trustTotal} />
    </ParameterCard>
  );
}