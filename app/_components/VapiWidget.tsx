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
  onConnectionChange?: (status: boolean) => void;
  onCallEnd?: () => void; // Add onCallEnd callback
}

const id = uuidv4();

const VapiWidget: React.FC<VapiWidgetProps> = ({
  apiKey,
  assistantId,
  config = {},
  onTranscript,
  onConnectionChange,
  onCallEnd
}) => {
  const router = useRouter();
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<Array<{role: string; text: string; timestamp: string}>>([]);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleTranscript = useCallback((message: { role: string; text: string }) => {
    onTranscript?.(message);
  }, [onTranscript]);

  const handleConnectionChange = useCallback((status: boolean) => {
    onConnectionChange?.(status);
  }, [onConnectionChange]);

  const handleCallEnd = useCallback(() => {
    onCallEnd?.();
  }, [onCallEnd]);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);
    
    // Use a ref to store messages to avoid stale closure issues
    let currentConversation: Array<{role: string; text: string; timestamp: string}> = [];
    let sessionStart: string | null = null;

    const handleCallStart = () => {
      console.log('Call started - initializing session');
      setIsConnected(true);
      setIsLoading(false);
      currentConversation = []; // Clear previous conversation
      sessionStart = new Date().toISOString();
      setSessionStartTime(sessionStart);
      setConversationMessages([]); 
      handleConnectionChange(true);
    };

    const handleCallEndInternal = async () => {
      console.log('Call ended - cleaning up session');
      setIsConnected(false);
      setIsSpeaking(false);
      handleConnectionChange(false);
      
      // Call the parent's onCallEnd callback
      handleCallEnd();
      
      // Save conversation in background (non-blocking)
      if (currentConversation.length > 0) {
        try {
          const sessionEnd = new Date().toISOString();
          console.log(`Saving conversation with ${currentConversation.length} messages`);
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
          console.log('Conversation saved successfully');
        } catch (error) {
          console.error('Failed to save conversation:', error);
        }
      }
    };

    interface VapiMessage {
      type: string;
      role: string;
      transcript: string;
      [key: string]: unknown; // For any additional properties
    }

    const handleMessage = (message: VapiMessage) => {
      console.log('Received message:', message.type, message.role, message.transcript?.substring(0, 50));
      
      if (message.type === 'transcript' && message.transcript?.trim()) {
        const newMsg = { 
          role: message.role, 
          text: message.transcript.trim(),
          timestamp: new Date().toISOString()
        };

        console.log('Processing transcript:', newMsg.role, newMsg.text.substring(0, 50) + '...');
        
        // Add to current conversation array (for saving)
        currentConversation.push(newMsg);
        
        // Update state for UI
        setConversationMessages(prev => {
          const updated = [...prev, newMsg];
          console.log('Updated conversation messages:', updated.length);
          return updated;
        });
        
        // Send to parent for UI updates - this is crucial for chatbox display
        console.log('Sending to parent transcript handler');
        handleTranscript({ role: message.role, text: message.transcript });
      } else if (message.type === 'function-call' || message.type === 'tool-calls') {
        console.log('Received function/tool call:', message);
      } else {
        console.log('Unhandled message type:', message.type);
      }
    };

    const handleSpeechStart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };
    
    const handleSpeechEnd = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };
    
    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        console.error('Vapi error:', error.message, error.stack);
      } else {
        console.error('Vapi error:', error);
      }
      setIsConnected(false);
      setIsSpeaking(false);
      handleConnectionChange(false);
    };
    
    vapiInstance.on('call-start', handleCallStart);
    vapiInstance.on('call-end', handleCallEndInternal);
    vapiInstance.on('speech-start', handleSpeechStart);
    vapiInstance.on('speech-end', handleSpeechEnd);
    vapiInstance.on('message', handleMessage);
    vapiInstance.on('error', handleError);

    return () => {
      console.log('Cleaning up Vapi instance');
      vapiInstance.off('call-start', handleCallStart);
      vapiInstance.off('call-end', handleCallEndInternal);
      vapiInstance.off('speech-start', handleSpeechStart);
      vapiInstance.off('speech-end', handleSpeechEnd);
      vapiInstance.off('message', handleMessage);
      vapiInstance.off('error', handleError);
      if (isConnected) {
        vapiInstance.stop(); // Stop Vapi on unmount only if connected
      }
    };
  }, [apiKey, assistantId, router, handleTranscript, handleConnectionChange, handleCallEnd]);

  const startCall = () => {
    if (vapi && !isConnected) {
      console.log('Starting call with assistant:', assistantId);
      setIsLoading(true);
      try {
        vapi.start(assistantId);
      } catch (error) {
        console.error('Error starting call:', error);
        setIsLoading(false);
      }
    }
  };
  
  const endCall = () => {
    if (vapi && isConnected) {
      console.log('Manually ending call');
      vapi.stop();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isConnected ? (
        <button
          onClick={startCall}
          disabled={isLoading}
          className={`rounded-full w-16 h-16 shadow-lg transition-colors duration-200 flex items-center justify-center ${
            isLoading 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-500 text-white rounded-full w-16 h-16 shadow-lg transition-colors duration-200 flex items-center justify-center"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
            {isSpeaking && (
              <div className="absolute -inset-1 rounded-full border border-green-400"></div>
            )}
          </div>
          
          <div className="text-center">
            <div className={`flex items-center justify-center space-x-2 text-sm ${
              isSpeaking ? 'text-green-400' : 'text-slate-400'
            }`}>
              {isSpeaking ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
