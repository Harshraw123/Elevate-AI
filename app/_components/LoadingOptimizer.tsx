'use client';

import { useEffect } from 'react';

// Simple loading optimizations that actually work
const LoadingOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      ];
      
      fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Remove unused CSS (simple version)
    const removeUnusedStyles = () => {
      // Only run in production
      if (process.env.NODE_ENV === 'production') {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(sheet => {
          if (sheet.href.includes('unused') || sheet.href.includes('old')) {
            sheet.remove();
          }
        });
      }
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading="lazy" if not already present
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        removeUnusedStyles();
        optimizeImages();
      });
    } else {
      preloadCriticalResources();
      removeUnusedStyles();
      optimizeImages();
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('DOMContentLoaded', preloadCriticalResources);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default LoadingOptimizer;
