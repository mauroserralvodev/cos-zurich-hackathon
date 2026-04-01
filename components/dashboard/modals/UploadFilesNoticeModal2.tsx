"use client";

import { X } from "lucide-react";

type UploadFilesNoticeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UploadFilesNoticeModal({
  open,
  onClose,
}: UploadFilesNoticeModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
      <div className="z-10 w-[min(620px,92vw)] overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl">
        <div className="flex items-start justify-between px-6 py-6">
          <div className="pr-4">
            <h2 className="text-xl font-medium text-black">
              New feature inspired by yesterday’s jury feedback
            </h2>

            <p className="mt-4 max-w-xl text-xs text-neutral-400">
              I’m currently implementing file uploads based on the feedback I
              received from the jury yesterday. It is still under development
              and will be available soon.
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-full border border-transparent bg-neutral-100 p-2 text-black transition hover:bg-neutral-200"
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full bg-[#FF5500] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}