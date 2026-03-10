"use client";

import type { ManualStats } from "@/lib/collective-os/types";
import StatInput from "./StatInput";
import TotalHint from "./TotalHint";

type BehavioralCardProps = {
  stats: ManualStats;
  setStats: React.Dispatch<React.SetStateAction<ManualStats>>;
  ideologyTotal: number;
  trustTotal: number;
  adoptionTotal: number;
  priceSensitivityTotal: number;
};

export default function BehavioralCard({
  stats,
  setStats,
  ideologyTotal,
  trustTotal,
  adoptionTotal,
  priceSensitivityTotal,
}: BehavioralCardProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
      <div className="space-y-3">
        <p className="text-sm font-medium text-neutral-900">Behavioral</p>

        <div>
          <p className="mb-2 text-[13px] font-medium text-neutral-700">
            Ideology
          </p>
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
        </div>

        <div>
          <p className="mb-2 text-[13px] font-medium text-neutral-700">
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
        </div>

        <div>
          <p className="mb-2 text-[13px] font-medium text-neutral-700">
            Innovation adoption
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <StatInput
              label="Early"
              value={stats.earlyAdopters}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, earlyAdopters: value }))
              }
            />
            <StatInput
              label="Mainstream"
              value={stats.mainstreamAdopters}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, mainstreamAdopters: value }))
              }
            />
            <StatInput
              label="Late"
              value={stats.lateAdopters}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, lateAdopters: value }))
              }
            />
          </div>
          <TotalHint total={adoptionTotal} />
        </div>

        <div>
          <p className="mb-2 text-[13px] font-medium text-neutral-700">
            Price sensitivity
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <StatInput
              label="Low"
              value={stats.lowPriceSensitivity}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, lowPriceSensitivity: value }))
              }
            />
            <StatInput
              label="Mid"
              value={stats.mediumPriceSensitivity}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, mediumPriceSensitivity: value }))
              }
            />
            <StatInput
              label="High"
              value={stats.highPriceSensitivity}
              onChange={(value) =>
                setStats((prev) => ({ ...prev, highPriceSensitivity: value }))
              }
            />
          </div>
          <TotalHint total={priceSensitivityTotal} />
        </div>
      </div>
    </div>
  );
}