"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import StatInput from "./StatInput";
import TotalHint from "./TotalHint";

type SocioeconomicCardProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  incomeTotal: number;
  educationTotal: number;
  areaTotal: number;
};

export default function SocioeconomicCard({
  stats,
  setStats,
  incomeTotal,
  educationTotal,
  areaTotal,
}: SocioeconomicCardProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-900">
            Socioeconomic
          </p>

          <div className="space-y-3">
            <div>
              <p className="mb-2 text-[13px] font-medium text-neutral-700">
                Income
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <StatInput
                  label="Low"
                  value={stats.lowIncome}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, lowIncome: value }))
                  }
                />
                <StatInput
                  label="Medium"
                  value={stats.mediumIncome}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, mediumIncome: value }))
                  }
                />
                <StatInput
                  label="High"
                  value={stats.highIncome}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, highIncome: value }))
                  }
                />
              </div>
              <TotalHint total={incomeTotal} />
            </div>

            <div>
              <p className="mb-2 text-[13px] font-medium text-neutral-700">
                Education
              </p>
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
            </div>

            <div>
              <p className="mb-2 text-[13px] font-medium text-neutral-700">
                Urban context
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <StatInput
                  label="Urban"
                  value={stats.urban}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, urban: value }))
                  }
                />
                <StatInput
                  label="Suburban"
                  value={stats.suburban}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, suburban: value }))
                  }
                />
                <StatInput
                  label="Rural"
                  value={stats.rural}
                  onChange={(value) =>
                    setStats((prev) => ({ ...prev, rural: value }))
                  }
                />
              </div>
              <TotalHint total={areaTotal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}