import type { StimulusFormState, StimulusType } from "./types";

export type StimulusFieldConfig = {
  key: keyof StimulusFormState;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
};

export const STIMULUS_FIELDS_BY_TYPE: Record<
  StimulusType,
  StimulusFieldConfig[]
> = {
  advertising: [
    {
      key: "title",
      label: "Campaign title",
      type: "text",
      placeholder: "City movement, reimagined",
    },
    {
      key: "description",
      label: "Campaign description",
      type: "textarea",
      placeholder: "Describe the advertising concept being tested...",
    },
    {
      key: "brandName",
      label: "Brand",
      type: "text",
      placeholder: "Nova Mobility",
    },
    {
      key: "tone",
      label: "Tone",
      type: "select",
      options: ["Neutral", "Optimistic", "Urgent", "Provocative"],
    },
    {
      key: "channel",
      label: "Channel",
      type: "select",
      options: ["Social media", "Billboard", "TV", "Press"],
    },
    {
      key: "audienceGoal",
      label: "Goal",
      type: "text",
      placeholder: "Increase awareness among urban professionals",
    },
    {
      key: "cta",
      label: "CTA",
      type: "text",
      placeholder: "Discover more",
    },
  ],

  government: [
    {
      key: "title",
      label: "Policy title",
      type: "text",
      placeholder: "New public transport subsidy",
    },
    {
      key: "description",
      label: "Policy description",
      type: "textarea",
      placeholder: "Describe the government measure or announcement...",
    },
    {
      key: "policyArea",
      label: "Policy area",
      type: "text",
      placeholder: "Mobility, housing, energy...",
    },
    {
      key: "impactScope",
      label: "Impact scope",
      type: "select",
      options: ["Local", "Regional", "National"],
    },
    {
      key: "institutionSource",
      label: "Institution source",
      type: "text",
      placeholder: "Canton of Zürich",
    },
    {
      key: "tone",
      label: "Tone",
      type: "select",
      options: ["Neutral", "Optimistic", "Urgent", "Provocative"],
    },
    {
      key: "channel",
      label: "Channel",
      type: "select",
      options: ["Social media", "Billboard", "TV", "Press"],
    },
  ],

  political: [
    {
      key: "title",
      label: "Campaign title",
      type: "text",
      placeholder: "A safer and fairer Zürich",
    },
    {
      key: "description",
      label: "Campaign description",
      type: "textarea",
      placeholder: "Describe the political campaign or announcement...",
    },
    {
      key: "candidate",
      label: "Candidate / party",
      type: "text",
      placeholder: "Civic Alliance",
    },
    {
      key: "issueFocus",
      label: "Issue focus",
      type: "text",
      placeholder: "Security, housing, taxation...",
    },
    {
      key: "slogan",
      label: "Slogan",
      type: "text",
      placeholder: "Forward together",
    },
    {
      key: "tone",
      label: "Tone",
      type: "select",
      options: ["Neutral", "Optimistic", "Urgent", "Provocative"],
    },
    {
      key: "channel",
      label: "Channel",
      type: "select",
      options: ["Social media", "Billboard", "TV", "Press"],
    },
  ],

  "product-launch": [
    {
      key: "title",
      label: "Product name",
      type: "text",
      placeholder: "Pulse One",
    },
    {
      key: "description",
      label: "Product description",
      type: "textarea",
      placeholder: "Describe the product launch being evaluated...",
    },
    {
      key: "brandName",
      label: "Brand",
      type: "text",
      placeholder: "Pulse Labs",
    },
    {
      key: "pricePoint",
      label: "Price point",
      type: "text",
      placeholder: "299 CHF",
    },
    {
      key: "cta",
      label: "CTA",
      type: "text",
      placeholder: "Pre-order now",
    },
    {
      key: "tone",
      label: "Tone",
      type: "select",
      options: ["Neutral", "Optimistic", "Urgent", "Provocative"],
    },
    {
      key: "channel",
      label: "Channel",
      type: "select",
      options: ["Social media", "Billboard", "TV", "Press"],
    },
  ],
};