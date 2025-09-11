import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {  
  AiRoadmapGenerator, 
  handleAiCareerQuery,
  AiCoverLetterAgent,
  AiResumeAgent,
  handleAiResumeSummery,
  handleAiResumeBulletPoints
} from "@/inngest/function";

// Serve the registered Inngest function(s)
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    handleAiCareerQuery,// ✅ must be a valid function created via inngest.createFunction
    AiResumeAgent,
    AiRoadmapGenerator,
    AiCoverLetterAgent,
    handleAiResumeSummery,
    handleAiResumeBulletPoints
  ],
});
