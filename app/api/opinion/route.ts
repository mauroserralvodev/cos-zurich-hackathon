import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { person, stimulus } = body ?? {};

    const systemPrompt = `
You generate a very short first-person opinion for one synthetic person reacting to a stimulus.

Rules:
- Return only valid JSON.
- Write in first person.
- Keep it to 1 or 2 short sentences.
- Make it sound natural and specific to the person's profile.
- The opinion should reflect the person's likely reaction, not a generic summary.
- Do not mention percentages or numeric sentiment scores.
- Do not overexplain.
- No bullet points.
`;

    const userPrompt = `
Person profile:
${JSON.stringify(person, null, 2)}

Stimulus:
${JSON.stringify(stimulus, null, 2)}

Write what this person would say about that decision or stimulus.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    return NextResponse.json({
      opinion: parsed.opinion ?? "",
    });
  } catch (error) {
    console.error("Opinion generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate opinion" },
      { status: 500 }
    );
  }
}