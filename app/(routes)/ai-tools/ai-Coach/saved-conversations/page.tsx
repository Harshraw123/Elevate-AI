"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { 
  MessageCircle, 
  Clock, 
  Download, 
  Trash2, 
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  User,
  Bot
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SavedConversation {
  id: number;
  recordId: string;
  content: any;
  createdAt: string;
  aiAgentType: string;
}

const SavedConversations = () => {
  const { user, isLoaded } = useUser();
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      fetchSavedConversations();
    }
  }, [isLoaded, user]);

  const fetchSavedConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/history');
      // Filter only AI Coach conversations
      const coachConversations = (response.data as SavedConversation[]).filter(
        (conv: SavedConversation) => conv.aiAgentType === 'Voice Coach'
      );
      setConversations(coachConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadConversation = (conversation: SavedConversation) => {
    const content = conversation.content;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coaching-session-${conversation.recordId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteConversation = async (id: number) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      try {
        setDeletingId(id);
        await axios.delete(`/api/history?id=${id}`);
        setConversations(prev => prev.filter(conv => conv.id !== id));
        setNotification({ type: 'success', message: 'Conversation deleted successfully' });
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error('Error deleting conversation:', error);
        setNotification({ type: 'error', message: 'Failed to delete conversation. Please try again.' });
        setTimeout(() => setNotification(null), 5000);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (conv.content && JSON.stringify(conv.content).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || conv.aiAgentType === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-green-400 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Saved Coaching Sessions</h1>
                <p className="text-slate-400">Your voice coaching conversation history</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-500/20 border-green-500/30 text-green-300' 
              : 'bg-red-500/20 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        )}
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
          >
            <option value="all">All Types</option>
            <option value="Voice Coach">Voice Coach</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-white">{conversations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Latest Session</p>
                <p className="text-lg font-semibold text-white">
                  {conversations.length > 0 
                    ? new Date(conversations[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">This Month</p>
                <p className="text-lg font-semibold text-white">
                  {conversations.filter(conv => {
                    const convDate = new Date(conv.createdAt);
                    const now = new Date();
                    return convDate.getMonth() === now.getMonth() && convDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No conversations found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              {searchTerm || filterType !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start your first coaching session to see your conversations here"
              }
            </p>
            {!searchTerm && filterType === "all" && (
              <button
                onClick={() => router.push('/ai-tools/ai-Coach/start')}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Start Your First Session
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-green-400 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Coaching Session</h3>
                        <p className="text-sm text-slate-400">ID: {conversation.recordId}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(conversation.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Voice Coach
                      </div>
                      {conversation.content && (
                        <>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {Array.isArray(conversation.content) 
                              ? `${conversation.content.length} messages`
                              : 'Session recorded'
                            }
                          </div>
                        </>
                      )}
                    </div>

                    {conversation.content && (
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <h4 className="font-medium text-white mb-2 mb-4">Conversation Transcript</h4>
                        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                          {typeof conversation.content === 'string' ? (
                            <div className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown>{conversation.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {Array.isArray(conversation.content) ? (
                                conversation.content.map((msg: any, idx: number) => (
                                  <div key={idx} className={`flex items-start gap-3 ${
                                    msg.role === 'user' ? 'flex-row-reverse' : ''
                                  }`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                      msg.role === 'user' 
                                        ? 'bg-cyan-500/20 text-cyan-400' 
                                        : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                      {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                    </div>
                                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                      msg.role === 'user'
                                        ? 'bg-cyan-500/10 text-cyan-100'
                                        : 'bg-blue-500/10 text-blue-100'
                                    }`}>
                                      <ReactMarkdown>
                                        {msg.text || msg.content || msg.transcript || ''}
                                      </ReactMarkdown>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-slate-300 text-sm">
                                  <ReactMarkdown>
                                    {typeof conversation.content === 'object' 
                                      ? JSON.stringify(conversation.content, null, 2)
                                      : String(conversation.content)
                                    }
                                  </ReactMarkdown>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => downloadConversation(conversation)}
                      className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 transition"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteConversation(conversation.id)}
                      disabled={deletingId === conversation.id}
                      className={`p-2 rounded-lg transition ${
                        deletingId === conversation.id
                          ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                          : 'hover:bg-slate-700/50 text-slate-400 hover:text-red-400'
                      }`}
                      title={deletingId === conversation.id ? 'Deleting...' : 'Delete'}
                    >
                      {deletingId === conversation.id ? (
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Custom Markdown Styles */}
      <style jsx global>{`
        .prose {
          color: #cbd5e1;
        }
        
        .prose p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }
        
        .prose em {
          color: #94a3b8;
        }
        
        .prose code {
          background: #1e293b;
          color: #38bdf8;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        
        .prose pre {
          background: #1e293b;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
        }
        
        .prose ul, .prose ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin: 0.25rem 0;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-track-slate-800::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        .scrollbar-thumb-slate-600::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 0.375rem;
        }
        
        .scrollbar-thumb-slate-600::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default SavedConversations;
