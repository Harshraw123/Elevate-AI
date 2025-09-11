'use client';

import React from 'react';
import { Brain, ArrowRightCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const WelcomeBanner: React.FC = () => {
  return (
    <section className="relative py-6 sm:py-10 lg:py-16">
      {/* Background Image Container */}
      <div className="relative max-w-6xl mx-auto sm:rounded-3xl overflow-hidden shadow-2xl">
        <Image
          className="w-full h-72 sm:h-80 md:h-[22rem] lg:h-[26rem] object-cover"
          src="/Banner.avif"
          alt="AI Career Banner"
          width={1200}
          height={400}
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0" />

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            {/* Glassmorphism Card */}
            <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg text-center flex flex-col items-center">
              
              {/* Icon Row */}
              <div className="flex gap-3 sm:gap-5 mb-5">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <ArrowRightCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Elevate Your Career with AI
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
                Transform your professional journey with AI-powered learning and personalized career roadmaps.
              </p>

              {/* CTA Button */}
              <Link href={'/profile'}><button className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white font-semibold text-sm sm:text-base transition-all hover:scale-105 shadow-md">
                Profile
                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
