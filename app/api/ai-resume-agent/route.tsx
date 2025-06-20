// app/api/ai-resume-agent/route.ts

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { Buffer } from "buffer";
import { currentUser } from "@clerk/nextjs/server";

import axios from "axios";




export async function POST(req: Request) {

    const formData = await req.formData();
    const resumefile: any = formData.get("resumefile");
    const recordId = formData.get("recordId");

    if (!resumefile || !recordId) {
      console.error("❌ Missing file or recordId");
      return NextResponse.json({ error: "Missing file or recordId" }, { status: 400 });
    }

    console.log("🔹 Received resume file:", resumefile.name);
    const user=await currentUser();

    const loader= new WebPDFLoader(resumefile)
    const docs=await loader.load();
    console.log("Loaded documents:",docs[0])

    //resume file ko blob me taki cloud pe ja ske


const arraybuffer=await resumefile.arrayBuffer();
const base64=Buffer.from(arraybuffer).toString('base64');


  const resultIds=await inngest.send({
    name:"AiResumeAgent",
    data:{
   recordId:recordId,
  
  
   base64ResumeFile:base64,
   pdfText:docs[0]?.pageContent,
   userEmail:user?.primaryEmailAddress?.emailAddress
    }

  })
const runId=resultIds.ids[0];
let runStatus;
while(true){
  runStatus=await getRuns(runId)
  if(runStatus?.data[0]?.status==="Completed")
    break;
  await new Promise(resolve=>setTimeout(resolve,500))

}
const content = runStatus.data[0].output?.response?.output?.[0]?.content || "No response.";
return NextResponse.json({ output: content });



}

export async function getRuns(runId: string) {
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








    