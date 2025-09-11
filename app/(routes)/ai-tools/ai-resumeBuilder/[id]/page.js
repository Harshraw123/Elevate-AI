'use client'

import React, { useEffect, useState } from 'react'
import FormSection from '../_components-left/FormSection'
import ResumePreview from '../_components-right/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'next/navigation'
import data from '../_components-right/data'
import axios from 'axios'

const Page = () => {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState(data)

    const updatePersonalDetails = (details) => {
        setResumeInfo(prev => ({
            ...prev,
            ...details
        }))
    }

    const updateProfessionalExperience = (experiences) => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experiences
        }))
    }

    const updateEducation = (education) => {
        setResumeInfo(prev => ({
            ...prev,
            education: education
        }))
    }

    const updateSkills = (skills) => {
        setResumeInfo(prev => ({
            ...prev,
            skills: skills
        }))
    }

    const updateSummary = (summary) => {
        setResumeInfo(prev => ({
            ...prev,
            summary: summary
        }))
    }

    // Load existing resume data from database
    useEffect(() => {
        const loadResumeData = async () => {
            try {
                const response = await axios.get(`/api/history?chatid=${params.id}`);
                const historyData = response.data?.[0];
                
                if (historyData?.content) {
                    // Check if content is already an object or needs parsing
                    let parsedContent;
                    if (typeof historyData.content === 'string') {
                        try {
                            parsedContent = JSON.parse(historyData.content);
                        } catch (parseError) {
                            console.error('Error parsing content:', parseError);
                            parsedContent = null;
                        }
                    } else {
                        parsedContent = historyData.content;
                    }
                    
                    if (parsedContent?.resumeData && Object.keys(parsedContent.resumeData).length > 0) {
                        setResumeInfo(parsedContent.resumeData);
                        return;
                    }
                }
                
                // If no saved data, use default data
                setResumeInfo(data);
            } catch (error) {
                console.error('Error loading resume data:', error);
                setResumeInfo(data);
            }
        };

        if (params.id) {
            loadResumeData();
        } else {
            setResumeInfo(data);
        }
    }, [params.id])

    // Auto-save functionality
    useEffect(() => {
        if (!params.id || !resumeInfo) return;

        const saveResumeData = async () => {
            try {
                await axios.put('/api/history', {
                    recordId: params.id,
                    content: JSON.stringify({
                        title: resumeInfo.jobTitle || 'Untitled Resume',
                        type: 'resume_builder',
                        status: 'draft',
                        resumeData: resumeInfo
                    })
                });
            } catch (error) {
                console.error('Error saving resume data:', error);
            }
        };

        // Debounce auto-save to avoid too many API calls
        const timeoutId = setTimeout(saveResumeData, 2000);
        return () => clearTimeout(timeoutId);
    }, [resumeInfo, params.id])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            <ResumeInfoContext.Provider value={{ 
                resumeInfo, 
                setResumeInfo, 
                updatePersonalDetails,
                updateProfessionalExperience,
                updateEducation,
                updateSkills,
                updateSummary
            }}>
                <FormSection />
                <ResumePreview />
            </ResumeInfoContext.Provider>
        </div>
    )
}

export default Page

