'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';


interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  onTranscript?: (message: { role: string; text: string }) => void;
  onConnectionChange?: (status: boolean) => void; // ✅ callback to notify parent
}

const id = uuidv4();

const VapiWidget: React.FC<VapiWidgetProps> = ({
  apiKey,
  assistantId,
  config = {},
  onTranscript,
  onConnectionChange
}) => {
  const router = useRouter();
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<Array<{role: string; text: string; timestamp: string}>>([]);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleTranscript = useCallback((message: { role: string; text: string }) => {
    onTranscript?.(message);
  }, [onTranscript]);

  const handleConnectionChange = useCallback((status: boolean) => {
    onConnectionChange?.(status);
  }, [onConnectionChange]);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);
    
    // Use a ref to store messages to avoid stale closure issues
    let currentConversation: Array<{role: string; text: string; timestamp: string}> = [];
    let sessionStart: string | null = null;

    const handleCallStart = () => {
      setIsConnected(true);
      currentConversation = []; // Clear previous conversation
      sessionStart = new Date().toISOString();
      setSessionStartTime(sessionStart);
      setConversationMessages([]); 
      handleConnectionChange(true);
    };

    const handleCallEnd = async () => {
      setIsConnected(false);
      setIsSpeaking(false);
      
      // Navigate immediately for better UX
      handleConnectionChange(false);
      router.push('/dashboard');
      
      // Save conversation in background (non-blocking)
      if (currentConversation.length > 0) {
        // Use setTimeout to ensure navigation happens first
        setTimeout(async () => {
          try {
            const sessionEnd = new Date().toISOString();
            await fetch('/api/save-conversation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: id,
                messages: currentConversation,
                sessionStart: sessionStart,
                sessionEnd: sessionEnd,
                totalMessages: currentConversation.length
              }),
            });
            console.log('Conversation saved successfully with', currentConversation.length, 'messages');
          } catch (error) {
            console.error('Failed to save conversation:', error);
          }
        }, 100); // Small delay to ensure navigation completes first
      }
    };

    interface VapiMessage {
      type: string;
      role: string;
      transcript: string;
      [key: string]: unknown; // For any additional properties
    }

    const handleMessage = (message: VapiMessage) => {
      if (message.type === 'transcript') {
        const newMsg = { 
          role: message.role, 
          text: message.transcript,
          timestamp: new Date().toISOString()
        };

        // Add to current conversation array (for saving)
        currentConversation.push(newMsg);
        
        // Update state for UI
        setConversationMessages(prev => [...prev, newMsg]);
        
        // Send to parent for UI updates
        handleTranscript({ role: message.role, text: message.transcript });
      }
    };

    vapiInstance.on('call-start', handleCallStart);
    vapiInstance.on('call-end', handleCallEnd);
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    
    vapiInstance.on('speech-start', handleSpeechStart);
    vapiInstance.on('speech-end', handleSpeechEnd);
    vapiInstance.on('message', handleMessage);

    return () => {
      vapiInstance.off('call-start', handleCallStart);
      vapiInstance.off('call-end', handleCallEnd);
      vapiInstance.off('speech-start', handleSpeechStart);
      vapiInstance.off('speech-end', handleSpeechEnd);
      vapiInstance.off('message', handleMessage);
      vapiInstance.stop(); // Stop Vapi on unmount
    };
  }, [apiKey, assistantId, router, handleTranscript, handleConnectionChange]);

  const startCall = () => vapi?.start(assistantId);
  const endCall = () => vapi?.stop();

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isConnected ? (
        <button
          onClick={startCall}
          className="relative group bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white rounded-full w-20 h-20 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <Mic className="w-8 h-8 relative z-10" />
          <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping"></div>
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <button
              onClick={endCall}
              className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full w-16 h-16 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
            {isSpeaking && (
              <div className="absolute -inset-2 rounded-full border-2 border-green-400 animate-pulse"></div>
            )}
          </div>
          
          <div className="text-center">
            <div className={`flex items-center justify-center space-x-2 text-sm ${
              isSpeaking ? 'text-green-400' : 'text-slate-400'
            }`}>
              {isSpeaking ? (
                <>
                  <div className="w-2 h-2 ounded-full animate-pulse"></div>
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Listening...</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Connection Status */}
      <div className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
        isConnected 
          ? 'bg-green-500/20' 
          : 'bg-slate-700 text-slate-400 border border-slate-600'
      }`}>
        {isConnected ? 'Connected' : 'Ready to Connect'}
      </div>
    </div>
  );
};

export default VapiWidget;
