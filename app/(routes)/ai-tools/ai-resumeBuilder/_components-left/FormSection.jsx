import { ArrowLeft, LayoutGrid, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import PersonalDetails from './PersonalDetails'
import ThemeButton from './Theme'
import Summery from './Summery'
import ProfessionalExperience from './ProfessionalExperience'
import EducationDetails from '../_components-left/EducationDetails'
import Skills from '../_components-left/Skills'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)

  const handleNext = () => {
    if (enableNext && activeFormIndex < 5) {
      setActiveFormIndex(activeFormIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1)
    }
  }



  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-t-3xl shadow-lg border-b border-gray-200/50 backdrop-blur-sm">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <ThemeButton/>
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-800">Resume Builder</h2>
              <p className="text-sm text-gray-600">Step {activeFormIndex} of 5</p>
            </div>
          </div>

          <div className="flex gap-3">
            {activeFormIndex >= 2 && (
              <button 
                onClick={handlePrevious}
                className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-800 transition-all duration-200 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Previous</span>
              </button>
            )}

            {activeFormIndex < 5 && (
              <button 
                onClick={handleNext}
                disabled={!enableNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform shadow-lg ${
                  enableNext 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm'
                }`}
              >
                {enableNext && <CheckCircle className="w-4 h-4" />}
                <span>Next Step</span>
              </button>
            )}
            
            {activeFormIndex === 5 && (
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-100 text-green-800 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Resume Complete!</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-center gap-1 overflow-x-auto">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              activeFormIndex >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
              activeFormIndex >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              activeFormIndex >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
              activeFormIndex >= 3 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              activeFormIndex >= 3 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
              activeFormIndex >= 4 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              activeFormIndex >= 4 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              4
            </div>
            <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
              activeFormIndex >= 5 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              activeFormIndex >= 5 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              5
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-600">
            <span>Personal</span>
            <span>Summary</span>
            <span>Experience</span>
            <span>Education</span>
            <span>Skills</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-b-3xl shadow-2xl p-8">
        {activeFormIndex === 1 && (
          <PersonalDetails 
            onComplete={setEnableNext} 
            setActiveFormIndex={setActiveFormIndex} 
            activeFormIndex={activeFormIndex} 
          />
        )}
        {activeFormIndex === 2 && (
          <Summery 
            onComplete={setEnableNext} 
            setActiveFormIndex={setActiveFormIndex} 
            activeFormIndex={activeFormIndex} 
          />
        )}
        {activeFormIndex === 3 && (
          <ProfessionalExperience 
            onComplete={setEnableNext} 
            setActiveFormIndex={setActiveFormIndex} 
            activeFormIndex={activeFormIndex} 
          />
        )}
         {activeFormIndex === 4 && (
          <EducationDetails
            onComplete={setEnableNext} 
            setActiveFormIndex={setActiveFormIndex} 
            activeFormIndex={activeFormIndex} 
          />
        )}

{activeFormIndex === 5 && (
          <Skills
            onComplete={setEnableNext} 
            setActiveFormIndex={setActiveFormIndex} 
            activeFormIndex={activeFormIndex} 
          />
        )}
      </div>
    </div>
  )
}

export default FormSection






