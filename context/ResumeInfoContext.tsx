import { createContext, useContext } from "react";

export interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  city?: string;
  state?: string;
  zipCode?: string;
  linkedin?: string;
  website?: string;
  themeColor: string;
  summery: string;
  experience: Array<{
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  }>;
  education: Array<{
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    rating: number;
  }>;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: (info: ResumeInfo) => void;
  updatePersonalDetails: (details: Partial<ResumeInfo>) => void;
  updateProfessionalExperience: (experiences: ResumeInfo['experience']) => void;
  updateEducation: (education: ResumeInfo['education']) => void;
  updateSkills: (skills: ResumeInfo['skills']) => void;
  updateSummary: (summary: string) => void;
}

export const ResumeInfoContext = createContext<ResumeInfoContextType | null>(null);

export const useResumeInfo = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error('useResumeInfo must be used within a ResumeInfoProvider');
  }
  return context;
};