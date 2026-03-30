"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import DistributionEditor from "../dashboard/controls/DistributionEditor";

type EducationBlockProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
};

export default function EducationBlock({
  stats,
  setStats,
}: EducationBlockProps) {
  return (
    <DistributionEditor
      title="Education"
      description="Basic, secondary and higher education levels."
      stats={stats}
      setStats={setStats}
      fields={[
        { key: "basicEducation", label: "Basic" },
        { key: "secondaryEducation", label: "Secondary" },
        { key: "higherEducation", label: "Higher" },
      ]}
    />
  );
}