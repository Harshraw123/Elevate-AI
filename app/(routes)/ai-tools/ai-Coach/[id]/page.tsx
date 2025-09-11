"use client";

import React, { useState, useEffect, useRef } from "react";
import VapiWidget from "@/app/_components/VapiWidget";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Download,
  MessageSquare,
  Mic,
  Star,
  Clock,
  User,
  Bot,
  X,
  Zap,
  History,
} from "lucide-react";

interface TranscriptMessage {
  role: string;
  text: string;
  timestamp?: string;
}

interface SessionStats {
  duration: number;
  messageCount: number;
  rating?: number;
}

const CareerCoach = () => {
  const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_KEY!;
  const { user } = useUser();
  const profile = user?.imageUrl;
  const router = useRouter();

  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [sessionRating, setSessionRating] = useState<number | null>(null);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [stats, setStats] = useState<SessionStats>({
    duration: 0,
    messageCount: 0,
  });
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleTranscript = (msg: { role: string; text: string }) => {
    const timestampedMsg: TranscriptMessage = {
      ...msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTranscript((prev) => [...prev, timestampedMsg]);
    setStats((prev) => ({ ...prev, messageCount: prev.messageCount + 1 }));
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
    if (connected) {
      setSessionStart(Date.now());
      setStats({ duration: 0, messageCount: 0 });
    } else {
      if (sessionStart && transcript.length > 0) {
        const duration = Math.floor((Date.now() - sessionStart) / 1000);
        setStats((prev) => ({ ...prev, duration }));
        setShowRating(true);
      }
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const downloadTranscript = () => {
    const content = transcript
      .map((msg) => `[${msg.timestamp}] ${msg.role}: ${msg.text}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation-transcript-${new Date()
      .toISOString()
      .split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRating = (rating: number) => {
    setSessionRating(rating);
    setStats((prev) => ({ ...prev, rating }));
    setTimeout(() => setShowRating(false), 2000);
  };

  const clearTranscript = () => {
    setTranscript([]);
    setStats({ duration: 0, messageCount: 0 });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* ======= Session Rating Modal ======= */}
      {showRating && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-700/50">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-cyan-400">Rate Your Session</h3>
              <p className="text-slate-400 text-sm">
                Duration: {formatDuration(stats.duration)} • Messages: {stats.messageCount}
              </p>
            </div>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`p-1 rounded-full transition-all hover:scale-110 ${
                    sessionRating && star <= sessionRating
                      ? "text-yellow-400"
                      : "text-slate-400 hover:text-yellow-300"
                  }`}
                  aria-label={`Rate ${star} star`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowRating(false)}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-2xl font-medium transition-all text-white shadow-lg shadow-blue-500/25"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ======= Content Wrapper ======= */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* ======= Header ======= */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold">
                <span className="text-cyan-400">AI</span>
                <span className="text-white"> Career Coach</span>
              </h1>
            </div>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
              Transform your career with personalized guidance through engaging, natural voice conversations with our advanced AI assistant.
            </p>
            
            {/* History Button */}
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/ai-tools/ai-Coach/saved-conversations')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-slate-600/50 hover:to-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <History className="w-5 h-5" />
                View Saved Conversations
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg text-slate-300 text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>Your coaching sessions are automatically saved for future reference</span>
              </div>
            </div>
          </div>

          {/* ======= Layout Grid ======= */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Column - Profiles */}
            <div className="space-y-6">
              {/* AI Coach */}
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:shadow-xl transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="relative rounded-full w-20 h-20 mb-4">
                    <Image
                      src="/coach.avif"
                      alt="AI Coach"
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-2 border-slate-600"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Elevate AI</h3>
                  <p className="text-slate-400 text-sm">Senior Career Coach</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                    <span className="text-xs text-slate-400">{isConnected ? 'Available' : 'Standby'}</span>
                  </div>
                </div>
              </div>

              {/* User */}
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:shadow-xl transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-slate-600">
                    {profile ? (
                      <Image
                        src={profile}
                        alt="User"
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <User className="w-8 h-8 text-cyan-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {user?.firstName || "Career Seeker"}
                  </h3>
                  <p className="text-slate-400 text-sm">Ready to grow</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-slate-400">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Conversation */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-white" />
                    </div>
                    <h2 className="font-semibold text-white text-lg">Conversation</h2>
                  </div>
                  {transcript.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={downloadTranscript}
                        title="Download"
                        className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={clearTranscript}
                        title="Clear"
                        className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-red-400 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                  {transcript.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-24 h-24 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6">
                        <MessageSquare className="w-12 h-12 text-slate-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Ready to start your career journey?</h3>
                      <p className="text-slate-400 max-w-md">
                        Begin your voice conversation with our AI Career Coach below. Get personalized guidance for your professional growth.
                      </p>
                    </div>
                  ) : (
                    transcript.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.role === "user"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div
                          className={`max-w-xs px-4 py-3 rounded-xl shadow-sm text-sm ${
                            msg.role === "user"
                              ? "bg-cyan-500/10 text-cyan-100"
                              : "bg-blue-500/10 text-blue-100"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="block text-xs mt-1 opacity-60">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={bottomRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Footer Controls ======= */}
      <div className="bg-slate-900/95 backdrop-blur border-t border-slate-800 p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">Voice Controls</h3>
          <p className="text-slate-400 text-sm mb-6">
            Click to start your personalized voice conversation with our AI Career Coach
          </p>
          <VapiWidget
            apiKey={VAPI_KEY}
            assistantId="87312c4b-c3f3-4e50-b901-8993f3ded77d"
            onTranscript={handleTranscript}
            onConnectionChange={handleConnectionChange}
          />
          {transcript.length > 0 && (
            <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Messages: {stats.messageCount}
              </div>
              {sessionStart && isConnected && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live session
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerCoach;
