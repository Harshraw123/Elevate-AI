import React from 'react'

const ProfessionalExperience = ({resumeInfo}) => {
  return (
    <div className="text-black">
      {/* Section Header */}
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-center mt-5 font-bold text-md"
      >
        Professional Experience
      </h2>
      <hr className="mt-2 border-[2px]" />

      {/* Experience Entries */}
      <div className="space-y-4 mt-4">
        {resumeInfo?.experience?.map((item, index) => (
          <div key={item.id || index} className="mb-4">
            {/* Job Title and Company Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
              <div className="flex-1">
                <h3 
                  style={{ color: resumeInfo?.themeColor }}
                  className="font-bold text-sm leading-tight"
                >
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  {item.companyName}
                  {(item.city || item.state) && (
                    <span className="text-gray-600">
                      {item.city && `, ${item.city}`}
                      {item.state && `, ${item.state}`}
                    </span>
                  )}
                </p>
              </div>
              
              {/* Date Range */}
              <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                {item.startDate} {item.endDate ? `- ${item.endDate}` : '- Present'}
              </div>
            </div>

            {/* Work Summary */}
            {item.workSummery && (
              <div className="mt-2">
                {item.workSummery.includes('<') ? (
                  // Render as HTML if it contains HTML tags
                  <div 
                    className="text-xs text-gray-800 leading-relaxed experience-content"
                    dangerouslySetInnerHTML={{ __html: item.workSummery }}
                  />
                ) : (
                  // Render as plain text with manual bullet points
                  <ul className="text-xs text-gray-800 space-y-1 pl-4 list-disc">
                    {item.workSummery
                      .split('\n')
                      .filter((point) => point.trim() !== '')
                      .map((point, subIndex) => {
                        // Clean up the bullet point
                        const cleanedPoint = point.trim().replace(/^[•·-]\s*/, '');
                        
                        if (cleanedPoint) {
                          return (
                            <li key={subIndex} className="leading-relaxed">
                              {cleanedPoint}
                            </li>
                          );
                        }
                        return null;
                      })
                      .filter(Boolean)}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfessionalExperience
