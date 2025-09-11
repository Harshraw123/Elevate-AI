import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check database connection
    const result = await db.execute(sql`SELECT NOW() as current_time`);
    
    // Check if history table exists
    let historyTableExists = false;
    try {
      await db.execute(sql`SELECT 1 FROM history LIMIT 1`);
      historyTableExists = true;
    } catch (error) {
      historyTableExists = false;
    }
    
    const responseData = {
      status: 'healthy',
      database: 'Neon (Drizzle ORM)',
      connection: 'HTTP Serverless',
      currentTime: new Date().toISOString(),
      historyTableExists,
      ttfb: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responseData, {
      headers: {
        'X-TTFB': `${Date.now() - startTime}ms`,
        'X-DB-Status': 'healthy',
        'Cache-Control': 'no-cache',
      }
    });

  } catch (error: unknown) {
    console.error('Database Check Error:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Database connection failed',
        database: 'Neon (Drizzle ORM)',
        timestamp: new Date().toISOString(),
        ttfb: Date.now() - startTime
      },
      { 
        status: 500,
        headers: {
          'X-TTFB': `${Date.now() - startTime}ms`,
          'X-DB-Status': 'unhealthy',
        }
      }
    );
  }
}
