import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center shadow-2xl  object-contain'>
      <UserProfile routing="path" />
    </div>
  )
}

export default page 