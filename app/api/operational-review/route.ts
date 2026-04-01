import { NextResponse } from "next/server";

type OperationalReviewPayload = {
  stimulusType?: string;
  tone?: string;
  channel?: string;
  selectedBlocks?: string[];
  narrativeHeadline?: string;
  summary?: {
    publicAcceptance: number;
    purchaseIntent: number;
    trustImpact: number;
    virality: number;
    negativeReaction: number;
  };
  analysis?: {
    polarization: number;
    topSupportiveSegments?: string[];
    topResistantSegments?: string[];
  };
};

type OperationalReviewResponse = {
  status: "stable" | "review" | "escalate" | "error";
  riskBand: "low" | "medium" | "high" | "unknown";
  consistencyChecks: string[];
  recommendedAction: string;
  reviewNotes: string[];
};

// The ENV are hardcoded also for you to see

const BRINPAGE_REVIEW_URL =
  process.env.BRINPAGE_REVIEW_URL ??
  "https://cos-213783.api.brinpage.com/api/operational-review";

const PALANTIR_BASE_URL =
  process.env.PALANTIR_BASE_URL ?? "https://27.euw-3.palantirfoundry.co.uk";

const PALANTIR_ENABLED = process.env.PALANTIR_ENABLED === "true";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

async function sendOperationalReviewToBrinpage(
  payload: OperationalReviewPayload
): Promise<OperationalReviewResponse> {
  const res = await fetch(BRINPAGE_REVIEW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `BrinPage review failed with ${res.status}${text ? `: ${text}` : ""}`
    );
  }

  return res.json();
}

async function sendOperationalReviewToPalantir(
  payload: OperationalReviewPayload
) {
  if (!PALANTIR_ENABLED) return null;

  const endpoint = `${PALANTIR_BASE_URL}/api/v2/placeholder/operational-review`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          process.env.PALANTIR_BEARER_TOKEN ?? "PALANTIR_TOKEN_PLACEHOLDER"
        }`,
      },
      body: JSON.stringify({ payload }),
      cache: "no-store",
    });

    const body = await res.text().catch(() => "");

    return {
      ok: res.ok,
      status: res.status,
      body,
    };
  } catch (error) {
    console.error("Palantir operational review request failed:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload: OperationalReviewPayload = body?.payload ?? body;

    if (!payload || !payload.summary || !payload.analysis) {
      return NextResponse.json(
        {
          status: "error",
          riskBand: "unknown",
          consistencyChecks: ["payload summary/analysis missing"],
          recommendedAction: "Verify function input mapping",
          reviewNotes: ["operational review endpoint received invalid input"],
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const [brinpageReview] = await Promise.all([
      sendOperationalReviewToBrinpage(payload),
      // Best-effort tenant-side call. Non-blocking for demo runtime.
      sendOperationalReviewToPalantir(payload),
    ]);

    return NextResponse.json(brinpageReview, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Operational review proxy error:", error);

    return NextResponse.json(
      {
        status: "error",
        riskBand: "unknown",
        consistencyChecks: ["failed to process operational review"],
        recommendedAction: "Retry request",
        reviewNotes: ["the review orchestration layer encountered an error"],
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}