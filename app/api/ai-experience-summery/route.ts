

import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { jobTitle } = await request.json();
  if (!jobTitle) {
    return NextResponse.json({ error: "No job title provided" }, { status: 400 });
  }

  // Send Inngest event
  const resultIds = await inngest.send({
    name: "AiResumeBulletPoints",
    data: { jobTitle }
  });

  const runId = resultIds.ids[0];
  let runStatus;
  let attempts = 0;

  while (attempts < 60) { // ~30 seconds max
    runStatus = await getRuns(runId);
    if (runStatus?.data[0]?.status === "Completed") break;
    await new Promise(res => setTimeout(res, 500));
    attempts++;
  }

  // Extract the actual response from Inngest
  const inngestResponse = runStatus?.data[0]?.output?.response;
  
  if (!inngestResponse) {
    return NextResponse.json({ error: "No response from AI agent" }, { status: 500 });
  }

  // The response has the structure: { agentName, output: [{ content: "```json..." }] }
  const rawContent = inngestResponse.output?.[0]?.content || "[]";
  
  // Remove markdown json wrapper if present
  const cleanContent = rawContent.replace(/```json\n?/g, '').replace(/```/g, '').trim();
  
  let parsedOutput;
  try {
    parsedOutput = JSON.parse(cleanContent);
  } catch (error) {
    console.error("Failed to parse AI response:", error, "Raw content:", rawContent);
    // If parsing fails, try to extract bullet points from the raw content
    parsedOutput = rawContent.split('\n').filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•')).map((line: string) => line.replace(/^[-•]\s*/, '').trim()).filter(Boolean);
  }

  return NextResponse.json({ output: parsedOutput });
}

async function getRuns(runId: string) {
  const result = await axios.get(
    `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    }
  );
  return result.data;
}
