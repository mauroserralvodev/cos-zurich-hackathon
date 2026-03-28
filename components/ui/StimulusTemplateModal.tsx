"use client";

import { BookOpen, Check, MousePointer2, X } from "lucide-react";
import type { StimulusFormState } from "@/lib/collective-os/types";

type StimulusTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  onApplyTemplate: (template: StimulusFormState) => void;
};

const createBaseTemplate = (
  overrides: Partial<StimulusFormState>
): StimulusFormState => ({
  type: "advertising",

  title: "",
  description: "",

  tone: "Neutral",
  channel: "Social media",

  audienceGoal: "",

  pricePoint: "",
  cta: "",
  brandName: "",

  policyArea: "",
  impactScope: "Local",
  institutionSource: "",

  candidate: "",
  issueFocus: "",
  slogan: "",

  ...overrides,
});

const STIMULUS_TEMPLATES: Array<{
  id: StimulusFormState["type"];
  label: string;
  description: string;
  template: StimulusFormState;
}> = [
  {
    id: "advertising",
    label: "Advertising campaign",
    description:
      "Premium urban mobility campaign focused on aspiration and brand awareness.",
    template: createBaseTemplate({
      type: "advertising",
      title: "City movement, reimagined",
      description:
        "A premium advertising campaign presenting a new electric mobility brand as the ideal choice for ambitious urban professionals who value design, status and sustainability.",
      brandName: "Nova Mobility",
      tone: "Optimistic",
      channel: "Social media",
      audienceGoal: "Increase awareness among urban professionals",
      cta: "Discover more",
    }),
  },
  {
    id: "government",
    label: "Government decision",
    description:
      "Public policy announcement designed to test trust, support and resistance.",
    template: createBaseTemplate({
      type: "government",
      title: "New public transport subsidy",
      description:
        "The regional government announces a public transport subsidy designed to reduce car dependency, improve access to mobility and lower commuting costs for residents.",
      policyArea: "Mobility",
      impactScope: "Regional",
      institutionSource: "Canton of Zürich",
      tone: "Neutral",
      channel: "Press",
    }),
  },
  {
    id: "political",
    label: "Political campaign",
    description:
      "Election-style campaign centred on housing pressure and affordability.",
    template: createBaseTemplate({
      type: "political",
      title: "A safer and fairer Zürich",
      description:
        "A political campaign focused on housing access, public safety and cost of living, presenting a moderate reform agenda aimed at families and younger voters.",
      candidate: "Civic Alliance",
      issueFocus: "Housing and affordability",
      slogan: "Forward together",
      tone: "Provocative",
      channel: "TV",
    }),
  },
  {
    id: "product-launch",
    label: "Product launch",
    description:
      "Consumer tech launch designed to test interest, pricing and early adoption.",
    template: createBaseTemplate({
      type: "product-launch",
      title: "Pulse One",
      description:
        "A compact AI-powered consumer device designed to help users manage tasks, capture ideas and simplify their daily routines through natural interaction.",
      brandName: "Pulse Labs",
      pricePoint: "299 CHF",
      cta: "Pre-order now",
      tone: "Optimistic",
      channel: "Social media",
    }),
  },
];

export default function StimulusTemplateModal({
  open,
  onClose,
  onApplyTemplate,
}: StimulusTemplateModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
      <div className="z-10 flex max-h-[92dvh] w-[min(980px,92vw)] flex-col overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl">
        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-xl font-medium text-black">
              Autofill templates
              <p className="mt-1 text-xs text-neutral-400">
                Choose a starter template to quickly populate the stimulus form.
              </p>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer rounded-full border border-transparent bg-neutral-100 p-2 text-black transition hover:bg-neutral-100/40"
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {STIMULUS_TEMPLATES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onApplyTemplate(item.template)}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-3xl border border-black/8 bg-white/80 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-px hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="block text-md font-medium tracking-[-0.01em] text-neutral-900">
                          {item.label}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                      <MousePointer2 className="h-5 w-5 text-neutral-300 transition group-hover:text-[#FF5500]/80" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}