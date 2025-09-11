import React from 'react'

const PersonalDetailsPreview = ({resumeInfo}) => {
  // Format address with city, state, zip
  const formatAddress = () => {
    const parts = []
    if (resumeInfo?.address) parts.push(resumeInfo.address)
    if (resumeInfo?.city) parts.push(resumeInfo.city)
    if (resumeInfo?.state) parts.push(resumeInfo.state)
    if (resumeInfo?.zipCode) parts.push(resumeInfo.zipCode)
    return parts.join(', ')
  }

  return (
    <div className='text-center text-black'>
      {/* Name */}
      <h1 
        style={{color:resumeInfo?.themeColor}}
        className='font-bold text-lg leading-tight'
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      
      {/* Job Title */}
      <h2 className='text-sm font-bold text-gray-800 mt-1'>
        {resumeInfo?.jobTitle}
      </h2>
      
      {/* Address */}
      <p 
        className='text-xs font-medium mt-1 text-gray-600'
        style={{color:resumeInfo?.themeColor}}
      >
        {formatAddress()}
      </p>
      
      {/* Contact Information */}
      <div className='flex justify-center gap-4 text-xs font-medium mt-2 flex-wrap'>
        {resumeInfo?.phone && (
          <span style={{color:resumeInfo?.themeColor}}>
            {resumeInfo.phone}
          </span>
        )}
        {resumeInfo?.email && (
          <span style={{color:resumeInfo?.themeColor}}>
            {resumeInfo.email}
          </span>
        )}
      </div>

      {/* Optional contact links */}
      {(resumeInfo?.linkedin || resumeInfo?.website) && (
        <div className='flex justify-center gap-4 mt-1 text-xs font-medium flex-wrap'>
          {resumeInfo?.linkedin && (
            <span style={{color:resumeInfo?.themeColor}}>
              {resumeInfo.linkedin}
            </span>
          )}
          {resumeInfo?.website && (
            <span style={{color:resumeInfo?.themeColor}}>
              {resumeInfo.website}
            </span>
          )}
        </div>
      )}

      <hr className='border-[1.5px] my-3' />

      {/* Summary */}
      {resumeInfo?.summary && (
        <div className='text-left'>
          <p className='text-xs text-gray-800 leading-relaxed px-1'>
            {resumeInfo.summary}
          </p>
        </div>
      )}
    </div>
  )
}

export default PersonalDetailsPreview
