'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Plus, Save } from 'lucide-react';
import { useResumeInfo } from '@/context/ResumeInfoContext';
import SkillCard from './SkillCard';

const Skills = ({ onComplete, setActiveFormIndex, activeFormIndex }) => {
  const { resumeInfo, updateSkills } = useResumeInfo();
  const [skills, setSkills] = useState([{ id: 1, name: '', rating: 0 }]);

  // Load from context
  useEffect(() => {
    if (resumeInfo?.skills?.length) {
      // Ensure all skills have unique IDs to prevent duplicate key errors
      const skillsWithUniqueIds = resumeInfo.skills.map((skill, index) => ({
        ...skill,
        id: skill.id || index + 1, // Use existing ID if valid, otherwise use index + 1
      }));
      
      // Check for duplicate IDs and fix them
      const uniqueSkills = [];
      const usedIds = new Set();
      let nextId = 1;
      
      skillsWithUniqueIds.forEach(skill => {
        let finalId = skill.id;
        
        // If ID is already used, find a new unique one
        while (usedIds.has(finalId)) {
          finalId = nextId++;
        }
        
        usedIds.add(finalId);
        uniqueSkills.push({ ...skill, id: finalId });
        
        if (finalId >= nextId) {
          nextId = finalId + 1;
        }
      });
      
      setSkills(uniqueSkills);
    }
  }, [resumeInfo]);

  // Handle change for a single skill
  const handleSkillChange = useCallback((id, field, value) => {
    setSkills(prev => {
      const updated = prev.map(s => (s.id === id ? { ...s, [field]: value } : s));
      updateSkills(updated);
      return updated;
    });
  }, [updateSkills]);

  // Add new skill
  const addSkill = () => {
    const newId = Math.max(0, ...skills.map(s => s.id)) + 1;
    const updated = [...skills, { id: newId, name: '', rating: 0 }];
    setSkills(updated);
    updateSkills(updated);
  };

  // Remove skill
  const removeSkill = (id) => {
    if (skills.length > 1) {
      const updated = skills.filter(s => s.id !== id);
      setSkills(updated);
      updateSkills(updated);
    }
  };

  // Check completeness
  useEffect(() => {
    const complete = skills.every(s => s.name.trim() && s.rating > 0);
    onComplete(complete);
  }, [skills, onComplete]);

  // Save & go next or complete
  const handleSave = (e) => {
    e.preventDefault();
    if (activeFormIndex >= 5) {
      // This is the final step
      alert('Resume completed successfully!');
    } else {
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  // Download resume function
  const handleDownload = () => {
    window.print(); // Simple download/print functionality
  };

  const completedCount = skills.filter(s => s.name && s.rating > 0).length;
  const progress = (completedCount / skills.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto text-black">
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold">Technical Skills</CardTitle>
              <p className="text-green-100 text-lg">Showcase your technical expertise</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-6">
            <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-green-100 mt-2 text-sm">
            {completedCount} of {skills.length} skills completed
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-8">
          <form className="space-y-8">
            {skills.map((skill, idx) => (
              <SkillCard
                key={`skill-${skill.id}-${idx}`}
                index={idx}
                skill={skill}
                onChange={handleSkillChange}
                onRemove={removeSkill}
                canRemove={skills.length > 1}
              />
            ))}

            {/* Add More */}
            <div className="flex justify-center">
              <Button type="button" onClick={addSkill} variant="outline"
                className="border-2 border-dashed border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400">
                <Plus className="w-5 h-5 mr-2" /> Add Another Skill
              </Button>
            </div>

            {/* Save */}
            <div className="flex justify-center pt-6">
              <Button onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <Save className="w-5 h-5" /> Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
