import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <UserProfile routing="path" />
    </div>
  )
}

export default page 