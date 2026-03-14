"use client";

import type { StimulusFormState } from "@/lib/collective-os/types";

type StimulusFormProps = {
  form: StimulusFormState;
  setForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
};

export default function StimulusForm({ form, setForm }: StimulusFormProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-900">
            Stimulus
          </p>
          <p className="text-sm text-neutral-500">
            Define the input that the synthetic population will react to.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-neutral-500">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                type: e.target.value as StimulusFormState["type"],
              }))
            }
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
          >
            <option value="advertising">Advertising campaign</option>
            <option value="government">Government decision</option>
            <option value="product-launch">Product launch</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-neutral-500">
            Title
          </label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
            placeholder="New mobility subscription"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-neutral-500">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-24 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none"
            placeholder="Describe the campaign, announcement or product being evaluated..."
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-neutral-500">
              Tone
            </label>
            <select
              value={form.tone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  tone: e.target.value as StimulusFormState["tone"],
                }))
              }
              className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
            >
              <option>Neutral</option>
              <option>Optimistic</option>
              <option>Urgent</option>
              <option>Provocative</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-neutral-500">
              Channel
            </label>
            <select
              value={form.channel}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  channel: e.target.value as StimulusFormState["channel"],
                }))
              }
              className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
            >
              <option>Social media</option>
              <option>Billboard</option>
              <option>TV</option>
              <option>Press</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-neutral-500">
              Price point
            </label>
            <input
              value={form.pricePoint}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, pricePoint: e.target.value }))
              }
              className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
              placeholder="29 CHF / month"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-neutral-500">
              CTA
            </label>
            <input
              value={form.cta}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, cta: e.target.value }))
              }
              className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none"
              placeholder="Subscribe now"
            />
          </div>
        </div>
      </div>
    </div>
  );
}