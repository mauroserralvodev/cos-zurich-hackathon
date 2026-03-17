import OpenAI from "openai";
import { NextResponse } from "next/server";
import { simulationApiResultSchema } from "@/lib/collective-os/simulation-result-schema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
- Avoid bland middle-of-the-road outputs unless the scenario is truly mixed.
- Do not make every summary metric hover around 45-60 by default.
- Use the selected parameter blocks as the main drivers of variation.
- If a block is not selected, its weights should be close to 0.
- baseScore should usually stay between 40 and 60.
- Segment weights should usually stay between -10 and 10, and rarely exceed -12 or 12.
- Not all weights should be positive.
- High trust should usually increase acceptance of institutional messages.
- High price sensitivity should usually reduce purchase intent for expensive offers.
- Early adopters should usually react better to innovation-oriented stimuli.
- Negative reaction should rise when the message is provocative, badly targeted, expensive, coercive, or politically divisive.
- Do not invent unsupported fields.

Output guidance:
- summary should reflect the scenario, not generic averages.
- weights must create visible but believable differences across people.
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
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
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

    console.log("SIMULATION RAW TEXT:", rawText);
    console.log("SIMULATION VALIDATED:", JSON.stringify(validated, null, 2));

    return NextResponse.json(validated);
  } catch (error) {
    console.error("Simulation API error:", error);
    return NextResponse.json(
      { error: "Failed to run simulation." },
      { status: 500 }
    );
  }
}