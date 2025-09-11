'use client'

import React from 'react';
import Link from 'next/link';
import { LucideIcon, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
    tool: {
      title: string;
      description: string;
      icon: LucideIcon;
      button: string;
      gradient: string;
      path: string;
      category?: string;
    };
    index: number;
    recordId: string;
    isLoading: boolean;
    isHovered: boolean;
    onHover: (index: number | null) => void;
    onClick: (title: string, recordId: string) => void;
    isDialogTool: boolean;
  }
  
export const ToolCard: React.FC<ToolCardProps> = ({
    tool,
    index,
    recordId,
    isLoading,
    isHovered,
    onHover,
    onClick,
    isDialogTool,
  }) => {
    const content = isLoading ? (
      <Loader2 className="animate-spin w-5 h-5" />
    ) : (
      <>
        {tool.button}
        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </>
    );
  
    return (
      <div
        className="group relative overflow-hidden"
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
        
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/40 rounded-2xl" />
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tool.gradient} opacity-20 blur-sm`} />
          </div>
  
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} p-3 mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              <tool.icon className="w-full h-full text-white" />
            </div>
  
            {/* Category Badge */}
            {tool.category && (
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {tool.category}
                </span>
              </div>
            )}
  
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-gray-100 transition-colors duration-300">
              {tool.title}
            </h3>
  
            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {tool.description}
            </p>
  
            {/* Action Button */}
            {isDialogTool ? (
              <Button
                onClick={() => onClick(tool.title, recordId)}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-white/90 to-gray-100 text-gray-900 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group-hover:from-white group-hover:to-white ${isLoading ? 'opacity-70' : ''}`}
              >
                {content}
              </Button>
            ) : (
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-white/90 to-gray-100 text-gray-900 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group-hover:from-white group-hover:to-white"
              >
                <Link href={`${tool.path}/${recordId}`}>
                  {content}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };