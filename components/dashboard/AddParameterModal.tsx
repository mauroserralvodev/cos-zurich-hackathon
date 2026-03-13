"use client";

import { Plus, X } from "lucide-react";

type AddParameterModalProps = {
  open: boolean;
  onClose: () => void;
};

const fakeParameters = [
  "Ideology",
  "Income",
  "Age",
  "Education",
  "Urban context",
  "Institutional trust",
  "Innovation adoption",
  "Price sensitivity",
  "Media exposure",
  "Environmental concern",
  "Mobility dependence",
  "Brand loyalty",
];

export default function AddParameterModal({
  open,
  onClose,
}: AddParameterModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
      <div className="z-10 flex max-h-[92dvh] w-[min(980px,92vw)] flex-col overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl">
        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-xl font-medium text-black">
              Add parameter
            </div>

            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer rounded-full border border-orange-500 px-4 py-2 text-sm font-light text-orange-500 hover:bg-orange-50"
                type="button"
              >
                Reset
              </button>

              <button
                className="cursor-pointer rounded-full bg-orange-500 px-4 py-2 text-sm font-light text-white hover:bg-orange-500/90"
                type="button"
              >
                Apply
              </button>

              <button
                onClick={onClose}
                className="cursor-pointer rounded-full border border-transparent bg-neutral-100 p-2 text-black transition hover:bg-neutral-100/40"
                aria-label="Close"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {fakeParameters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-left transition hover:bg-neutral-100"
                >
                  <span className="text-sm text-neutral-900">{item}</span>
                    <Plus className="h-5 w-5 text-neutral-700 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#FF5500]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}