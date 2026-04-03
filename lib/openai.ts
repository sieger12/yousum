import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const SummarySchema = z.object({
  summary: z.array(z.string()).describe("3-sentence summary as an array"),
  keyPoints: z.array(z.string()).min(5).max(7).describe("5-7 key takeaways"),
  beginnerExplanation: z.string().describe("Simple 1-2 sentence explanation for beginners"),
  actionChecklist: z.array(z.string()).min(3).max(6).describe("Actionable steps from the video"),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).length(3).describe("3 FAQs based on the content"),
  timestamps: z.array(z.object({
    time: z.string().describe("MM:SS format"),
    label: z.string(),
  })).min(3).max(6),
});

export type SummaryResult = z.infer<typeof SummarySchema>;

export async function generateSummary(title: string, transcriptText: string): Promise<SummaryResult> {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: SummarySchema,
    prompt: `Summarize this YouTube video titled "${title}".

Provide:
- A 3-sentence summary
- 5-7 key points
- A beginner-friendly explanation
- An actionable checklist
- 3 FAQ pairs
- 4-6 timestamp moments

Transcript:
${transcriptText}`,
  });
  return object;
}
