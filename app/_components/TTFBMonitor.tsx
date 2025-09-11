'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { Clock, TrendingDown, AlertTriangle, CheckCircle, Activity, Database } from 'lucide-react';

interface TTFBMetrics {
  current: number | null;
  average: number | null;
  best: number | null;
  worst: number | null;
  count: number;
}

interface APIResponse {
  ttfb: number;
  cached: boolean;
  endpoint: string;
  timestamp: string;
  status?: string;
}

const TTFBMonitor = () => {
  const [metrics, setMetrics] = useState<TTFBMetrics>({
    current: null,
    average: null,
    best: null,
    worst: null,
    count: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [recentResponses, setRecentResponses] = useState<APIResponse[]>([]);
  const [dbStatus, setDbStatus] = useState<string>('unknown');

  const measureTTFB = useCallback(async () => {
    // Only test one key endpoint to reduce overhead
    const endpoint = '/api/db-check';
    
    try {
      const startTime = performance.now();
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const endTime = performance.now();
      
      if (response.ok) {
        const data = await response.json();
        const ttfb = Math.round(endTime - startTime);
        
        // Update database status
        setDbStatus(data.status || 'unknown');
        
        // Add to recent responses
        const newResponse: APIResponse = {
          ttfb,
          cached: data.cached || false,
          endpoint,
          timestamp: new Date().toISOString(),
          status: data.status,
        };
        
        setRecentResponses(prev => [newResponse, ...prev].slice(0, 5));
        
        // Update metrics
        setMetrics(prev => ({
          current: ttfb,
          average: prev.count === 0 ? ttfb : Math.round(((prev.average || 0) * prev.count + ttfb) / (prev.count + 1)),
          best: prev.best === null ? ttfb : Math.min(prev.best, ttfb),
          worst: prev.worst === null ? ttfb : Math.max(prev.worst, ttfb),
          count: prev.count + 1,
        }));
      }
    } catch (error) {
      console.error(`Error measuring TTFB for ${endpoint}:`, error);
      setDbStatus('error');
    }
  }, []);

  const getTTFBStatus = useCallback((ttfb: number): { color: string; icon: ReactNode; label: string } => {
    if (ttfb <= 200) {
      return { color: 'text-green-400', icon: <CheckCircle className="w-4 h-4" />, label: 'Excellent' };
    } else if (ttfb <= 600) {
      return { color: 'text-yellow-400', icon: <Activity className="w-4 h-4" />, label: 'Good' };
    } else if (ttfb <= 1000) {
      return { color: 'text-orange-400', icon: <AlertTriangle className="w-4 h-4" />, label: 'Needs Improvement' };
    } else {
      return { color: 'text-red-400', icon: <AlertTriangle className="w-4 h-4" />, label: 'Poor' };
    }
  }, []);

  const getTTFBColor = useCallback((ttfb: number): string => {
    if (ttfb <= 200) return 'text-green-400';
    if (ttfb <= 600) return 'text-yellow-400';
    if (ttfb <= 1000) return 'text-orange-400';
    return 'text-red-400';
  }, []);

  const getDBStatusColor = useCallback((status: string): string => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'unhealthy': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  }, []);

  const getDBStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'unhealthy': return <AlertTriangle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  }, []);

  useEffect(() => {
    // Show monitor after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Measure TTFB every 30 seconds
      const interval = setInterval(measureTTFB, 30000);
      measureTTFB(); // Initial measurement
      
      return () => clearInterval(interval);
    }
  }, [isVisible, measureTTFB]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">TTFB Monitor</span>
          <TrendingDown className="w-4 h-4 text-green-400" />
        </div>
        
        {/* Database Status */}
        <div className="mb-3 p-2 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Database</span>
            <div className="flex items-center gap-2">
              {getDBStatusIcon(dbStatus)}
              <span className={`text-xs font-medium ${getDBStatusColor(dbStatus)}`}>
                {dbStatus === 'healthy' ? 'Connected' : dbStatus === 'unhealthy' ? 'Error' : 'Checking...'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Current TTFB */}
        {metrics.current !== null && (
          <div className="mb-3 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Current TTFB</span>
              {getTTFBStatus(metrics.current).icon}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getTTFBColor(metrics.current)}`}>
                {metrics.current}ms
              </span>
              <span className="text-xs text-gray-400">
                {getTTFBStatus(metrics.current).label}
              </span>
            </div>
          </div>
        )}
        
        {/* TTFB Statistics */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {metrics.average !== null && (
            <div className="text-center p-2 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400">Average</div>
              <div className={`text-sm font-semibold ${getTTFBColor(metrics.average)}`}>
                {metrics.average}ms
              </div>
            </div>
          )}
          
          {metrics.best !== null && (
            <div className="text-center p-2 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400">Best</div>
              <div className="text-sm font-semibold text-green-400">
                {metrics.best}ms
              </div>
            </div>
          )}
          
          {metrics.worst !== null && (
            <div className="text-center p-2 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400">Worst</div>
              <div className="text-sm font-semibold text-red-400">
                {metrics.worst}ms
              </div>
            </div>
          )}
          
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-xs text-gray-400">Tests</div>
            <div className="text-sm font-semibold text-white">
              {metrics.count}
            </div>
          </div>
        </div>
        
        {/* Recent API Responses */}
        {recentResponses.length > 0 && (
          <div className="border-t border-white/10 pt-3">
            <div className="text-xs text-gray-400 mb-2">Recent API Calls</div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {recentResponses.slice(0, 5).map((response, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 truncate max-w-32">
                    {response.endpoint.split('/').pop()}
                  </span>
                  <div className="flex items-center gap-2">
                    {response.cached && (
                      <span className="text-green-400 text-xs">Cached</span>
                    )}
                    {response.status === 'error' && (
                      <span className="text-red-400 text-xs">Error</span>
                    )}
                    <span className={`font-mono ${getTTFBColor(response.ttfb)}`}>
                      {response.ttfb === 9999 ? 'Failed' : `${response.ttfb}ms`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Manual Test Button */}
        <button
          onClick={measureTTFB}
          className="w-full mt-3 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs transition-all duration-200"
        >
          Test TTFB Now
        </button>
      </div>
    </div>
  );
};

export default TTFBMonitor;
