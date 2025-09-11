import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm'; 


import {currentUser} from '@clerk/nextjs/server';
import { HistoryTable } from '@/configs/schema';

export async function POST(req: Request) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    const { content, recordId ,aiAgentType} = await req.json();
  
    try {
      const result = await db.insert(HistoryTable).values({
        recordId,
        content,
        userEmail: user.primaryEmailAddress?.emailAddress ?? "unknown",
        createdAt: new Date().toISOString(),
        aiAgentType:aiAgentType,
      }).returning();
  
      return NextResponse.json(result);
    } catch (e) {
      console.error("DB Insertion Error:", e);
      return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }
  }
  

  


export async function PUT(req: Request) {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { content, recordId } = await req.json();
  
    if (!recordId) {
      return NextResponse.json({ error: "Missing recordId" }, { status: 400 });
    }
  
    try {
      const result = await db
        .update(HistoryTable)
        .set({
          content,
          userEmail: user.primaryEmailAddress?.emailAddress ?? "unknown",
          createdAt: new Date().toISOString(),
        })
        .where(eq(HistoryTable.recordId, recordId)) // ✅ Make sure to filter by recordId
        .returning();
  
      return NextResponse.json(result);
    } catch (e) {
      console.error("DB Update Error:", e);
      return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }
  }




  export async function GET(req: Request) {
    try {
      const user = await currentUser();
      if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Unauthorized or missing email address" }, { status: 401 });
      }
      const email = user.primaryEmailAddress.emailAddress;
      const url = new URL(req.url);
      const chatid = url.searchParams.get("chatid");

      if (chatid) {
        // Fetch by chatid (existing behavior)
        const result = await db
          .select()
          .from(HistoryTable)
          .where(eq(HistoryTable.recordId, chatid));
        if (!result || result.length === 0) {
          return NextResponse.json({ error: "No history found" }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
      } else {
        // Fetch all history for the user
        const result = await db
          .select()
          .from(HistoryTable)
          .where(eq(HistoryTable.userEmail, email));
        return NextResponse.json(result, { status: 200 });
      }
    } catch (error) {
      console.error("GET /api/history error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized or missing email address" }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    // Delete the record
    const result = await db
      .delete(HistoryTable)
      .where(eq(HistoryTable.id, parseInt(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/history error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}