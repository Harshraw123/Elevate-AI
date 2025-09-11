import React from 'react'

const Skills = ({resumeInfo}) => {
  return (
    <div className="text-black">
      {/* Section Header */}
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-center mt-5 font-bold text-md"
      >
        Skills
      </h2>
      <hr className="mt-2 border-[2px]" />

      {/* Skills List */}
      <div className="mt-4 space-y-3">
        {resumeInfo?.skills?.map((item, index) => (
          <div key={`preview-skill-${item.id || index}-${index}`} className="">
            {/* Skill name & rating */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm">{item.name}</span>
              <span className="text-xs text-gray-600 font-medium">{item.rating}%</span>
            </div>

            {/* Progress bar container */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              {/* Filled progress */}
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${item.rating}%`,
                  background: `linear-gradient(90deg, ${resumeInfo?.themeColor}, #ff7f50)`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills

