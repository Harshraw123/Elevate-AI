// app/api/save-transcript/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { HistoryTable } from '@/configs/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { content,userId, timestamp } = body;

  if (!content || !timestamp) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await db.insert(HistoryTable).values({
      userEmail: user?.primaryEmailAddress?.emailAddress || '',
      aiAgentType: 'Voice Coach',
      content,
      recordId: userId,
      createdAt: timestamp,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Failed to save transcript' }, { status: 500 });
  }
}
