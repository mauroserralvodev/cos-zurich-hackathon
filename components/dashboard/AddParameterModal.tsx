"use client";

import { Check, Plus, X } from "lucide-react";
import { PARAMETER_BLOCK_OPTIONS } from "@/lib/collective-os/parameter-blocks";
import type { ParameterBlockId } from "@/lib/collective-os/types";

type AddParameterModalProps = {
  open: boolean;
  selectedBlocks: ParameterBlockId[];
  onToggleBlock: (blockId: ParameterBlockId) => void;
  onClose: () => void;
};

export default function AddParameterModal({
  open,
  selectedBlocks,
  onToggleBlock,
  onClose,
}: AddParameterModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
      <div className="z-10 flex max-h-[92dvh] w-[min(980px,92vw)] flex-col overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl">
        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-xl font-medium text-black">
              Add parameters
              <p className="mt-1 text-xs text-neutral-400">
                Select the blocks you want to use for building the synthetic population.
              </p>
            </div>

            <div className="flex items-center gap-2">
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
              {PARAMETER_BLOCK_OPTIONS.map((item) => {
                const isSelected = selectedBlocks.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onToggleBlock(item.id)}
                    className={[
                      "group relative w-full cursor-pointer overflow-hidden rounded-3xl border px-4 py-4 text-left transition-all duration-300",
                      "min-h-12",
                      isSelected
                        ? "border-[#FF5500]/20 bg-[#fff7f3]"
                        : "border-black/8 bg-white/80 s hover:-translate-y-px hover:bg-white",
                    ].join(" ")}
                  >
                    <div className="grid h-full grid-cols-[1fr_auto] items-center gap-4">
                      <div className="min-w-0 h-full">
                        <span className="block text-sm font-medium tracking-[-0.01em] text-neutral-900">
                          {item.label}
                        </span>

                        <p className="mt-1 min-h-10 text-xs text-neutral-400">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={[
                          "relative h-8 w-8 shrink-0 rounded-full border transition-all duration-300",
                          "flex items-center justify-center h-full",
                          isSelected
                            ? "border-none"
                            : "border-none",
                        ].join(" ")}
                      >
                        <Plus
                          className={[
                            "absolute h-6 w-6 text-neutral-700 transition-all duration-300",
                            isSelected
                              ? "scale-50 rotate-90 opacity-0"
                              : "scale-100 rotate-0 opacity-100",
                          ].join(" ")}
                        />

                        <Check
                          className={[
                            "absolute h-6 w-6 text-[#FF5500]/80 transition-all duration-300",
                            isSelected
                              ? "scale-100 rotate-0 opacity-100"
                              : "scale-50 -rotate-90 opacity-0",
                          ].join(" ")}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}