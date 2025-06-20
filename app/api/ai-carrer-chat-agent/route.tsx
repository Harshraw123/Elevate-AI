import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: any) {

  const{userInput}=await request.json();
  const resultIds=await inngest.send({
    name:"AiChat",
    data:{
      userInput:userInput
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