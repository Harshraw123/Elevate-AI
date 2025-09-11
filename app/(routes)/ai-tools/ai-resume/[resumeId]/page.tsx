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
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={40} />
          <span className="text-base sm:text-lg text-slate-300">Analyzing your resume...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 px-4">
        <XCircle size={40} />
        <span className="mt-2 text-base sm:text-lg text-center">{error}</span>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 px-4">
        <Info size={40} />
        <span className="mt-2 text-base sm:text-lg text-center">No analysis found for this resume.</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Resume Preview */}
      <div className="w-full max-w-4xl mx-auto rounded-xl bg-black overflow-hidden shadow-lg mb-6 sm:mb-8">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] border-none"
          title="Resume PDF Preview"
        />
      </div>

      {/* Overall Score */}
      <div className="flex justify-center items-center mb-8 sm:mb-12 lg:mb-14">
        <div className="bg-white/5 border border-slate-700 rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-xl text-left w-full max-w-xl">
          <h2 className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3">Overall Score</h2>

          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400">
              {analysis.overall_score ?? "-"}
              <span className="text-base sm:text-lg lg:text-xl text-blue-300 font-medium"> /100</span>
            </p>
            <p className={`text-xs sm:text-sm lg:text-base font-medium ${
              analysis.overall_score >= 85 ? "text-green-500" :
              analysis.overall_score >= 70 ? "text-yellow-400" : 
              "text-red-600"
            }`}>
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
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-2.5 mb-2 sm:mb-3 overflow-hidden">
            <div
              className="bg-blue-500 h-2 sm:h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${analysis.overall_score ?? 0}%` }}
            />
          </div>

          {/* Caption */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {analysis.summary_comment}
          </p>
        </div>
      </div>

      {/* Section Breakdown Header */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
          Detailed Section Analysis
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          In-depth breakdown of each resume section
        </p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {Object.entries(analysis.sections || {}).map(([section, details]: any) => {
          const bgColor = cardColors[section] || "from-slate-800 to-slate-900";
          return (
            <div
              key={section}
              className={`rounded-xl sm:rounded-2xl bg-gradient-to-br ${bgColor} p-4 sm:p-6 text-white shadow-xl border border-white/10`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="flex gap-2 sm:gap-3 items-center">
                  <div className="flex-shrink-0">
                    {sectionIcons[section]}
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold capitalize">
                    {section.replace("_", " ")}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-cyan-300 font-bold text-lg sm:text-xl">
                    {details.score}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 ml-1">/100</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-5">
                {/* Strengths */}
                <div>
                  <h4 className="text-green-300 font-semibold mb-2 text-sm sm:text-base">
                    🟢 Strengths
                  </h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {details.strengths?.map((point: string, i: number) => (
                      <li key={i} className="text-xs sm:text-sm text-green-100 leading-relaxed flex items-start gap-2">
                        <span className="text-green-300 mt-1 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                {details.weaknesses?.length > 0 && (
                  <div>
                    <h4 className="text-red-300 font-semibold mb-2 text-sm sm:text-base">
                      🎯 Areas for Improvement
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {details.weaknesses.map((point: string, i: number) => (
                        <li key={i} className="text-xs sm:text-sm text-red-100 leading-relaxed flex items-start gap-2">
                          <span className="text-red-300 mt-1 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIResumeAnalyzer;