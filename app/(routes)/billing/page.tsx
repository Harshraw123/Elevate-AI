import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    // Outer container to center content and apply padding
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Content wrapper for text and pricing table */}
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Title and subtitle */}
        <div>
          <h2 className="text-4xl font-extrabold  sm:text-5xl md:text-6xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl">
            Select a subscription bundle that fits your needs.
          </p>
        </div>

        {/* PricingTable component */}
        <div className="mt-10"> {/* Add margin top to separate from text */}
          <PricingTable />
        </div>
      </div>
    </div>
  )
}

export default page
