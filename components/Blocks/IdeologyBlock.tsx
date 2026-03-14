"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../ui/StatInput";
import TotalHint from "../ui/TotalHint";


type IdeologyBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  ideologyTotal: number;
};

export default function IdeologyBlock({
  stats,
  setStats,
  ideologyTotal,
}: IdeologyBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">Ideology</p>

      <div className="grid grid-cols-4 gap-2.5">
        <StatInput
          label="Right"
          value={stats.right}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, right: value }))
          }
        />
        <StatInput
          label="Left"
          value={stats.left}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, left: value }))
          }
        />
        <StatInput
          label="Apolitical"
          value={stats.apolitical}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, apolitical: value }))
          }
        />
        <StatInput
          label="Other"
          value={stats.other}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, other: value }))
          }
        />
      </div>

      <TotalHint total={ideologyTotal} />
    </ParameterCard>
  );
}