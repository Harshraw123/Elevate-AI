import React from 'react'

const deafaultQuery=[
    ["What skills do I need to become a data scientist?"],
    ["What are the best resources to learn web development?"],

]

const EmptyState = ({selectedQuery}:any) => {
  return (
    <div className='flex items-center justify-center flex-col gap-5 space-y-2 mt-10' >
  <h1 className='text-2xl font-bold text-center'>Ask Anything to AI Carrer Agent </h1>
      {deafaultQuery.map((query,index)=>{
        return <div  key={index} onClick={()=>selectedQuery(query)} className='border shadow-md p-5 '>
            {query}
        </div>

      })}
    </div>
  )
}

export default EmptyState
