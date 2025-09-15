import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
// import PerformanceMonitor from "./_components/PerformanceMonitor";
// import TTFBMonitor from "./_components/TTFBMonitor";
import LoadingOptimizer from "./_components/LoadingOptimizer";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

// Metadata
export const metadata: Metadata = {
  title: "Elevate AI",
  description: "Elevate AI - Your AI-powered career assistant.",
  // Performance optimizations
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

// Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          {/* DNS Prefetch for external resources */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//img.clerk.com" />
          
          {/* Preconnect to critical domains */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-foreground`}>
          <LoadingOptimizer />
          <Provider>
            {children}
            {/* <PerformanceMonitor />
            <TTFBMonitor /> */}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
