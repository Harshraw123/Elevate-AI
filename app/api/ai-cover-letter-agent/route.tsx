import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  console.log("🚀 Starting cover letter generation request");

  try {
    const { coverLetterId, userName, position, resumeSummary, jobDescription } =
      await req.json();

    console.log("📝 Request data:", {
      coverLetterId,
      userName: userName || "Not provided",
      position: position || "Not provided",
      resumeSummary: resumeSummary ? "Provided" : "Not provided",
      jobDescription: jobDescription ? "Provided" : "Not provided",
    });

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "unknown";

    console.log("👤 User:", userEmail);

    // Send Inngest Event
    console.log("📤 Sending event to Inngest...");
    const resultIds = await inngest.send({
      name: "AiCoverLetterAgent",
      data: {
        coverLetterId,
        userName,
        position,
        resumeSummary,
        jobDescription,
        userEmail,
      },
    });

    const runId = resultIds.ids[0];
    console.log("🟢 Inngest Run ID:", runId);

    let runStatus;
    while (true) {
      runStatus = await getRuns(runId);
      const status = runStatus?.data?.[0]?.status;
      console.log("⏳ Inngest run status:", status);
      if (status === "Completed") break;

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const content =
      runStatus.data?.[0]?.output?.response?.output?.[0]?.content || "⚠️ No response.";

    return NextResponse.json({ output: content });
  } catch (e) {
    console.error("❌ Error in POST /ai-cover-letter-agent:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ✅ Moved outside and exported cleanly
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
