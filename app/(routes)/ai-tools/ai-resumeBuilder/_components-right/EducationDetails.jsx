import React from 'react'

const EducationDetails = ({resumeInfo}) => {
  return (
    <div className="text-black">
      {/* Section Header */}
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-center mt-5 font-bold text-md"
      >
        Education
      </h2>
      <hr className="mt-2 border-[2px]" />

      {/* Education Entries */}
      <div className="space-y-3 mt-4">
        {resumeInfo?.education?.map((item, index) => (
          <div key={item.id || index} className="mb-3">
            {/* University and Degree Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
              <div className="flex-1">
                <h3
                  style={{ color: resumeInfo?.themeColor }}
                  className="font-bold text-sm leading-tight"
                >
                  {item.universityName}
                </h3>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  {item.degree} in {item.major}
                </p>
              </div>
              
              {/* Date Range */}
              <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                {item.startDate} - {item.endDate}
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="mt-2">
                <p className="text-xs text-gray-800 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EducationDetails
