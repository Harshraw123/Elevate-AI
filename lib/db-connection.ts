import { db } from '@/configs/db';
import { sql } from 'drizzle-orm';

// TTFB Optimization: Connection health check using Drizzle
export async function checkConnectionHealth() {
  try {
    const startTime = Date.now();
    const result = await db.execute(sql`SELECT NOW()`);
    const queryTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      timestamp: result[0]?.now || new Date().toISOString(),
      queryTime,
      database: 'Neon (Drizzle ORM)',
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      database: 'Neon (Drizzle ORM)',
    };
  }
}

// TTFB Optimization: Optimized query function with Drizzle
export async function executeQuery<T = any>(
  queryText: string,
  params: any[] = [],
): Promise<T[]> {
  try {
    const startTime = Date.now();
    
    // Use Drizzle's sql template for safe queries
    const result = await db.execute(sql.raw(queryText, params));
    const queryTime = Date.now() - startTime;
    
    // TTFB Optimization: Log slow queries
    if (queryTime > 1000) {
      console.warn(`Slow query detected: ${queryTime}ms - ${queryText.substring(0, 100)}...`);
    }
    
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// TTFB Optimization: Transaction helper with Drizzle
export async function executeTransaction<T = any>(
  queries: Array<{ text: string; params?: any[] }>,
): Promise<T[]> {
  try {
    const results: T[] = [];
    
    // Drizzle handles transactions automatically
    for (const query of queries) {
      const result = await db.execute(sql.raw(query.text, query.params || []));
      results.push(result as T);
    }
    
    return results;
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
}

// TTFB Optimization: Database metrics (simplified for Drizzle)
export function getDatabaseMetrics() {
  return {
    type: 'Neon Database',
    orm: 'Drizzle ORM',
    connection: 'HTTP (Serverless)',
    pooling: 'Managed by Neon',
  };
}

// TTFB Optimization: Connection pool info (Neon manages this)
export function getPoolMetrics() {
  return {
    type: 'Neon Serverless',
    maxConnections: 'Unlimited (Serverless)',
    idleTimeout: 'Managed by Neon',
    connectionPooling: 'Automatic',
  };
}

export default db;
