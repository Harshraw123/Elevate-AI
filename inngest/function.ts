

import { inngest } from "./client";
// Import 'gemini' instead of 'openai'
import { Agent, createAgent, gemini } from "@inngest/agent-kit";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";


var ImageKit = require("imagekit");


export const AiCarrerChatAgent = createAgent({
  name: "AiCarrerAgent",
  description: "An AI agent that helps users with career-related questions and provides guidance on skills, resources, and job opportunities.",
  system: "You are an AI career coach that helps users with career-related questions and provides guidance on skills, resources, and job opportunities. You are friendly, knowledgeable, and always ready to assist users in their career journey. If user asked something unrelated to carrer just say 'I am not able to help you with that, I am a career coach and I can only help you with career-related questions.'",

  model: gemini({
    model: "gemini-2.0-flash", 
    apiKey: process.env.GEMINI_API_KEY, 
  }),
});


export const handleAiCareerQuery = inngest.createFunction(
    {
        id: 'AiChat', 
    },
    {
        event: 'AiChat', // Define a clear event name for this function
    },
    async ({ event, step }) => {
    

        const { userInput } =await event?.data;

        if (!userInput) {
            console.warn("Received an AI career query event without 'userInput'.");
            return { message: "Error: No user input provided." };
        }


        const agentResponse = await AiCarrerChatAgent.run(userInput);

    
        console.log("AI Agent Response:", agentResponse);

        return {
            status: "success",
            query: userInput,
            response: agentResponse, // Return the agent's full response
            message: "AI career query processed successfully.",
        };
    },
);


export const AiResumeSummeryAgent = createAgent({
  name: "AiResumeSummeryAgent",
  description: "Generates resume summaries for different job levels.",
  system: `You are an AI agent that generates professional resume summaries. 
You will receive a 'jobTitle' as input and must respond ONLY with a valid JSON array. 
Each object should have:
- "level": one of ["Fresher", "Entry", "Mid", "Senior"]
- "summary": a 100–150 word professional summary tailored to the given job title.

Example format:
[
  { "level": "Fresher", "summary": "..." },
  { "level": "Entry", "summary": "..." },
  { "level": "Mid", "summary": "..." },
  { "level": "Senior", "summary": "..." }
]

Do not include any extra text outside of the JSON array.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});


export const AiResumeBulletPointsAgent = createAgent({
  name: "AiResumeBulletPointsAgent",
  description: "Generates 6-7 professional bullet points for a resume based on a given job title.",
  system: `You are an AI agent that generates professional resume bullet points.
You will receive a 'jobTitle' as input and must respond ONLY with a valid JSON array of strings. 
Each string should be a concise, impactful bullet point (8–15 words) tailored to the given job title.
Generate exactly 6–7 points that could be displayed in an unordered list on a resume.

Example format:
[
  "Proficient in developing responsive web applications using React and TypeScript",
  "Collaborated with cross-functional teams to deliver projects ahead of schedule",
  "Optimized backend APIs for faster data retrieval and improved scalability",
  "Implemented automated testing to ensure high-quality code delivery",
  "Designed intuitive user interfaces enhancing user engagement by 20%",
  "Maintained clear documentation for seamless team onboarding"
]

Do not include any extra text outside of the JSON array.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});



export const handleAiResumeBulletPoints = inngest.createFunction(
  { id: 'AiResumeBulletPoints' },
  { event: 'AiResumeBulletPoints' },
  async ({ event }) => {
    const { jobTitle } = event?.data;
    if (!jobTitle) return { message: "Error: No job title provided." };

    const agentResponse = await AiResumeBulletPointsAgent.run(jobTitle);

    return {
      status: "success",
      query: jobTitle,
      response: agentResponse,
      message: "AI resume bullet points generated successfully.",
    };
  },
);

export const handleAiResumeSummery = inngest.createFunction(
  { id: 'AiResumeSummery' },
  { event: 'AiResumeSummery' },
  async ({ event }) => {
    const { jobTitle } = event?.data;
    if (!jobTitle) return { message: "Error: No job title provided." };

    const agentResponse = await AiResumeSummeryAgent.run(jobTitle);

    return {
      status: "success",
      query: jobTitle,
      response: agentResponse,
      message: "AI resume summary generated successfully.",
    };
  },
);



const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });


  const AiResumeAnalyzerAgent = createAgent({
    name: "ResumeAnalysisAgent",
    description: "Analyzes resume images and provides structured feedback.",
    system: `
  You are an advanced AI Resume Analyzer Agent.
  
  📥 INPUT: You will receive either a resume as plain text or OCR-extracted content from an image.
  
  🎯 GOAL: Analyze the resume and return a structured JSON object based on the criteria below. Do not include any extra commentary or text outside ,use minimal but impactful words the JSON.
  
  🧾 OUTPUT FORMAT (strict JSON):
  
  {
    "overall_score": number, // value between 0 and 100
    "overall_feedback": "string", // e.g., "Excellent", "Good", "Needs improvement"
    "summary_comment": "string", // 1–2 sentence summary
    "sections": {
      "contact_info": {
        "score": number, // percentage
        "comment": "string",
        "tips": ["string", "string", "string"],
        "strengths": ["string", "string"],
        "weaknesses": ["string"]
      },
      "experience": {
        "score": number,
        "comment": "string",
        "tips": [...],
        "strengths": [...],
        "weaknesses": [...]
      },
      "education": {
        "score": number,
        "comment": "string",
        "tips": [...],
        "strengths": [...],
        "weaknesses": [...]
      },
      "skills": {
        "score": number,
        "comment": "string",
        "tips": [...],
        "strengths": [...],
        "weaknesses": [...]
      }
    }
  }
  
  ✅ Focus on:
  1. Content and structure clarity
  2. Skills and experience relevance
  3. Formatting, layout, and readability
  4. Keyword usage for ATS optimization
  5. Overall impact and presentation quality
  
  
  Return only a valid JSON object as shown above. No additional explanations.
  `,
    model: gemini({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEMINI_API_KEY!,
    }),
  });
  



  
  export const AiResumeAgent = inngest.createFunction(
    { id: "AiResumeAgent" },
    { event: "AiResumeAgent" },
    async ({ event, step }) => {
      const { recordId, base64ResumeFile, pdfText ,userEmail} = event.data;
  
      if (!process.env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY is missing");
        return {
          success: false,
          error: "GEMINI_API_KEY is not configured",
          recordId,
        };
      }
  
      try {
        // 🟢 Upload image to ImageKit and get URL
        const uploadImageUrl = await step.run("Upload Resume Image to ImageKit", async () => {
          try {
            const imageKitFile = await imagekit.upload({
              file: base64ResumeFile,
              fileName: `${Date.now()}.pdf`,
              isPublished: true,
            });
            return imageKitFile.url;
          } catch (err: any) {
            console.error("❌ Error uploading image to ImageKit:", err);
            throw new Error("Failed to upload image");
          }
        });
  
        // 🧠 Analyze resume using Gemini agent
        const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
        //@ts-ignore
        const requiredOutput=aiResumeReport.output[0].content;
          const  requiredOutputJson=requiredOutput.replace('```json','').replace('```','');
          const parsedJson=JSON.parse(requiredOutputJson);
//@ts-ignore
          await db.insert(HistoryTable).values({
            recordId,
            content: parsedJson,
            userEmail,
            createdAt: new Date(),
            aiAgentType: "AI Resume Analyzer",
            metaData: {
              source: "imagekit",
              imageUrl: uploadImageUrl,
            },
          });



          return parsedJson;

  
      } catch (error: any) {
        console.error("❌ AiResumeAgent error:", error);
        return {
          success: false,
          error: error.message || "Unexpected error in resume analysis",
          recordId,
        };

      }
    }
  );
  
        

  const AiRoadmapAgent = createAgent({
    name: "AiRoadmapAgent",
    description: "Generate a tree like structure Roadmapp for a give position or skill.",
    system: `Generate a React flow tree-structured learning roadmap for user input position/skills the following format:
  vertical tree structure with meaningful x/y positions to form a flow

     Structure should be similar to roadmap.sh layout
    Steps should be ordered from fundamentals to advanced
   Include branching for different specializations (if applicable)
   Each node must have a title, short description, and learning resource link
   Use unique IDs for all nodes and edges
   make it more spacious node position,
    Response in JSON format
{
  "roadmapTitle": "",
  "description": "<3-5 Lines>",
  "duration": "",
  "initialNodes": [
    {
      "id": "1",
      "type": "turbo",
      "position": { "x": 0, "y": 0 },
      "data": {
        "title": "Step Title",
        "description": "Short two-line explanation of what the step covers.",
        "link": "Helpful link for learning this step"
      }
    },
    "..."
  ],
  "initialEdges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2"
    },
    "..."
  ]
}

`,
    model: gemini({
      model: "gemini-2.0-flash",
      apiKey: process.env.GEMINI_API_KEY!,
    }),
  });


  


  
  export const AiRoadmapGenerator = inngest.createFunction(
    {
      id: "AiRoadmapGenerator",
    },
    {
      event: "AiRoadmapGenerator",
    },
    async ({ event, step }) => {
      const { roadmapId, userInput, userEmail } = event.data;
  
      // Call your AI agent
      const roadmapResult = await AiRoadmapAgent.run(userInput);
  //@ts-ignore
      const rawContent = roadmapResult.output[0].content;
      const rawContentJson = rawContent
        .replace('```json', '')
        .replace('```', '')
        .trim();
  
      const parsedJson = JSON.parse(rawContentJson);
  
      // Save to DB
      await step.run("Save Roadmap to DB", async () => {
        //@ts-ignore
        return await db.insert(HistoryTable).values({
          recordId: roadmapId,
          content: parsedJson,
          userEmail: userEmail,
          createdAt: new Date(),
          aiAgentType: "Learning Roadmap",
          metaData: {}, // ✅ Empty object or any actual metadata you want to include
        });
      });
  
      console.log("Generated Roadmap:", parsedJson);
  
      return {
        status: "success",
        roadmapId,
        userEmail,
        result: parsedJson,
      };
    }
  );


 
  export const AiCoverLetterGenratorAgent = createAgent({
    name: "AiCoverLetterGenratorAgent",
    description:
      "AI agent that generates professional, personalized cover letters based on job details provided by the user.",
    system: `
  You are a professional AI career assistant specializing in writing cover letters tailored to job descriptions and user experience.
  
  - Your goal is to generate personalized, concise, and compelling cover letters that align with the role's expectations.
  - Reflect the user's strengths, enthusiasm, and suitability for the position.
  - If information is incomplete, infer intelligently. Avoid giving unrelated advice.
  - Use a professional business letter format.
  - Keep the tone professional yet enthusiastic.
  - Highlight relevant experience and skills that match the job requirements.
  
  Always return ONLY the final cover letter content ready to display in frontend — no extra commentary, explanations, or metadata.
    `.trim(),
    model: gemini({
      model: "gemini-2.0-flash",
      apiKey: process.env.GEMINI_API_KEY!,
    }),
  });
  
  // ✅ Prompt builder
  export function buildCoverLetterPrompt({
    userName,
    position,
    resumeSummary,
    jobDescription,
  }: {
    userName?: string;
    position?: string;
    resumeSummary?: string;
    jobDescription?: string;
  }): string {
    return `
  You are an expert career coach and cover letter writer.
  
  Please generate a personalized and professional cover letter based on:
  
  - Full Name: ${userName || "Job Applicant"}
  - Position: ${position || "the advertised position"}
  - Resume Summary: ${resumeSummary || "Not provided - please create a generic professional background"}
  - Job Description: ${jobDescription || "Not provided - please create a general professional cover letter"}
  
  Requirements:
  - Use formal business cover letter format
  - Include proper greeting, introduction, body paragraphs, and professional closing
  - Maintain a professional and enthusiastic tone
  - Match the user's experience (from resume summary) to the job requirements
  - Highlight relevant skills and achievements
  - Show genuine interest in the role and company
  - Keep it concise but compelling (3-4 paragraphs)
  - End with a call to action
  
  Return ONLY the final formatted cover letter content — no extra notes, explanations, or commentary.
    `.trim();
  }
  
  // ✅ Inngest function
  export const AiCoverLetterAgent = inngest.createFunction(
    { id: "AiCoverLetterAgent" },
    { event: "AiCoverLetterAgent" },
    async ({ event, step }) => {
      const {
        coverLetterId,
        userName,
        position,
        resumeSummary,
        jobDescription,
        userEmail,
      } = event.data;
  
      // ✅ Generate cover letter outside step.run
      const prompt = buildCoverLetterPrompt({
        userName,
        position,
        resumeSummary,
        jobDescription,
      });
  
      const result = await AiCoverLetterGenratorAgent.run(prompt);
      //@ts-ignore
      const coverLetterText = result.output[0].content.trim();
  
      // ✅ Save to DB in a step (required by Inngest)
      await step.run("Save Cover Letter to DB", async () => {
        //@ts-ignore
        return await db.insert(HistoryTable).values({
          recordId: coverLetterId,
          content: coverLetterText,
          userEmail: userEmail,
          createdAt: new Date(),
          aiAgentType: "Cover Letter Generator",
          metaData: {},
        });
      });
  
      console.log("📄 Generated Cover Letter:", coverLetterText);
  
      return {
        status: "success",
        content: coverLetterText,
        coverLetterId,
        userEmail,
        timestamp: new Date().toISOString(),
      };
    }
  );