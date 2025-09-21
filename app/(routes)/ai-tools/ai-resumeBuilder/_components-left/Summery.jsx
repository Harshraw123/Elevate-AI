'use client';
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useResumeInfo } from '@/context/ResumeInfoContext';

const Summery = ({ onComplete, setActiveFormIndex, activeFormIndex }) => {
  const { resumeInfo,updateSummary } = useResumeInfo();

  const [summary, setSummary] = useState('');
  const [summaryOptions, setSummaryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const jobTitle = resumeInfo?.jobTitle || '';

  // Load summary from context when component mounts
  useEffect(() => {
    if (resumeInfo?.summary) {
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo?.summary]);

  // Check if form is complete for enabling next button
  useEffect(() => {
    const isComplete = summary.trim().length > 0;
    onComplete(isComplete);
  }, [summary, onComplete]);

  // Update context when summary changes
  useEffect(() => {
    if (summary !== resumeInfo?.summary) {
      updateSummary(summary);
    }
  }, [summary, updateSummary, resumeInfo?.summary]);

  const generateAiSummaries = async () => {
    if (!jobTitle) {
      alert("Please add a Job Title first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/ai-resume-summery', { jobTitle });
      const result = response.data.output;


      // Expecting JSON array from AI
      if (Array.isArray(result)) {
        setSummaryOptions(result);
    
      } else {
        console.error("Invalid AI response:", result);
        alert("AI did not return valid summaries.");
      }
    } catch (error) {
      console.error('Error in generateAiSummeries:', error);
      alert("Error generating summaries.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto p-3 bg-white text-black rounded-md shadow-lg shadow-gray-700">
      <h2 className="font-bold">Summary</h2>
      <h2 className="text-sm">Add a professional summary for your job title</h2>

      <div className="flex justify-between items-center p-2">
        <h2>Add Summary</h2>
        <Button onClick={generateAiSummaries} className="border-purple-400" disabled={loading}>
          <h1 className="text-purple-400">{loading ? "Generating..." : "Generate with AI"}</h1>
        </Button>
      </div>

      {/* Summary textarea */}
      <Textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="p-2 mt-1"
        rows={5}
      />

      {/* AI options */}
      {summaryOptions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">AI Suggestions</h3>
          <div className="space-y-2 mt-2">
            {summaryOptions.map((opt, idx) => (
              <div
                key={idx}
                className="border p-2 rounded-md cursor-pointer hover:bg-purple-50"
                onClick={() => setSummary(opt.summary)}
              >
                <p className="text-sm text-gray-500 font-semibold">{opt.level}</p>
                <p className="text-sm">{opt.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={() => {
            updateSummary(summary);
            setActiveFormIndex(activeFormIndex + 1);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default Summery;
