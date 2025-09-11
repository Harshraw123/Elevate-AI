import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useState } from 'react'

interface ResumeBuilderFormProps {
  openDialog: boolean
  onClose: (open: boolean) => void
}



const ResumeBuilderForm: React.FC<ResumeBuilderFormProps> = ({ openDialog, onClose }) => {


const[resumeTitle,setResumeTitle]=useState<string>('');

const handleClick = async () => {
  if (!resumeTitle.trim()) {
    alert('Please enter a resume title');
    return;
  }

  try {
    const id = uuidv4();
    
    // Create a new resume record in the database
    const response = await axios.post('/api/history', {
      recordId: id,
      content: JSON.stringify({
        title: resumeTitle,
        type: 'resume_builder',
        status: 'created',
        resumeData: {}
      }),
      aiAgentType: 'resume_builder'
    });

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      // Navigate to the resume builder page
      window.location.href = `/ai-tools/ai-resumeBuilder/${id}`;
    } else {
      alert('Failed to create resume. Please try again.');
    }
  } catch (error) {
    console.error('Error creating resume:', error);
    alert('An error occurred while creating your resume. Please try again.');
  }
}

  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <span className="text-sm text-gray-500">Add a title for your resume</span>
          
          <input
            type="text"
            placeholder="Full Stack Developer"
            className="w-full px-3 text-black py-2 border rounded-md"
            value={resumeTitle}
            onChange={(e)=>setResumeTitle(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button  onClick={handleClick}     className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Create
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResumeBuilderForm
