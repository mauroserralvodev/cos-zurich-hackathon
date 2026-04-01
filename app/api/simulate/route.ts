import OpenAI from "openai";
import { NextResponse } from "next/server";
import { simulationApiResultSchema } from "@/lib/collective-os/simulation-result-schema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type TraceEntry = {
  level: "info" | "success" | "warning";
  message: string;
  highlight?: string[];
};

const BLOCK_TO_WEIGHT_KEY = {
  age: "ageGroup",
  income: "income",
  education: "education",
  urbanContext: "areaType",
  ideology: "ideology",
  institutionalTrust: "trust",
  innovationAdoption: "adoption",
  priceSensitivity: "priceSensitivity",
} as const;

const BLOCK_LABELS = {
  age: "age",
  income: "income",
  education: "education",
  urbanContext: "urban context",
  ideology: "ideology",
  institutionalTrust: "institutional trust",
  innovationAdoption: "innovation adoption",
  priceSensitivity: "price sensitivity",
} as const;

function formatSigned(value: number) {
  return `${value > 0 ? "+" : ""}${value}`;
}

function getStrongestSegmentSignal(
  weights: Record<string, unknown>,
  selectedBlocks: string[]
) {
  let strongestPositive:
    | { block: string; category: string; value: number }
    | null = null;

  let strongestNegative:
    | { block: string; category: string; value: number }
    | null = null;

  for (const blockId of selectedBlocks) {
    const weightKey =
      BLOCK_TO_WEIGHT_KEY[blockId as keyof typeof BLOCK_TO_WEIGHT_KEY];

    if (!weightKey) continue;

    const group = weights[weightKey];

    if (!group || typeof group !== "object") continue;

    for (const [category, rawValue] of Object.entries(
      group as Record<string, number>
    )) {
      const value = Number(rawValue);

      if (
        strongestPositive === null ||
        value > strongestPositive.value
      ) {
        strongestPositive = {
          block: BLOCK_LABELS[blockId as keyof typeof BLOCK_LABELS] ?? blockId,
          category,
          value,
        };
      }

      if (
        strongestNegative === null ||
        value < strongestNegative.value
      ) {
        strongestNegative = {
          block: BLOCK_LABELS[blockId as keyof typeof BLOCK_LABELS] ?? blockId,
          category,
          value,
        };
      }
    }
  }

  return { strongestPositive, strongestNegative };
}

function buildSimulationTrace(
  stimulusForm: Record<string, unknown>,
  selectedBlocks: string[],
  validated: {
    summary: {
      publicAcceptance: number;
      purchaseIntent: number;
      trustImpact: number;
      virality: number;
      negativeReaction: number;
    };
    narrative: {
      headline: string;
      explanation: string;
    };
    weights: Record<string, unknown> & {
      baseScore: number;
    };
  }
): TraceEntry[] {
  const activeDrivers = selectedBlocks
    .map((blockId) => BLOCK_LABELS[blockId as keyof typeof BLOCK_LABELS])
    .filter(Boolean);

  const { strongestPositive, strongestNegative } = getStrongestSegmentSignal(
    validated.weights,
    selectedBlocks
  );

  const type = String(stimulusForm.type);
  const tone = String(stimulusForm.tone);
  const channel = String(stimulusForm.channel);
  const title = String(stimulusForm.title ?? "");

  const summary = validated.summary;

  const trace: TraceEntry[] = [
    {
      level: "info",
      message: `simulation request received for stimulus "${title}"`,
      highlight: [title],
    },
    {
      level: "info",
      message: `stimulus classified as ${type}`,
      highlight: [type],
    },
    {
      level: "info",
      message: `communication tone parsed as ${tone}`,
      highlight: [tone],
    },
    {
      level: "info",
      message: `primary delivery channel parsed as ${channel}`,
      highlight: [channel],
    },
    {
      level: "info",
      message: `active simulation drivers: ${
        activeDrivers.length > 0 ? activeDrivers.join(", ") : "none"
      }`,
      highlight: activeDrivers,
    },
    {
      level: "info",
      message: `baseline reaction initialized at ${validated.weights.baseScore}`,
      highlight: [String(validated.weights.baseScore)],
    },
  ];

  if (summary.publicAcceptance >= 65) {
    trace.push({
      level: "success",
      message: `acceptance profile resolved as favorable (${summary.publicAcceptance})`,
      highlight: [String(summary.publicAcceptance)],
    });
  } else if (summary.publicAcceptance <= 40) {
    trace.push({
      level: "warning",
      message: `acceptance profile resolved as fragile (${summary.publicAcceptance})`,
      highlight: [String(summary.publicAcceptance)],
    });
  } else {
    trace.push({
      level: "info",
      message: `acceptance profile resolved as mixed (${summary.publicAcceptance})`,
      highlight: [String(summary.publicAcceptance)],
    });
  }

  if (summary.purchaseIntent >= 65) {
    trace.push({
      level: "success",
      message: `conversion pressure is strong (${summary.purchaseIntent})`,
      highlight: [String(summary.purchaseIntent)],
    });
  } else if (summary.purchaseIntent <= 40) {
    trace.push({
      level: "warning",
      message: `conversion pressure remains limited (${summary.purchaseIntent})`,
      highlight: [String(summary.purchaseIntent)],
    });
  } else {
    trace.push({
      level: "info",
      message: `conversion pressure remains moderate (${summary.purchaseIntent})`,
      highlight: [String(summary.purchaseIntent)],
    });
  }

  if (summary.trustImpact >= 65) {
    trace.push({
      level: "success",
      message: `trust impact trends positive (${summary.trustImpact})`,
      highlight: [String(summary.trustImpact)],
    });
  } else if (summary.trustImpact <= 40) {
    trace.push({
      level: "warning",
      message: `trust impact trends negative (${summary.trustImpact})`,
      highlight: [String(summary.trustImpact)],
    });
  } else {
    trace.push({
      level: "info",
      message: `trust impact remains contained (${summary.trustImpact})`,
      highlight: [String(summary.trustImpact)],
    });
  }

  if (summary.virality >= 65) {
    trace.push({
      level: "success",
      message: `message spread potential is elevated (${summary.virality})`,
      highlight: [String(summary.virality)],
    });
  } else if (summary.virality <= 40) {
    trace.push({
      level: "warning",
      message: `message spread potential is constrained (${summary.virality})`,
      highlight: [String(summary.virality)],
    });
  } else {
    trace.push({
      level: "info",
      message: `message spread potential is moderate (${summary.virality})`,
      highlight: [String(summary.virality)],
    });
  }

  if (summary.negativeReaction >= 55) {
    trace.push({
      level: "warning",
      message: `backlash risk elevated (${summary.negativeReaction})`,
      highlight: [String(summary.negativeReaction)],
    });
  } else if (summary.negativeReaction <= 25) {
    trace.push({
      level: "success",
      message: `backlash risk contained (${summary.negativeReaction})`,
      highlight: [String(summary.negativeReaction)],
    });
  } else {
    trace.push({
      level: "info",
      message: `backlash risk remains present (${summary.negativeReaction})`,
      highlight: [String(summary.negativeReaction)],
    });
  }

  if (strongestPositive) {
    trace.push({
      level: "success",
      message: `strongest positive segment detected in ${strongestPositive.block}: ${strongestPositive.category} (${formatSigned(
        strongestPositive.value
      )})`,
      highlight: [
        strongestPositive.block,
        strongestPositive.category,
        formatSigned(strongestPositive.value),
      ],
    });
  }

  if (strongestNegative) {
    trace.push({
      level: "warning",
      message: `strongest resistance detected in ${strongestNegative.block}: ${strongestNegative.category} (${formatSigned(
        strongestNegative.value
      )})`,
      highlight: [
        strongestNegative.block,
        strongestNegative.category,
        formatSigned(strongestNegative.value),
      ],
    });
  }

  trace.push(
    {
      level: "info",
      message: `aggregate summary stabilized across selected drivers`,
      highlight: [],
    },
    {
      level: "success",
      message: `narrative synthesis completed: ${validated.narrative.headline}`,
      highlight: [validated.narrative.headline],
    }
  );

  return trace;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      peopleCount,
      stats,
      stimulusForm,
      selectedBlocks,
    } = body ?? {};

    if (!peopleCount || !stats || !stimulusForm) {
      return NextResponse.json(
        { error: "Missing required payload fields." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a synthetic society simulation engine.

Your task is to evaluate a configured synthetic population and a stimulus, then return:
1. aggregate reaction metrics from 0 to 100
2. a short narrative explanation
3. deterministic weighting rules by segment so the frontend can compute person-level scores consistently

Hard rules:
- Return only valid JSON matching the schema.
- Be realistic and internally consistent.
- Use the selected parameter blocks as the main drivers of variation.
- If a block is not selected, its weights should be close to 0.
- Do not invent unsupported fields.

Distribution rules:
- The population should NOT feel uniformly moderate by default.
- In most scenarios, there should be a believable mix of:
  1. a supportive group
  2. a neutral or mildly interested group
  3. a resistant or negative group
- Only highly generic or low-impact stimuli should produce mostly neutral reactions.
- If the stimulus is opinionated, expensive, innovative, political, emotional, identity-linked, high-friction, or badly targeted, increase polarization.
- If the stimulus is very attractive to one segment, make sure at least one other segment reacts clearly worse.
- Do not make every segment mildly positive or mildly negative.

Scoring rules:
- baseScore should usually stay between 38 and 62.
- Segment weights should usually stay between -12 and 12.
- For clear segment mismatch or strong alignment, weights may go as far as -18 to 18.
- Not all weights should be positive.
- Strong positive and strong negative weights should coexist when the scenario is divisive.
- High trust should usually increase acceptance of institutional or official messages.
- High price sensitivity should usually reduce purchase intent for expensive offers.
- Early adopters should usually react better to innovation-oriented stimuli.
- Late adopters should usually react worse to disruptive or unfamiliar offers.
- Negative reaction should rise when the message is provocative, badly targeted, expensive, coercive, or politically divisive.
- For each selected block, try to create at least one relatively favorable category and one relatively unfavorable category when the scenario is meaningful enough.
- Avoid returning mostly near-zero weights across all categories unless the stimulus is genuinely weak or generic.
- Segment differences should be interpretable by a human reviewer.

Output guidance:
- summary should reflect the scenario, not generic averages.
- weights must create visible but believable differences across people.
- Think in terms of real audience segmentation, not average sentiment.
- It is better to produce meaningful spread than flat realism.
`;

    const userPrompt = `
Synthetic population size: ${peopleCount}

Selected parameter blocks:
${JSON.stringify(selectedBlocks ?? [], null, 2)}

Population stats:
${JSON.stringify(stats, null, 2)}

Stimulus:
${JSON.stringify(stimulusForm, null, 2)}

Return a coherent simulation result for this scenario.

Important:
- Model the reaction as a segmented population, not as one average citizen.
- Assume there is usually some disagreement inside the population.
- Many people can still be moderate, but there should usually also be:
  - a smaller group that strongly likes the stimulus
  - a smaller group that clearly rejects it
- Make the selected parameter blocks meaningfully separate those groups.
- If the stimulus is bland, keep the spread smaller.
- If the stimulus is bold, political, expensive, innovative, status-driven, or emotionally loaded, make the spread larger.
- Prefer believable polarization over flat middle-of-the-road scoring.
`;

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "collective_os_simulation_result",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: {
                type: "object",
                additionalProperties: false,
                properties: {
                  publicAcceptance: { type: "number" },
                  purchaseIntent: { type: "number" },
                  trustImpact: { type: "number" },
                  virality: { type: "number" },
                  negativeReaction: { type: "number" },
                },
                required: [
                  "publicAcceptance",
                  "purchaseIntent",
                  "trustImpact",
                  "virality",
                  "negativeReaction",
                ],
              },
              narrative: {
                type: "object",
                additionalProperties: false,
                properties: {
                  headline: { type: "string" },
                  explanation: { type: "string" },
                },
                required: ["headline", "explanation"],
              },
              weights: {
                type: "object",
                additionalProperties: false,
                properties: {
                  baseScore: { type: "number" },
                  ideology: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Right: { type: "number" },
                      Left: { type: "number" },
                      Apolitical: { type: "number" },
                      Other: { type: "number" },
                    },
                    required: ["Right", "Left", "Apolitical", "Other"],
                  },
                  income: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Low: { type: "number" },
                      Medium: { type: "number" },
                      High: { type: "number" },
                    },
                    required: ["Low", "Medium", "High"],
                  },
                  education: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Basic: { type: "number" },
                      Secondary: { type: "number" },
                      Higher: { type: "number" },
                    },
                    required: ["Basic", "Secondary", "Higher"],
                  },
                  areaType: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Urban: { type: "number" },
                      Suburban: { type: "number" },
                      Rural: { type: "number" },
                    },
                    required: ["Urban", "Suburban", "Rural"],
                  },
                  trust: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Low: { type: "number" },
                      Medium: { type: "number" },
                      High: { type: "number" },
                    },
                    required: ["Low", "Medium", "High"],
                  },
                  adoption: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Early: { type: "number" },
                      Mainstream: { type: "number" },
                      Late: { type: "number" },
                    },
                    required: ["Early", "Mainstream", "Late"],
                  },
                  priceSensitivity: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      Low: { type: "number" },
                      Medium: { type: "number" },
                      High: { type: "number" },
                    },
                    required: ["Low", "Medium", "High"],
                  },
                  ageGroup: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      "18-24": { type: "number" },
                      "25-39": { type: "number" },
                      "40-64": { type: "number" },
                      "65+": { type: "number" },
                    },
                    required: ["18-24", "25-39", "40-64", "65+"],
                  },
                },
                required: [
                  "baseScore",
                  "ideology",
                  "income",
                  "education",
                  "areaType",
                  "trust",
                  "adoption",
                  "priceSensitivity",
                  "ageGroup",
                ],
              },
            },
            required: ["summary", "narrative", "weights"],
          },
        },
      },
      max_output_tokens: 1400,
    });

    const rawText =
      response.output_text ??
      "";

    const parsed = JSON.parse(rawText);
    const validated = simulationApiResultSchema.parse(parsed);

    const simulationTrace = buildSimulationTrace(
      stimulusForm,
      selectedBlocks ?? [],
      validated
    );

    console.log("SIMULATION RAW TEXT:", rawText);
    console.log("SIMULATION VALIDATED:", JSON.stringify(validated, null, 2));

    return NextResponse.json({
      ...validated,
      simulationTrace,
    });
  } catch (error) {
    console.error("Simulation API error:", error);
    return NextResponse.json(
      { error: "Failed to run simulation." },
      { status: 500 }
    );
  }
}