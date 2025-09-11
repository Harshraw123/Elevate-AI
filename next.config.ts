import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Simple, proven optimizations
  images: {
    domains: ['img.clerk.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Basic bundle analysis
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog'],
  },
  
  // Simple headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
