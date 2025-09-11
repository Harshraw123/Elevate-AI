'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Mic, File, MessageSquare, FileText, Route, SearchCheck } from 'lucide-react';

import Modal from './Modal';
import RoadmapDialog from './RoadmapDialog';
import AiCoverLetterForm from './AiCoverLetterForm';
import ResumeBuilderForm from './ResumeBuilderForm';

import {SectionHeader} from './SectionHeader'
import {ToolCard} from './ToolCard'
import {LoadingGrid} from './LoadingGrid'

const tools = [
  {
    title: 'AI Career Q&A Chat',
    description: 'Interactive AI conversations for career guidance',
    icon: MessageSquare,
    button: "Let's Chat",
    gradient: 'from-blue-500 via-purple-500 to-indigo-600',
    path: '/ai-tools/ai-chat',
    category: 'Communication',
  },
  {
    title: 'AI Resume Analyzer',
    description: 'Deep analysis and optimization insights',
    icon: SearchCheck,
    button: 'Start Analyzing',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    path: '/ai-tools/ai-resume-analyzer',
    category: 'Analysis',
  },
  {
    title: 'Learning Roadmap',
    description: 'Personalized career development pathways',
    icon: Route,
    button: 'Get Started',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    path: '/ai-tools/ai-roadmap-agent',
    category: 'Planning',
  },
  {
    title: 'Cover Letter Generator',
    description: 'AI-powered professional cover letters',
    icon: FileText,
    button: 'Generate Now',
    gradient: 'from-pink-500 via-rose-500 to-purple-500',
    path: '/ai-tools/ai-cover-letter-generator',
    category: 'Creation',
  },
  {
    title: 'AI Voice Coach',
    description: 'Advanced speech training and feedback',
    icon: Mic,
    button: 'Start Training',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    path: '/ai-tools/ai-Coach',
    category: 'Training',
  },
  {
    title: 'AI Resume Builder',
    description: 'Intelligent resume construction system',
    icon: File,
    button: 'Build Resume',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    path: '/ai-tools/ai-resumeBuilder',
    category: 'Creation',
  }
];

const AiTools: React.FC = () => {
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  const [openCoverLetterDialog, setOpenCoverLetterDialog] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [toolRecordIds, setToolRecordIds] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [openResumeBuilderForm, setOpenResumeBuilderForm] = useState(false);

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
    } else if (toolTitle === 'AI Resume Builder') {
      setOpenResumeBuilderForm(true);
    }

    setLoading(null);
  };

  if (!isClient) {
    return (
      <div id="aiTools" className="max-w-7xl mx-auto px-4 py-20">
        <SectionHeader />
        <LoadingGrid tools={tools} />
      </div>
    );
  }

  return (
    <div id="aiTools" className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const recordId = toolRecordIds[index] || uuidv4();
          const isDialogTool = [
            'AI Resume Analyzer',
            'Learning Roadmap', 
            'Cover Letter Generator',
            'AI Resume Builder'
          ].includes(tool.title);

          return (
            <ToolCard
              key={index}
              tool={tool}
              index={index}
              recordId={recordId}
              isLoading={loading === tool.title}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
              onClick={handleClick}
              isDialogTool={isDialogTool}
            />
          );
        })}
      </div>

      {/* Modals */}
      <Modal isOpen={openResumeUpload} onClose={() => setOpenResumeUpload(false)} />
      <RoadmapDialog openDialog={openRoadmapDialog} setOpenDialog={() => setOpenRoadmapDialog(false)} />
      <AiCoverLetterForm
        openCoverLetterDialog={openCoverLetterDialog}
        setOpenCoverLetterDialog={() => setOpenCoverLetterDialog(false)}
      />
      <ResumeBuilderForm openDialog={openResumeBuilderForm} onClose={() => setOpenResumeBuilderForm(false)} />
    </div>
  );
};

export default AiTools; 