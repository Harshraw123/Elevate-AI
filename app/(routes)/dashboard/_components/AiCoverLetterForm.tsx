'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkle, User, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AiCoverLetterFormProps {
  openCoverLetterDialog: boolean;
  setOpenCoverLetterDialog: (value: boolean) => void;
}

const AiCoverLetterForm: React.FC<AiCoverLetterFormProps> = ({
  openCoverLetterDialog,
  setOpenCoverLetterDialog,
}) => {
  const [userName, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const GenerateCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const coverLetterId = uuidv4();

    const coverLetterData = {
      coverLetterId,
      userName,
      position,
      resumeSummary,
      jobDescription,
    };

    try {
      const response = await axios.post<{ output?: string }>(
        "/api/ai-cover-letter-agent",
        coverLetterData
      );

      toast.success("✅ Cover letter generation started!");

      if (response.data?.output) {
        // [REMOVED] History creation moved to inngest function to prevent duplicates
        // await axios.post("/api/history", {
        //   content: [response.data.output],
        //   recordId: coverLetterId,
        //   aiAgentType: "Cover Letter Generator",
        // });
        router.push("/ai-tools/ai-coverLetter/" + coverLetterId);
      }

      setOpenCoverLetterDialog(false);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openCoverLetterDialog} onOpenChange={setOpenCoverLetterDialog}>
      <DialogContent className="max-w-2xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkle className="text-yellow-500" /> AI Cover Letter Generator
          </DialogTitle>
          <DialogDescription className="mt-1 text-gray-500">
            Let AI help you craft the perfect personalized cover letter for any job.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={GenerateCoverLetter} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-400">
              <User size={16} /> Your Full Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Position */}
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-400">
              <Briefcase size={16} /> Position You&apos;re Applying For
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Frontend Developer Intern"
              required
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume Summary */}
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-400">
              <FileText size={16} /> Brief Resume Summary
            </label>
            <textarea
              value={resumeSummary}
              onChange={(e) => setResumeSummary(e.target.value)}
              placeholder="Summarize your key strengths, experience, or achievements..."
              required
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-400">
              🧾 Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here so AI can match your letter to it..."
              required
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? "⏳ Generating..." : "✨ Generate My Cover Letter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AiCoverLetterForm;
