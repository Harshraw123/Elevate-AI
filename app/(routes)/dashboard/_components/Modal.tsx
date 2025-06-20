"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { File, Loader2, Sparkle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      console.log(file.name);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    const recordId = uuidv4();

    try {
      const formData = new FormData();
      formData.append("resumefile", file);
      formData.append("recordId", recordId);

      const response = await axios.post("/api/ai-resume-agent", formData);

      console.log("✅ AI Analysis Result:", response.data);
      alert("✅ Resume uploaded and analysis started!");

      if (response) {
        // Create history record for resume
        await axios.post("/api/history", {
          content: [],
          recordId,
          aiAgentType: "AI Resume Analyzer",
        });
        router.push(`/ai-tools/ai-resume/${recordId}`);
        setUploading(false);
      }

      setFile(null);
      onClose();
    } catch (error) {
      console.error("❌ Analysis failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            📄 Upload Your Resume
          </DialogTitle>

          {/* Fix: Use asChild prop to render DialogDescription as div */}
          <DialogDescription asChild>
            <div className="space-y-4">
              <label
                htmlFor="resumeUpload"
                className="flex items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition duration-200 overflow-x-auto"
              >
                <File className="w-6 h-6 text-gray-500" />
                {file ? (
                  <h2 className="font-bold text-xl text-green-400">
                    Selected file is: {file.name.slice(0, 18)}...
                  </h2>
                ) : (
                  <h2 className="text-lg font-medium text-gray-700">
                    Click here to upload your resume
                  </h2>
                )}
              </label>

              <input
                type="file"
                id="resumeUpload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={onFileChange}
              />
              <p className="text-sm text-gray-500 text-center">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!file}
            className="bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-slate-700 font-bold text-white px-4 py-2 rounded-md transition"
          >
            {uploading ? (
              <Loader2 className="animate-spin text-sky-400 w-5 h-5" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Submit</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;