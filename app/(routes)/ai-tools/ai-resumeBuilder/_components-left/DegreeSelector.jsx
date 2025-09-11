'use client'


import { useState } from "react";
import { Input } from '@/components/ui/input';

const degreeOptions = [
    'Bachelor of Science (B.S.)',
    'Bachelor of Arts (B.A.)',
    'Bachelor of Engineering (B.E.)',
    'Bachelor of Technology (B.Tech)',
    'Master of Science (M.S.)',
    'Master of Arts (M.A.)',
    'Master of Business Administration (MBA)',
    'Master of Engineering (M.E.)',
    'Doctor of Philosophy (Ph.D.)',
    'Associate Degree',
    'Certificate',
    'Diploma'
  ];

  export const DegreeSelector = ({ value, onChange, educationId }) => {
    const [showOptions, setShowOptions] = useState(false);
    
    return (
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter degree or select from suggestions"
          className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        />
        
        {showOptions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {degreeOptions.filter(option => 
              option.toLowerCase().includes(value.toLowerCase())
            ).map((option, idx) => (
              <div
                key={idx}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  onChange(option);
                  setShowOptions(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };