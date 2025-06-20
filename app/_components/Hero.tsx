"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-background text-foreground">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-20 right-1/3 w-52 h-52 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full blur-3xl opacity-30 animate-ping"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-3/4 left-1/4 w-36 h-36 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/40 rounded-full px-5 py-2 text-sm text-blue-300 tracking-wide space-y-2">
          AI-POWERED CAREER GUIDANCE
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              AMAZINGLY
            </span>
            <br />
            SIMPLE
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            We designed AI Career Coach to be intuitive, fast, and exceptionally helpful for your professional journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center   items-center mb-12">
          <Link href='/dashboard'>    <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              TRY IT NOW
            </Button>
         <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted px-8 py-4 text-lg"
              
            >
              Learn More
            </Button>
            </Link> 
          </div>

          {/* Responsive Video */}
          <div className="mx-auto max-w-5xl rounded-xl overflow-hidden shadow-none w-full ">
            <video
              src="/Hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover mix-blend-lighten rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
