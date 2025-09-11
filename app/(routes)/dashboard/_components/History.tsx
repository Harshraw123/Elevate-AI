'use client';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { 
  MessageCircle, 
  FileText, 
  MapPin, 
  Mail, 
  Clock, 
  ArrowRight,
  Sparkles,
  Briefcase,
  TrendingUp,
  Activity,
  Calendar
} from 'lucide-react';
import Loader from './Loader';
import EmptyState from './EmptyState';

interface HistoryItem {
  aiAgentType: string;
  recordId: string;
  createdAt: string;
  aiAgent: string;
}

// ✅ Utility function to map agent types to route folders
const mapAgentTypeToRoute = (aiAgentType: string): string => {
  const map: Record<string, string> = {
    'AI Career Q&A Chat': 'ai-chat',
    'AI Resume Analyzer': 'ai-resume',
    'Learning Roadmap': 'ai-roadmap',
    'Cover Letter Generator': 'ai-coverLetter',
    'Voice Coach': 'ai-Coach/saved-conversations', // Special route for AI Coach
  };
  return map[aiAgentType] || aiAgentType; // fallback to same if not mapped
};

// ✅ Utility function to get icons for different agent types
const getAgentIcon = (aiAgentType: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'AI Career Q&A Chat': <MessageCircle className="w-5 h-5" />,
    'AI Resume Analyzer': <FileText className="w-5 h-5" />,
    'Learning Roadmap': <MapPin className="w-5 h-5" />,
    'Cover Letter Generator': <Mail className="w-5 h-5" />,
    'Voice Coach': <MessageCircle className="w-5 h-5" />,
  };
  return iconMap[aiAgentType] || <Sparkles className="w-5 h-5" />;
};

// ✅ Utility function to get colors for different agent types
const getAgentColors = (aiAgentType: string) => {
  const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
    'AI Career Q&A Chat': {
      bg: 'bg-blue-500/8',
      border: 'border-blue-500/20 hover:border-blue-400/40',
      icon: 'text-blue-400 bg-blue-500/15',
      text: 'text-blue-300'
    },
    'AI Resume Analyzer': {
      bg: 'bg-emerald-500/8',
      border: 'border-emerald-500/20 hover:border-emerald-400/40',
      icon: 'text-emerald-400 bg-emerald-500/15',
      text: 'text-emerald-300'
    },
    'Learning Roadmap': {
      bg: 'bg-purple-500/8',
      border: 'border-purple-500/20 hover:border-purple-400/40',
      icon: 'text-purple-400 bg-purple-500/15',
      text: 'text-purple-300'
    },
    'Cover Letter Generator': {
      bg: 'bg-orange-500/8',
      border: 'border-orange-500/20 hover:border-orange-400/40',
      icon: 'text-orange-400 bg-orange-500/15',
      text: 'text-orange-300'
    },
    'Voice Coach': {
      bg: 'bg-cyan-500/8',
      border: 'border-cyan-500/20 hover:border-cyan-400/40',
      icon: 'text-cyan-400 bg-cyan-500/15',
      text: 'text-cyan-300'
    },
  };
  return colorMap[aiAgentType] || {
    bg: 'bg-slate-500/8',
    border: 'border-slate-500/20 hover:border-slate-400/40',
    icon: 'text-slate-400 bg-slate-500/15',
    text: 'text-slate-300'
  };
};

const History: React.FC = () => {
  const { user, isLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<HistoryItem[]>('/api/history');
      setHistoryData(response.data);
      console.log('hello', response.data);
    } catch (e) {
      setError('Failed to load your history. Please try again later.');
      console.error('Error fetching history data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && userEmail) {
      fetchUserData();
    }
  }, [isLoaded, userEmail, fetchUserData]);

  const navigateToHistory = (aiAgentType: string, recordId: string) => {
    const routeFolder = mapAgentTypeToRoute(aiAgentType);
    
    // Special handling for Voice Coach - navigate to saved conversations
    if (aiAgentType === 'Voice Coach') {
      router.push(`/ai-tools/${routeFolder}`);
    } else {
      router.push(`/ai-tools/${routeFolder}/${recordId}`);
    }
  };

  if (loading || !isLoaded) {
    return(
   
    <Loader/>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Unable to Load History</h3>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchUserData}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-xl transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (historyData.length === 0) {

 return <EmptyState/>
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Career Journey</h1>
              <p className="text-white/70 text-lg">Your AI-powered professional development history</p>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{historyData.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Tools Used</p>
                  <p className="text-2xl font-bold text-white">
                    {new Set(historyData.map(item => item.aiAgentType)).size}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Latest Session</p>
                  <p className="text-lg font-semibold text-white">
                    {historyData.length > 0 
                      ? new Date(historyData[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {historyData.map((item, index) => {
            const colors = getAgentColors(item.aiAgentType);
            return (
              <div
                key={item.recordId}
                className={`group relative overflow-hidden rounded-2xl ${colors.bg} backdrop-blur-sm 
                           border ${colors.border} transition-all duration-300 cursor-pointer 
                           hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20`}
                tabIndex={0}
                role="button"
                onClick={() => navigateToHistory(item.aiAgentType, item.recordId)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  navigateToHistory(item.aiAgentType, item.recordId)
                }
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${colors.icon} transition-all duration-300 group-hover:scale-110`}>
                        {getAgentIcon(item.aiAgentType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-white/90 transition-colors duration-300">
                          {item.aiAgentType}
                        </h3>
                        <p className="text-white/50 text-sm mt-1">
                          {item.aiAgentType === 'Voice Coach' ? 'View Saved Conversations' : 'AI Assistant Session'}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-white/40 group-hover:${colors.text} transform group-hover:translate-x-1 transition-all duration-300`} />
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm group-hover:text-white/80 transition-colors duration-300">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/20 group-hover:${colors.text} group-hover:bg-white/20 transition-all duration-300`}>
                      {item.aiAgentType === 'Voice Coach' ? 'View Conversations' : 'View Details'}
                    </div>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.text.replace('text-', 'from-')} to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Background Decorations */}
        <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 right-10 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default History;
