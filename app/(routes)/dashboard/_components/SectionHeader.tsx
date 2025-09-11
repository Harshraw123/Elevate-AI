'use client';

import React from 'react';

 export const SectionHeader: React.FC = () => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
      <span className="text-blue-400 text-sm font-medium">AI-Powered Tools</span>
    </div>
    <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
      Next-Gen Career Tools
    </h2>
    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
      Accelerate your career journey with cutting-edge AI technology designed for modern professionals
    </p>
  </div>
);