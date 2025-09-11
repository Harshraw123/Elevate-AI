"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import EmptyState from "../_components/EmptyState";
import Loader from "../_components/Loader";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useUser } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";


interface AichatProps {
  selectedQuery?: string;
}

interface ChatResponse {
  output: string;
  error?: string;
}

interface Message {
  text: string;
  isUser: boolean;
}

function sanitizeResponse(text: string): string {
  if (!text) return text;
  return text
    .replace(/\\/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const Aichat: React.FC<AichatProps> = ({ selectedQuery }) => {
  const { user } = useUser();
  const [inputMessage, setInputMessage] = useState<string>(selectedQuery || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { chatid } = useParams();
  console.log("Chat ID:", chatid);

  const GetOldMessages = useCallback(async () => {
    try {
      const response = await axios.get<Array<{ content?: unknown }>>(`/api/history?chatid=${chatid}`);
      const storedContent = response.data?.[0]?.content;
  
      if (storedContent && Array.isArray(storedContent)) {
        // Ensure the stored content matches Message[]
        const parsedMessages: Message[] = storedContent.map((msg: { text?: string; isUser?: boolean }) => ({
          text: msg.text || "",
          isUser: msg.isUser ?? false,
        }));
        setMessages(parsedMessages);
      } else {
        console.warn("⚠️ No valid content found in history.");
      }
    } catch (e) {
      console.error("Error fetching old messages:", e);
    }
  }, [chatid, setMessages]);

  useEffect(() => {
    if (chatid) {
      GetOldMessages();
    }
  }, [chatid, GetOldMessages]);
  // Scroll to bottom when new message added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🔁 Update DB only when messages are fully updated
  const updateMessage = async (updatedMessages: Message[]) => {
    try {
   
      const result = await axios.put("/api/history", {
        content: updatedMessages,
        recordId: chatid,
      });
      console.log("✅ History updated:", result.data);
      
    } catch (err) {
      console.error("❌ Failed to update history:", err);
    }
  };


  const sendData = async () => {
    if (!inputMessage) return;

    try {
      setLoading(true);
      setError(null);

      const updatedUserMessages = [...messages, { text: inputMessage, isUser: true }];
      // Create history only if this is the first message
      if (messages.length === 0) {
        await axios.post("/api/history", {
          content: updatedUserMessages,
          recordId: chatid,
          aiAgentType: "AI Career Q&A Chat",
        });
      }
      setMessages(updatedUserMessages);

      const userInput = inputMessage;
      const response = await axios.post<{ output?: string }>(`/api/ai-carrer-chat-agent`, {
        userInput: userInput,
      }, { timeout: 35000 });

      if (response.data?.output) {
        const cleanOutput = response.data.output;
        const updatedAllMessages = [...updatedUserMessages, { text: cleanOutput, isUser: false }];
        setMessages(updatedAllMessages);

      // Update database after both messages are added
        await updateMessage(updatedAllMessages);
      }

      setInputMessage("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } };
        errorMessage = axiosError.response?.data?.error || "Server error";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setMessages((prev: Message[]) => [...prev, { text: `Error: ${errorMessage}`, isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && inputMessage.trim()) {
      sendData();
    }
  };
  return (
    <div className="flex flex-col h-screen p-2 sm:p-4 space-y-4 bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="font-bold text-base sm:text-lg">AI Career Q/A Chat</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Smarter career decisions start here – get tailored guidance
          </p>
        </div>
        <Button
          onClick={() => {
            setInputMessage("");
            setMessages([]);
            setError(null);
          }}
          aria-label="Start new chat"
          className="text-xs sm:text-sm px-2 sm:px-4"
        >
          New Chat
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 w-full rounded-md p-2 sm:p-4 overflow-hidden min-h-screen">
        <div className="flex-1 overflow-y-auto max-w-full">
          {messages.length === 0 ? (
            <EmptyState selectedQuery={(query: string) => setInputMessage(query)} />
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg whitespace-pre-wrap ${
                    message.isUser
                      ? "bg-slate-900 ml-auto w-full sm:max-w-[80%]"
                      : message.text.startsWith("Error:")
                        ? "bg-red-800 mr-auto w-full sm:max-w-[80%]"
                        : "mr-auto w-full sm:max-w-[80%]"
                  }`}
                >
                  {message.isUser ? (
                    <div className="flex items-center gap-2">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="User"
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs flex-shrink-0">
                          {user?.firstName?.charAt(0) || "U"}
                        </div>
                      )}
                      <span className="text-sm sm:text-base break-words">{message.text}</span>
                    </div>
                  ) : (
                   
                    <ReactMarkdown
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        p: (props: { children?: React.ReactNode }) => (
                          <p className="mb-2 text-sm sm:text-base">{props.children}</p>
                        ),
                        code: (props: { inline?: boolean; children?: React.ReactNode }) =>
                          props.inline ? (
                            <code className="text-pink-400 px-1 py-0.5 rounded text-xs sm:text-sm">{props.children}</code>
                          ) : (
                            <pre className="p-2 sm:p-4 rounded-md overflow-x-auto text-xs sm:text-sm">
                              <code>{props.children}</code>
                            </pre>
                          )
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>
              ))}
              {loading && (
                <div className="p-3 sm:p-4 rounded-lg w-full sm:max-w-[80%] mr-auto flex items-center gap-2">
                  <Loader />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4 p-3 sm:p-4 bg-red-100/10 rounded-md text-sm sm:text-base">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 sm:gap-4 mt-4">
          <Input
            onChange={handleInputChange}
            value={inputMessage}
            placeholder="Type your career question here..."
            className="flex-1 text-sm sm:text-base"
            disabled={loading}
            onKeyPress={handleKeyPress}
            aria-label="Type your message"
          />
          <Button
            onClick={sendData}
            disabled={loading || !inputMessage}
            aria-label="Send message"
            className="px-2 sm:px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <Aichat />;
}