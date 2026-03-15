"use client";

import { rebalanceDistribution, equalizeDistribution, clampPercentage } from "@/lib/collective-os/distribution";

type DistributionField<T> = {
  key: keyof T;
  label: string;
};

type DistributionEditorProps<T extends Record<string, number>> = {
  title: string;
  description?: string;
  stats: T;
  setStats: React.Dispatch<React.SetStateAction<T>>;
  fields: DistributionField<T>[];
  total?: number;
};

const SEGMENT_STYLES = [
  "bg-blue-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-400",
  "bg-neutral-300",
  "bg-neutral-200",
];

export default function DistributionEditor<T extends Record<string, number>>({
  title,
  description,
  stats,
  setStats,
  fields,
  total = 100,
}: DistributionEditorProps<T>) {
  const keys = fields.map((f) => f.key);
  const currentTotal = fields.reduce((sum, field) => sum + (stats[field.key] ?? 0), 0);

  const handleChange = (changedKey: keyof T, value: number) => {
    setStats((prev) => rebalanceDistribution(prev, changedKey, value, keys, total));
  };

  const handleEqualize = () => {
    setStats((prev) => equalizeDistribution(prev, keys, total));
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm  text-neutral-900">{title}</h3>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-neutral-400">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-neutral-100">
        {fields.map((field, index) => {
          const value = stats[field.key] ?? 0;
          return (
            <div
              key={String(field.key)}
              className={SEGMENT_STYLES[index % SEGMENT_STYLES.length]}
              style={{ width: `${value}%` }}
              title={`${field.label}: ${value}%`}
            />
          );
        })}
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => {
          const value = stats[field.key] ?? 0;

          return (
            <div
              key={String(field.key)}
              className="rounded-3xl border border-black/5 bg-neutral-50 p-3.5"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      SEGMENT_STYLES[index % SEGMENT_STYLES.length]
                    }`}
                  />
                  <label className="text-sm font-medium text-neutral-800">
                    {field.label}
                  </label>
                </div>

                <span className="min-w-12 text-right text-sm font-semibold text-neutral-900">
                  {value}%
                </span>
              </div>

              <div className="grid grid-cols-[1fr_72px] items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={value}
                  onChange={(e) => handleChange(field.key, Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
                />

                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={value}
                  onChange={(e) =>
                    handleChange(field.key, clampPercentage(Number(e.target.value)))
                  }
                  className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-black/20"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}