import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export default async function generateAiResponse({
  prompt,
}: {
  prompt: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is not set");
  }

  const openai = createOpenAI({
    apiKey,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return result.toTextStreamResponse();
}
