"use client";

import { clampPercentage } from "@/lib/collective-os/simulation";

type StatInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function StatInput({
  label,
  value,
  onChange,
}: StatInputProps) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-neutral-500">
        {label}
      </label>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(clampPercentage(Number(e.target.value)))}
        className="h-9 w-full rounded-xl border border-black/10 bg-white px-2.5 text-sm text-neutral-900 outline-none transition focus:border-black/20"
      />
    </div>
  );
}