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
        "A premium advertising campaign presenting a new electric mobility brand as the ideal choice for ambitious urban professionals who value design, status and sustainability. The campaign frames electric mobility as a symbol of progress, independence and urban sophistication, with visuals centred on design-led city life, quiet performance and low-emission convenience.",
      brandName: "Nova Mobility",
      tone: "Optimistic",
      channel: "Social media",
      audienceGoal:
        "Increase awareness and brand preference among urban professionals aged 25 to 40 who are environmentally conscious but also motivated by status, design and convenience.",
      cta: "Discover more",
      pricePoint:
        "Premium positioning, starting from 42,900 CHF with flexible monthly financing options",
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
        "The regional government announces a new public transport subsidy aimed at reducing car dependency, improving access to mobility and lowering commuting costs for residents. The measure includes discounted monthly travel passes, special support for students and low-income households, and a broader push to reduce congestion and emissions across the region.",
      policyArea:
        "Mobility, cost of living relief and emissions reduction through public transport incentives",
      impactScope: "Regional",
      institutionSource: "Canton of Zürich",
      tone: "Neutral",
      channel: "Press",
      audienceGoal:
        "Build public support for the measure, increase perceived fairness of the policy and improve confidence in institutional decision-making.",
      cta:
        "Check eligibility and apply for the new regional transport subsidy",
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
        "A political campaign focused on housing access, public safety and cost of living, presenting a moderate reform agenda aimed at families, renters and younger voters. The message combines institutional competence with social fairness, arguing that the city needs more affordable housing, cleaner public space, safer neighbourhoods and practical policies that reduce everyday pressure without ideological extremes.",
      candidate: "Civic Alliance",
      issueFocus:
        "Housing affordability, neighbourhood safety, public services and cost-of-living pressure",
      slogan: "Forward together",
      tone: "Provocative",
      channel: "TV",
      audienceGoal:
        "Increase persuasion among undecided middle-income voters, younger renters and families concerned about affordability, safety and urban pressure.",
      cta: "Join the campaign and vote for practical change",
      institutionSource:
        "Positioned as an institutional but reform-oriented political platform with city-level credibility",
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
        "A compact AI-powered consumer device designed to help users manage tasks, capture ideas and simplify their daily routines through natural interaction. The launch positions Pulse One as an intelligent everyday companion for busy professionals and tech-curious consumers who want productivity support, lightweight automation and frictionless interaction without the complexity of a full workstation setup.",
      brandName: "Pulse Labs",
      pricePoint: "299 CHF",
      cta: "Pre-order now",
      tone: "Optimistic",
      channel: "Social media",
      audienceGoal:
        "Drive early interest, pre-orders and strong initial adoption among productivity-focused consumers, tech enthusiasts and young professionals.",
      issueFocus:
        "Personal productivity, lightweight AI assistance and daily workflow simplification",
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