"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import ParameterCard from "../dashboard/ParameterCard";
import StatInput from "../dashboard/StatInput";
import TotalHint from "../dashboard/TotalHint";


type EducationBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  educationTotal: number;
};

export default function EducationBlock({
  stats,
  setStats,
  educationTotal,
}: EducationBlockProps) {
  return (
    <ParameterCard>
      <p className="mb-2 text-sm font-medium text-neutral-900">Education</p>

      <div className="grid grid-cols-3 gap-2.5">
        <StatInput
          label="Basic"
          value={stats.basicEducation}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, basicEducation: value }))
          }
        />
        <StatInput
          label="Secondary"
          value={stats.secondaryEducation}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, secondaryEducation: value }))
          }
        />
        <StatInput
          label="Higher"
          value={stats.higherEducation}
          onChange={(value) =>
            setStats((prev) => ({ ...prev, higherEducation: value }))
          }
        />
      </div>

      <TotalHint total={educationTotal} />
    </ParameterCard>
  );
}