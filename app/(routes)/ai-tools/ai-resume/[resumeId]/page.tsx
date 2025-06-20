'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  Loader2, XCircle, Info, FileText, Award, User, BookOpen, Star
} from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
  contact_info: <User className="text-white" size={20} />,
  experience: <FileText className="text-white" size={20} />,
  education: <BookOpen className="text-white" size={20} />,
  skills: <Star className="text-white" size={20} />,
};

const cardColors: Record<string, string> = {
  contact_info: "from-blue-900 to-blue-950",
  experience: "from-emerald-900 to-emerald-950",
  education: "from-violet-900 to-violet-950",
  skills: "from-yellow-900 to-yellow-950",
};

const AIResumeAnalyzer = () => {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/history?chatid=${resumeId}`);
        const data = response.data?.[0];
        setAnalysis(data?.content);
        setPdfUrl(data?.metaData?.imageUrl);
      } catch {
        setError("Failed to load resume analysis.");
      } finally {
        setLoading(false);
      }
    };
    if (resumeId) fetchData();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-cyan-400" size={40} />
        <span className="ml-4 text-lg text-slate-300">Analyzing your resume...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
        <XCircle size={40} />
        <span className="mt-2 text-lg">{error}</span>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Info size={40} />
        <span className="mt-2 text-lg">No analysis found for this resume.</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Resume Preview */}
      <div className="w-full max-w-3xl mx-auto rounded-xl bg-black overflow-hidden shadow-lg mb-8">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-[500px] border-none"
          title="Resume PDF Preview"
        />
      </div>

     {/* Overall Score Styled Like Image */}
<div className="flex justify-center items-center mb-14">
  <div className="bg-white/5 border border-slate-700 rounded-2xl px-8 py-6 shadow-xl text-left w-full max-w-xl">
    <h2 className="text-white text-base font-semibold mb-2">Overall Score</h2>

    <div className="flex justify-between items-center mb-2">
      <p className="text-4xl font-extrabold text-blue-400">
        {analysis.overall_score ?? "-"}
        <span className="text-xl text-blue-300 font-medium"> /100</span>
      </p>
      <p className={  analysis.overall_score>=85?"text-green-500":analysis.overall_score>=70?"text-yellow-400":"text-red-600" }>
        {analysis.overall_score >= 85
          ? "⭐️Excellent!"
          : analysis.overall_score >= 70
          ? "😃Good"
          : analysis.overall_score >= 50
          ? "Needs Improvement"
          : "☹️Poor"}
      </p>
    </div>

    {/* Progress Bar */}
    <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2 overflow-hidden">
      <div
        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${analysis.overall_score ?? 0}%` }}
      />
    </div>

    {/* Caption */}
    <p className="text-sm text-slate-300">
      {analysis.summary_comment}
    </p>
  </div>
</div>


      {/* Section Breakdown */}
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Detailed Section Analysis</h2>
      <p className="text-slate-400 text-center mb-12">In-depth breakdown of each resume section</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(analysis.sections || {}).map(([section, details]: any) => {
          const bgColor = cardColors[section] || "from-slate-800 to-slate-900";
          return (
            <div
              key={section}
              className={`rounded-2xl bg-gradient-to-br ${bgColor} p-6 text-white shadow-xl border border-white/10`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 items-center">
                  {sectionIcons[section]}
                  <h3 className="text-lg font-semibold capitalize">{section.replace("_", " ")}</h3>
                </div>
                <span className="text-cyan-300 font-bold text-xl">{details.score} <span className="text-sm text-slate-300">/100</span></span>
              </div>

              <p className="text-sm text-slate-300 mb-5">{details.comment}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-green-300 font-semibold mb-1">🟢 Strengths</h4>
                  <ul className="list-disc list-inside text-sm text-green-100 space-y-1">
                    {details.strengths?.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                {details.weaknesses?.length > 0 && (
                  <div>
                    <h4 className="text-red-300 font-semibold mb-1">🎯 Areas for Improvement</h4>
                    <ul className="list-disc list-inside text-sm text-red-100 space-y-1">
                      {details.weaknesses.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-yellow-300 font-semibold mb-1">⚡ Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-100 space-y-1">
                    {details.tips?.map((tip: string, i: number) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIResumeAnalyzer;
