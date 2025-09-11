'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Plus, Trash2, Save, Calendar, Building, BookOpen, FileText } from 'lucide-react';
import { useResumeInfo } from '@/context/ResumeInfoContext';
import { Textarea } from '@/components/ui/textarea';

import {DegreeSelector} from './DegreeSelector'

const EducationDetails = ({ onComplete, setActiveFormIndex, activeFormIndex }) => {
  const { resumeInfo, updateEducation } = useResumeInfo();
  
  const [educations, setEducations] = useState([
    {
      id: 1,
      universityName: '',
      startDate: '',
      endDate: '',
      degree: '',
      major: '',
      description: ''
    }
  ]);

  // Load existing education from context
  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducations(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleInputChange = (id, field, value) => {
    const updated = educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu   //rewriting existing field
    );
    setEducations(updated);
    updateEducation(updated);
  };

  const addEducation = () => {
    const newId = Math.max(...educations.map(edu => edu.id), 0) + 1;
    const newEducations = [
      ...educations,
      {
        id: newId,
        universityName: '',
        startDate: '',
        endDate: '',
        degree: '',
        major: '',
        description: ''
      }
    ];
    setEducations(newEducations);
    updateEducation(newEducations);
  };

  const removeEducation = (id) => {
    if (educations.length > 1) {
      const updated = educations.filter(edu => edu.id !== id);
      setEducations(updated);
      updateEducation(updated);
    }
  };

  // Check form completeness for progress
  useEffect(() => {
    const isComplete = educations.every(edu =>
      edu.universityName.trim() !== '' && 
      edu.degree.trim() !== '' && 
      edu.major.trim() !== '' &&
      edu.startDate.trim() !== '' &&
      edu.endDate.trim() !== ''
    ) && educations.length > 0;
    onComplete(isComplete);
  }, [educations, onComplete]);

  const handleSave = (e) => {
    e.preventDefault();
    setActiveFormIndex(activeFormIndex + 1);
  };

  // Common degree options for quick selection


  return (
    <div className="w-full max-w-4xl mx-auto text-black">
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl overflow-hidden text-black">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold">Education Background</CardTitle>
              <p className="text-orange-100 text-lg">Your academic achievements</p>
            </div>
          </div>

          {/* Progress Bar */}
         
        
        </CardHeader>

        <CardContent className="p-8">
          <form className="space-y-8">
            {educations.map((edu, idx) => (
              <div key={edu.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-orange-600" />
                    Education {idx + 1}
                  </h3>
                  {educations.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeEducation(edu.id)} 
                      variant="outline" 
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>

                {/* Institution & Dates */}
                <div className="grid md:grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4 text-orange-600" />
                      Institution Name *
                    </label>
                    <Input
                      required
                      value={edu.universityName}
                      onChange={(e) => handleInputChange(edu.id, 'universityName', e.target.value)}
                      placeholder="e.g., Harvard University, MIT, Stanford University"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                </div>

                {/* Degree & Major */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      Degree *
                    </label>
                    <DegreeSelector
                      value={edu.degree}
                      onChange={(value) => handleInputChange(edu.id, 'degree', value)}
                      educationId={edu.id}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      Field of Study *
                    </label>
                    <Input
                      required
                      value={edu.major}
                      onChange={(e) => handleInputChange(edu.id, 'major', e.target.value)}
                      placeholder="e.g., Computer Science, Business Administration"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                </div>

                {/* Start & End Dates */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      Start Date *
                    </label>
                    <Input
                      required
                      value={edu.startDate}
                      onChange={(e) => handleInputChange(edu.id, 'startDate', e.target.value)}
                      placeholder="e.g., Aug 2018, September 2020"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      End Date *
                    </label>
                    <Input
                      required
                      value={edu.endDate}
                      onChange={(e) => handleInputChange(edu.id, 'endDate', e.target.value)}
                      placeholder="e.g., May 2022, Expected Dec 2024"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                </div>

                {/* Description/Achievements */}
              
              </div>
            ))}

            {/* Add More Education */}
            <div className="flex justify-center">
              <Button 
                type="button" 
                onClick={addEducation} 
                variant="outline" 
                className="border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Education
              </Button>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleSave} 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Save className="w-5 h-5" />
                Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationDetails;
