// app/api/save-conversation/route.ts
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
  const { messages, sessionStart, sessionEnd, totalMessages, userId } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No conversation messages provided' }, { status: 400 });
  }

  try {
    // Format the conversation as a readable transcript
    const conversationText = messages.map((msg: { timestamp: string; role: string; text: string }, index: number) => {
      const timestamp = new Date(msg.timestamp).toLocaleTimeString();
      return `[${timestamp}] ${msg.role === 'user' ? 'You' : 'AI Coach'}: ${msg.text}`;
    }).join('\n');

    // Create a summary for the content field
    const conversationSummary = `Voice Coaching Session\n` +
      `Duration: ${sessionStart} - ${sessionEnd}\n` +
      `Total Messages: ${totalMessages}\n\n` +
      `Conversation:\n${conversationText}`;

    await db.insert(HistoryTable).values({
      userEmail: user?.primaryEmailAddress?.emailAddress || '',
      aiAgentType: 'Voice Coach',
      content: conversationSummary,
      recordId: userId,
      createdAt: sessionEnd,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Saved conversation with ${totalMessages} messages` 
    });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Failed to save conversation' }, { status: 500 });
  }
}
