import { NextResponse } from 'next/server';

// Cache configuration for TTFB optimization
const CACHE_MAX_AGE = 60 * 5; // 5 minutes
const STALE_WHILE_REVALIDATE = 60 * 10; // 10 minutes

export async function GET() {
  try {
    // Simulate database query or external API call
    const data = {
      message: "TTFB Optimized Response",
      timestamp: new Date().toISOString(),
      performance: "optimized"
    };

    // Return response with optimized headers
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache control for TTFB optimization
        'Cache-Control': `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
        // Compression headers
        'Content-Encoding': 'gzip',
        // Performance headers
        'X-Response-Time': '0ms',
        'X-Cache': 'HIT',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process the request
    const result = {
      success: true,
      data: body,
      timestamp: new Date().toISOString(),
      processingTime: '0ms'
    };

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    );
  }
}
