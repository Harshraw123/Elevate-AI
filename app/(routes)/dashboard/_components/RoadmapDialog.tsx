'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Sparkle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RoadmapDialog = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const generateRoadmap = async () => {
    const roadmapId = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post<{ output?: string }>("/api/ai-roadmap-agent", {
        roadmapId,
        userInput,
      });

      const response = result.data.output;

      if (response) {
  ;
        router.push(`/ai-tools/ai-roadmap/${roadmapId}`);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Position or Skill</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="e.g. Full Stack Developer"
                className="p-2 border rounded w-full text-black"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                aria-label="Roadmap Input"
              />
              <div className="flex justify-center sm:justify-end">
                <Button
                  disabled={!userInput || loading}
                  onClick={generateRoadmap}
                  className="w-full sm:w-40 flex items-center justify-center gap-2"
                  variant="outline"
                >
                  <Sparkle className="w-4 h-4" />
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapDialog;
