'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Plus, Trash2, Save, AlertCircle, CheckCircle2, MapPin, Calendar, Building } from 'lucide-react';
import { useResumeInfo } from '@/context/ResumeInfoContext';
import TextEditor from './TextEditor';
import axios from 'axios';

const ProfessionalExperience = ({ onComplete, setActiveFormIndex, activeFormIndex }) => {
  const { resumeInfo, updateProfessionalExperience } = useResumeInfo();
  
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      workSummery: ''
    }
  ]);

  const [loading, setLoading] = useState(false);

  // Update form data when context changes
  useEffect(() => {
    if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
      setExperiences(resumeInfo.experience);
    } else {
      // Initialize with one empty experience form
      setExperiences([{
        id: 1,
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        workSummery: ''
      }]);
    }
  }, [resumeInfo]);

  const handleInputChange = (id, field, value) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
    updateProfessionalExperience(updated);
  };

  const addExperience = () => {
    const newId = Math.max(...experiences.map(exp => exp.id)) + 1;
    setExperiences([
      ...experiences,
      {
        id: newId,
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        workSummery: ''
      }
    ]);
  };

  const removeExperience = (id) => {
    if (experiences.length > 1) {
      const updated = experiences.filter(exp => exp.id !== id);
      setExperiences(updated);
      updateProfessionalExperience(updated);
    }
  };

  // Check form completeness for progress
  useEffect(() => {
    const isComplete = experiences.every(exp =>
      exp.title && exp.companyName && exp.city && exp.state && exp.startDate &&
      (exp.currentlyWorking || exp.endDate)
    );
    onComplete(isComplete);
  }, [experiences, onComplete]);

  const handleSave = (e) => {
    e.preventDefault();
    setActiveFormIndex(activeFormIndex + 1);
  };

  // AI bullet points generation
  const generateBulletPoints = async (id) => {
    const exp = experiences.find(e => e.id === id);
    if (!exp.title) {
      alert("Please enter the job title first.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/ai-experience-summery', { jobTitle: exp.title });
      if (Array.isArray(res.data.output)) {
        // Format as HTML list for the rich text editor
        const bulletPoints = res.data.output.map(point => `<li>${point}</li>`).join('');
        const formattedContent = `<ul>${bulletPoints}</ul>`;
        handleInputChange(id, 'workSummery', formattedContent);
      }
    } catch (error) {
      console.error('Error generating bullet points:', error);
      alert("Error generating bullet points.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-black">
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl overflow-hidden text-black">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold">Professional Experience</CardTitle>
              <p className="text-purple-100 text-lg">Showcase your work history</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-6">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{
                width: `${(experiences.filter(exp =>
                  exp.title && exp.companyName && exp.city && exp.state && exp.startDate &&
                  (exp.currentlyWorking || exp.endDate)
                ).length / experiences.length) * 100}%`
              }}
            ></div>
          </div>
          <p className="text-center text-purple-100 mt-2 text-sm">
            {experiences.filter(exp =>
              exp.title && exp.companyName && exp.city && exp.state && exp.startDate &&
              (exp.currentlyWorking || exp.endDate)
            ).length} of {experiences.length} completed
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <form className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Experience {idx + 1}
                  </h3>
                  {experiences.length > 1 && (
                    <Button type="button" onClick={() => removeExperience(exp.id)} variant="outline" className="text-red-600 border-red-300">
                      <Trash2 className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  )}
                </div>

                {/* Position & Company */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Position Title *</label>
                    <Input required value={exp.title} onChange={e => handleInputChange(exp.id, 'title', e.target.value)} placeholder="e.g., Senior Developer" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Building className="w-4 h-4" /> Company Name *</label>
                    <Input required value={exp.companyName} onChange={e => handleInputChange(exp.id, 'companyName', e.target.value)} placeholder="e.g., Google" />
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> City *</label>
                    <Input required value={exp.city} onChange={e => handleInputChange(exp.id, 'city', e.target.value)} placeholder="e.g., San Francisco" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State *</label>
                    <Input required value={exp.state} onChange={e => handleInputChange(exp.id, 'state', e.target.value)} placeholder="e.g., CA" />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> Start Date *</label>
                    <Input required value={exp.startDate} onChange={e => handleInputChange(exp.id, 'startDate', e.target.value)} placeholder="e.g., Jan 2021" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> End Date {!exp.currentlyWorking && '*'}</label>
                    <div className="flex gap-3 items-center">
                      <Input
                        value={exp.endDate}
                        onChange={e => handleInputChange(exp.id, 'endDate', e.target.value)}
                        placeholder="e.g., Dec 2023"
                        disabled={exp.currentlyWorking}
                        required={!exp.currentlyWorking}
                      />
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={exp.currentlyWorking} onChange={e => handleInputChange(exp.id, 'currentlyWorking', e.target.checked)} />
                        Currently Working
                      </label>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6 text-black">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-semibold">Job Summary</h4>
                    <Button type="button" onClick={() => generateBulletPoints(exp.id)} disabled={loading} variant="outline" className="text-purple-600 border-purple-500">
                      {loading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                  <TextEditor value={exp.workSummery || ''} onChange={(val) => handleInputChange(exp.id, 'workSummery', val)} />
                </div>
              </div>
            ))}

            {/* Add More */}
            <div className="flex justify-center">
              <Button type="button" onClick={addExperience} variant="outline" className="border-2 border-dashed text-white border-purple-300">
                <Plus className="w-5 h-5 mr-2" /> Add More Experience
              </Button>
            </div>

            {/* Save */}
            <div className="flex justify-center pt-6">
              <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl">
                <Save className="w-5 h-5 mr-2" /> Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalExperience;
