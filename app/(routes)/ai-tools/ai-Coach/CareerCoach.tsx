"use client";

import React, { useState, useEffect, useRef } from "react";
import VapiWidget from "@/app/_components/VapiWidget";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Download,
  MessageSquare,
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
  const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_KEY;
  
  if (!VAPI_KEY) {
    console.error("VAPI_KEY is not configured");
  }
  const { user } = useUser();
  const profile = user?.imageUrl;
  const router = useRouter();

  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [sessionRating, setSessionRating] = useState<number | null>(null);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [stats, setStats] = useState<SessionStats>({ duration: 0, messageCount: 0 });
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
      setTranscript([]); // Clear previous transcript when starting new call
    } else if (sessionStart) {
      const duration = Math.floor((Date.now() - sessionStart) / 1000);
      setStats((prev) => ({ ...prev, duration }));
      // Don't auto-show rating here, let onCallEnd handle it
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
    a.download = `conversation-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRating = (rating: number) => {
    setSessionRating(rating);
    setStats((prev) => ({ ...prev, rating }));
    setTimeout(() => setShowRating(false), 1500);
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
      {/* ===== Rating Modal ===== */}
      {showRating && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full text-center">
            <Star className="w-8 h-8 mx-auto text-cyan-400 mb-3" />
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Rate Your Session</h3>
            <p className="text-slate-400 text-sm mb-4">
              Duration: {formatDuration(stats.duration)} • Messages: {stats.messageCount}
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`p-1 ${sessionRating && star <= sessionRating ? "text-yellow-400" : "text-slate-400 hover:text-yellow-300"}`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowRating(false)}
              className="w-full py-2 bg-cyan-600 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== Header ===== */}
      <div className="text-center p-6">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-cyan-400" />
          <h1 className="text-3xl font-bold">
            <span className="text-cyan-400">AI</span> Career Coach
          </h1>
        </div>
        <p className="text-slate-400 max-w-xl mx-auto mb-4">
          Get personalized career guidance through natural voice conversations with our AI assistant.
        </p>
        <button
          onClick={() => router.push("/ai-tools/ai-Coach/saved-conversations")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 transition"
        >
          <History className="w-4 h-4" />
          View Saved Conversations
        </button>
      </div>

      {/* ===== Layout ===== */}
      <div className="flex-1 grid lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto w-full">
        {/* Profiles */}
        <div className="space-y-6">
          {/* AI Coach */}
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <Image
              src="/coach.avif"
              alt="AI Coach"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-2 border border-slate-600"
            />
            <h3 className="font-semibold">Elevate AI</h3>
            <p className="text-slate-400 text-sm">Career Coach</p>
            <span className={`block mt-2 text-xs ${isConnected ? "text-green-400" : "text-slate-500"}`}>
              {isConnected ? "Available" : "Standby"}
            </span>
          </div>
          {/* User */}
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            {profile ? (
              <Image src={profile} alt="User" width={80} height={80} className="rounded-full mx-auto mb-2" />
            ) : (
              <div className="w-20 h-20 mx-auto mb-2 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
            )}
            <h3 className="font-semibold">{user?.firstName || "Career Seeker"}</h3>
            <p className="text-slate-400 text-sm">Ready to grow</p>
          </div>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-4 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> Conversation
            </h2>
            {transcript.length > 0 && (
              <div className="flex gap-2">
                <button onClick={downloadTranscript} className="text-slate-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={clearTranscript} className="text-slate-400 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {transcript.length === 0 ? (
              <div className="text-center text-slate-400 mt-20">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-500" />
                <p>Start your career journey by talking with the AI Coach below.</p>
              </div>
            ) : (
              transcript.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                      msg.role === "user"
                        ? "bg-cyan-500/20 text-cyan-100"
                        : "bg-blue-500/20 text-blue-100"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-xs opacity-60">{msg.timestamp}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="bg-slate-900 border-t border-slate-800 p-6 text-center">
        <h3 className="font-semibold mb-2">Voice Controls</h3>
        <p className="text-slate-400 text-sm mb-4">
          Click to start your personalized voice conversation with the AI Career Coach
        </p>
        <VapiWidget
          apiKey={VAPI_KEY}
          assistantId="87312c4b-c3f3-4e50-b901-8993f3ded77d"
          onTranscript={handleTranscript}
          onConnectionChange={handleConnectionChange}
          onCallEnd={() => {
            if (transcript.length > 0) {
              setShowRating(true);
            }
          }}
        />
        {transcript.length > 0 && (
          <div className="mt-3 text-slate-500 text-xs flex justify-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Messages: {stats.messageCount}
            </span>
            {sessionStart && isConnected && (
              <span className="flex items-center gap-1 text-green-400">
                ● Live session
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCoach;
