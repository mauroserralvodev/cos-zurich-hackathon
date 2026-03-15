"use client";

import { STIMULUS_FIELDS_BY_TYPE } from "@/lib/collective-os/stimulus-fields";
import type { StimulusFormState } from "@/lib/collective-os/types";

type StimulusFormProps = {
  form: StimulusFormState;
  setForm: React.Dispatch<React.SetStateAction<StimulusFormState>>;
};

export default function StimulusForm({ form, setForm }: StimulusFormProps) {
  const fields = STIMULUS_FIELDS_BY_TYPE[form.type];

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-4">
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
            className="h-10 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 text-sm text-neutral-900 outline-none"
          >
            <option value="advertising">Advertising campaign</option>
            <option value="government">Government decision</option>
            <option value="political">Political campaign</option>
            <option value="product-launch">Product launch</option>
          </select>
        </div>

        <div className="space-y-4">
          {fields.map((field) => {
            const value = form[field.key];

            if (field.type === "textarea") {
              return (
                <div key={field.key}>
                  <label className="mb-1 block text-[11px] font-medium text-neutral-500">
                    {field.label}
                  </label>
                  <textarea
                    value={String(value ?? "")}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="min-h-24 w-full resize-none rounded-xl border border-black/10 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none"
                    placeholder={field.placeholder}
                  />
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.key}>
                  <label className="mb-1 block text-[11px] font-medium text-neutral-500">
                    {field.label}
                  </label>
                  <select
                    value={String(value ?? "")}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 text-sm text-neutral-900 outline-none"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={field.key}>
                <label className="mb-1 block text-[11px] font-medium text-neutral-500">
                  {field.label}
                </label>
                <input
                  value={String(value ?? "")}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="h-10 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 text-sm text-neutral-900 outline-none"
                  placeholder={field.placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}