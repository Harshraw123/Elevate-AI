import React from 'react'
import { useResumeInfo } from '@/context/ResumeInfoContext'
import PersonalDetailsPreview from './PersonalDetailsPreview'
import ProfessionalExperience from './ProfessionalExperience'
import EducationDetails from './EducationDetails'
import Skills from './Skills'
import { Download, Save } from 'lucide-react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const ResumePreview = () => {
  const { resumeInfo } = useResumeInfo()
  const params = useParams()

  const handleDownload = () => {
    // Create a new window with just the resume content for printing/downloading
    const printContent = document.getElementById('resume-content').innerHTML;
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume - ${resumeInfo?.firstName} ${resumeInfo?.lastName}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              background: white;
              color: black;
            }
            @media print {
              body { margin: 0; padding: 0; }
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleSave = async () => {
    if (!params.id || !resumeInfo) return;

    try {
      await axios.put('/api/history', {
        recordId: params.id,
        content: JSON.stringify({
          title: resumeInfo.jobTitle || 'Untitled Resume',
          type: 'resume_builder',
          status: 'saved',
          resumeData: resumeInfo
        })
      });
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    }
  };

  if (!resumeInfo) {
    return (
      <div className="shadow-lg h-full p-8 bg-white flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading resume preview...</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-white relative">
      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 print:hidden">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          title="Save Resume"
        >
          <Save className="w-5 h-5" />
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          title="Download Resume"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div 
        id="resume-content"
        className='shadow-lg h-full px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 border-t-[20px] bg-white overflow-y-auto' 
        style={{borderColor: resumeInfo?.themeColor}}
      >
        {/* Personal Details & Summary */}
        <PersonalDetailsPreview resumeInfo={resumeInfo} />

        {/* Professional Experience */}
        {resumeInfo?.experience?.length > 0 && (
          <ProfessionalExperience resumeInfo={resumeInfo} />
        )}

        {/* Education */}
        {resumeInfo?.education?.length > 0 && (
          <EducationDetails resumeInfo={resumeInfo} />
        )}

        {/* Skills */}
        {resumeInfo?.skills?.length > 0 && (
          <Skills resumeInfo={resumeInfo} />
        )}
      </div>
    </div>
  )
}

export default ResumePreview
