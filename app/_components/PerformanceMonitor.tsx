'use client';

import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

// Simple performance monitor - only measures what matters
const PerformanceMonitor: React.FC = () => {
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple page load time measurement
    const measurePageLoad = () => {
      if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        setPageLoadTime(loadTime);
      }
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    // Show monitor after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    
    return () => {
      window.removeEventListener('load', measurePageLoad);
      clearTimeout(timer);
    };
  }, []);

  const getLoadTimeColor = (time: number): string => {
    if (time < 1000) return 'text-green-400';
    if (time < 2000) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLoadTimeStatus = (time: number): string => {
    if (time < 1000) return 'Excellent';
    if (time < 2000) return 'Good';
    if (time < 3000) return 'Needs Work';
    return 'Poor';
  };

  // Only show if we have data and it's been 2+ seconds
  if (!isVisible || pageLoadTime === null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Speed</span>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getLoadTimeColor(pageLoadTime)}`}>
            {(pageLoadTime / 1000).toFixed(1)}s
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {getLoadTimeStatus(pageLoadTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
