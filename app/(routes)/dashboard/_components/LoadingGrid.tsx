'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingGridProps {
  tools: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
    button: string;
    gradient: string;
    category?: string;
  }>;
}

export const LoadingGrid: React.FC<LoadingGridProps> = ({ tools }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {tools.map((tool, index) => (
      <div
        key={index}
        className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/40 rounded-2xl" />
        <div className="relative z-10">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} p-3 mb-6 shadow-lg`}>
            <tool.icon className="w-full h-full text-white" />
          </div>
          {tool.category && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {tool.category}
              </span>
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-3 leading-tight">
            {tool.title}
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {tool.description}
          </p>
          <Button
            disabled
            className="w-full bg-gradient-to-r from-white/90 to-gray-100 text-gray-900 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {tool.button}
          </Button>
        </div>
      </div>
    ))}
  </div>
);
