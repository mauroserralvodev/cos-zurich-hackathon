import { z } from "zod";

export const simulationApiResultSchema = z.object({
  summary: z.object({
    publicAcceptance: z.number().min(0).max(100),
    purchaseIntent: z.number().min(0).max(100),
    trustImpact: z.number().min(0).max(100),
    virality: z.number().min(0).max(100),
    negativeReaction: z.number().min(0).max(100),
  }),
  narrative: z.object({
    headline: z.string(),
    explanation: z.string(),
  }),
  weights: z.object({
    baseScore: z.number(),
    ideology: z.object({
      Right: z.number(),
      Left: z.number(),
      Apolitical: z.number(),
      Other: z.number(),
    }),
    income: z.object({
      Low: z.number(),
      Medium: z.number(),
      High: z.number(),
    }),
    education: z.object({
      Basic: z.number(),
      Secondary: z.number(),
      Higher: z.number(),
    }),
    areaType: z.object({
      Urban: z.number(),
      Suburban: z.number(),
      Rural: z.number(),
    }),
    trust: z.object({
      Low: z.number(),
      Medium: z.number(),
      High: z.number(),
    }),
    adoption: z.object({
      Early: z.number(),
      Mainstream: z.number(),
      Late: z.number(),
    }),
    priceSensitivity: z.object({
      Low: z.number(),
      Medium: z.number(),
      High: z.number(),
    }),
    ageGroup: z.object({
      "18-24": z.number(),
      "25-39": z.number(),
      "40-64": z.number(),
      "65+": z.number(),
    }),
  }),
});

export type SimulationApiResult = z.infer<typeof simulationApiResultSchema>;