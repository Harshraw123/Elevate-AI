import { inngest } from "@/inngest/client";
import axios from "axios";
import { request } from "http";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request){

    const{roadmapId,userInput}=await req.json();

    

    if (!roadmapId || !userInput) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const user=await currentUser();
    const resultIds=await inngest.send({
        name:"AiRoadmapGenerator",
        data:{
            roadmapId:roadmapId,
          userInput:userInput,
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


    

