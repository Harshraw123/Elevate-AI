'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import {
  MessageSquare,
  FileText,
  Route,
  SearchCheck,
  LucideIcon,
  Loader2,
} from 'lucide-react';

import Modal from './Modal';
import RoadmapDialog from './RoadmapDialog';
import AiCoverLetterForm from './AiCoverLetterForm';
import { Button } from '@/components/ui/button';

type Tool = {
  title: string;
  description: string;
  icon: LucideIcon;
  button: string;
  color: string;
  path: string;
};

const tools: Tool[] = [
  {
    title: 'AI Career Q&A Chat',
    description: 'Chat with AI Agent',
    icon: MessageSquare,
    button: "Let's Chat",
    color: 'bg-indigo-100 text-indigo-600',
    path: '/ai-tools/ai-chat',
  },
  {
    title: 'AI Resume Analyzer',
    description: 'AI Analyzer',
    icon: SearchCheck,
    button: 'Start Analyzing',
    color: 'bg-yellow-100 text-yellow-600',
    path: '/ai-tools/ai-resume-analyzer',
  },
  {
    title: 'Learning Roadmap',
    description: 'Roadmap to success',
    icon: Route,
    button: 'Get Started',
    color: 'bg-green-100 text-green-600',
    path: '/ai-tools/ai-roadmap-agent',
  },
  {
    title: 'Cover Letter Generator',
    description: 'Generate CoverLetter',
    icon: FileText,
    button: 'AI Cover Letter',
    color: 'bg-pink-100 text-pink-600',
    path: '/ai-tools/ai-cover-letter-generator',
  },
];

const AiTools: React.FC = () => {
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  const [openCoverLetterDialog, setOpenCoverLetterDialog] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [toolRecordIds, setToolRecordIds] = useState<string[]>([]);

  // Generate UUIDs only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setToolRecordIds(tools.map(() => uuidv4()));
  }, []);

  const handleClick = async (toolTitle: string, recordId: string) => {
    setLoading(toolTitle);

    if (toolTitle === 'AI Resume Analyzer') {
      setOpenResumeUpload(true);
    } else if (toolTitle === 'Learning Roadmap') {
      setOpenRoadmapDialog(true);
    } else if (toolTitle === 'Cover Letter Generator') {
      setOpenCoverLetterDialog(true);
    }

    setLoading(null);
  };

  // Don't render content until client-side hydration is complete
  if (!isClient) {
    return (
      <div id="aiTools" className="max-w-7xl mx-auto px-4 py-14 scroll-smooth">
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-white">Available AI Tools</h2>
          <p className="text-gray-300 mt-2 text-lg">
            Start building and shape your career with these exclusive AI tools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-white/10 shadow-xl p-6 rounded-2xl hover:scale-[1.02] transition-transform hover:shadow-2xl group"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${tool.color} mb-4`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              <p className="text-sm text-gray-300 mb-5">{tool.description}</p>
              <Button
                disabled
                className="w-full bg-white text-black font-medium px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                {tool.button}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="aiTools" className="max-w-7xl mx-auto px-4 py-14">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-white">Available AI Tools</h2>
        <p className="text-gray-300 mt-2 text-lg">
          Start building and shape your career with these exclusive AI tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const recordId = toolRecordIds[index] || uuidv4();
          const isDialogTool =
            tool.title === 'AI Resume Analyzer' ||
            tool.title === 'Learning Roadmap' ||
            tool.title === 'Cover Letter Generator';

          const isLoading = loading === tool.title;

          const content = isLoading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            tool.button
          );

          return (
            <div
              key={index}
              className="bg-slate-950 border border-white/10 shadow-xl p-6 rounded-2xl hover:scale-[1.02] transition-transform hover:shadow-2xl group"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${tool.color} mb-4`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              <p className="text-sm text-gray-300 mb-5">{tool.description}</p>

              {isDialogTool ? (
                <Button
                  onClick={() => handleClick(tool.title, recordId)}
                  className="w-full bg-white text-black font-medium px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  {content}
                </Button>
              ) : (
                <Button asChild className="w-full bg-white text-black font-medium px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
                  <Link href={`${tool.path}/${recordId}`}>{content}</Link>
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <Modal isOpen={openResumeUpload} onClose={() => setOpenResumeUpload(false)} />
      <RoadmapDialog openDialog={openRoadmapDialog} setOpenDialog={() => setOpenRoadmapDialog(false)} />
      <AiCoverLetterForm
        openCoverLetterDialog={openCoverLetterDialog}
        setOpenCoverLetterDialog={() => setOpenCoverLetterDialog(false)}
      />
    </div>
  );
};

export default AiTools;