"use client";

import type { SimulationResult, StimulusFormState } from "@/lib/collective-os/types";

type StimulusType = StimulusFormState["type"];

type ResultsPanelProps = {
  result: SimulationResult;
  stimulusType: StimulusType;
};

type MetricConfig = {
  key: keyof SimulationResult;
  label: string;
  description: string;
  inverse?: boolean;
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getGaugeColor(value: number, inverse = false) {
  if (!inverse) {
    if (value >= 67) return "#16A34A";
    if (value >= 40) return "#EAB308";
    return "#EF4444";
  }

  if (value <= 25) return "#16A34A";
  if (value <= 50) return "#EAB308";
  return "#EF4444";
}

function getMetricTone(value: number, inverse = false) {
  if (!inverse) {
    if (value >= 67) {
      return {
        text: "text-green-700",
        chip: "bg-green-50 text-green-700",
        label: "Strong",
      };
    }
    if (value >= 40) {
      return {
        text: "text-yellow-700",
        chip: "bg-yellow-50 text-yellow-700",
        label: "Moderate",
      };
    }
    return {
      text: "text-red-700",
      chip: "bg-red-50 text-red-700",
      label: "Weak",
    };
  }

  if (value <= 25) {
    return {
      text: "text-green-700",
      chip: "bg-green-50 text-green-700",
      label: "Low risk",
    };
  }
  if (value <= 50) {
    return {
      text: "text-yellow-700",
      chip: "bg-yellow-50 text-yellow-700",
      label: "Medium risk",
    };
  }
  return {
    text: "text-red-700",
    chip: "bg-red-50 text-red-700",
    label: "High risk",
  };
}

function getMetricsForStimulus(type: StimulusType): MetricConfig[] {
  switch (type) {
    case "government":
      return [
        {
          key: "publicAcceptance",
          label: "Public acceptance",
          description: "Overall support for the decision.",
        },
        {
          key: "trustImpact",
          label: "Institutional trust",
          description: "Impact on confidence in institutions.",
        },
        {
          key: "virality",
          label: "Compliance likelihood",
          description: "Estimated willingness to follow the measure.",
        },
        {
          key: "negativeReaction",
          label: "Negative reaction",
          description: "Expected backlash or rejection.",
          inverse: true,
        },
        {
          key: "purchaseIntent",
          label: "Social friction",
          description: "Potential for resistance or public tension.",
          inverse: true,
        },
      ];

    case "political":
      return [
        {
          key: "publicAcceptance",
          label: "Voter persuasion",
          description: "Potential to convince undecided audiences.",
        },
        {
          key: "virality",
          label: "Mobilization potential",
          description: "How likely the message is to spread and activate supporters.",
        },
        {
          key: "trustImpact",
          label: "Candidate trust",
          description: "Impact on perceived credibility and confidence.",
        },
        {
          key: "negativeReaction",
          label: "Negative reaction",
          description: "Expected backlash from opposing or sceptical groups.",
          inverse: true,
        },
        {
          key: "purchaseIntent",
          label: "Polarization risk",
          description: "Likelihood of increasing social or political division.",
          inverse: true,
        },
      ];

    case "product-launch":
      return [
        {
          key: "purchaseIntent",
          label: "Purchase intent",
          description: "Likelihood of converting interest into action.",
        },
        {
          key: "publicAcceptance",
          label: "Product acceptance",
          description: "Overall resonance with the market.",
        },
        {
          key: "virality",
          label: "Virality potential",
          description: "How likely the launch is to generate organic attention.",
        },
        {
          key: "trustImpact",
          label: "Brand trust",
          description: "Effect on confidence in the brand.",
        },
        {
          key: "negativeReaction",
          label: "Negative reaction",
          description: "Probability of rejection or criticism.",
          inverse: true,
        },
      ];

    case "advertising":
    default:
      return [
        {
          key: "publicAcceptance",
          label: "Public acceptance",
          description: "General receptiveness to the campaign.",
        },
        {
          key: "purchaseIntent",
          label: "Purchase intent",
          description: "Likelihood of converting interest into action.",
        },
        {
          key: "virality",
          label: "Virality potential",
          description: "How likely the campaign is to spread organically.",
        },
        {
          key: "trustImpact",
          label: "Trust impact",
          description: "Effect on perceived brand or message credibility.",
        },
        {
          key: "negativeReaction",
          label: "Negative reaction",
          description: "Expected rejection, fatigue or backlash.",
          inverse: true,
        },
      ];
  }
}

function SemiGauge({
  label,
  value,
  description,
  inverse = false,
}: {
  label: string;
  value: number;
  description: string;
  inverse?: boolean;
}) {
  const safeValue = clamp(value);
  const color = getGaugeColor(safeValue, inverse);
  const tone = getMetricTone(safeValue, inverse);

  const size = 210;
  const strokeWidth = 20;
  const radius = 74;
  const cx = size / 2;
  const cy = 150;

  const startX = cx - radius;
  const startY = cy;
  const endX = cx + radius;
  const endY = cy;

  const arcLength = Math.PI * radius;
  const progressLength = (safeValue / 100) * arcLength;

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5">
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium items-end ${tone.chip}`}>
        {tone.label}
      </span>
      <div className="my-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-900">{label}</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500 h-10">{description}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <svg
          width="100%"
          viewBox={`0 0 ${size} ${size}`}
          className="max-w-40"
          aria-hidden="true"
        >
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
            fill="none"
            stroke="#E5E5E5"
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />

          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${progressLength} ${arcLength}`}
          />

          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            className="fill-black text-[32px]"
          >
            {safeValue}%
          </text>
        </svg>
      </div>
    </div>
  );
}

function SecondaryMetricCard({
  label,
  value,
  description,
  inverse = false,
}: {
  label: string;
  value: number;
  description: string;
  inverse?: boolean;
}) {
  const tone = getMetricTone(value, inverse);
  const color = getGaugeColor(value, inverse);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-900">{label}</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-xs truncate ${tone.chip}`}>
          {tone.label}
        </span>
      </div>

      <div className="mb-3 flex items-end justify-between gap-3">
        <p className={`text-3xl tracking-tight ${tone.text}`}>
          {value}%
        </p>
      </div>

      <div className="h-2.5 w-full rounded-full bg-neutral-200">
        <div
          className="h-2.5 rounded-full"
          style={{ width: `${clamp(value)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function getHeadline(type: StimulusType) {
  switch (type) {
    case "government":
      return {
        title: "Government response overview",
        description:
          "Estimated public reaction to the proposed institutional decision.",
      };
    case "political":
      return {
        title: "Political campaign response",
        description:
          "Estimated persuasion, mobilisation and backlash profile.",
      };
    case "product-launch":
      return {
        title: "Product launch response",
        description:
          "Estimated market reaction, trust and conversion potential.",
      };
    case "advertising":
    default:
      return {
        title: "Campaign response overview",
        description:
          "Estimated reaction across message acceptance, conversion and risk.",
      };
  }
}

export default function ResultsPanel({
  result,
  stimulusType,
}: ResultsPanelProps) {
  const metrics = getMetricsForStimulus(stimulusType);
  const headline = getHeadline(stimulusType);

  const primaryMetrics = metrics.slice(0, 3);
  const secondaryMetrics = metrics.slice(3);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-black/10 bg-white p-5">
        <p className="text-sm font-medium text-neutral-900">{headline.title}</p>
        <p className="mt-1 text-sm text-neutral-400">{headline.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {primaryMetrics.map((metric) => (
          <SemiGauge
            key={metric.label}
            label={metric.label}
            value={result[metric.key]}
            description={metric.description}
            inverse={metric.inverse}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {secondaryMetrics.map((metric) => (
          <SecondaryMetricCard
            key={metric.label}
            label={metric.label}
            value={result[metric.key]}
            description={metric.description}
            inverse={metric.inverse}
          />
        ))}
      </div>
    </div>
  );
}