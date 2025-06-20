import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomNodeProps {
  data: {
    title: string;
    description: string;
    duration?: string;
    status?: string;
    link?: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-600 border border-gray-200 rounded-lg p-4 shadow-lg w-72 transition-all hover:shadow-xl">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-yellow-500" 
      />
      <div className="space-y-3">
        <h3 className="font-semibold text-base text-white bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          {data.title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-3">{data.description}</p>

        {data.duration && (
          <div className="flex items-center text-xs text-gray-200">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.duration}
          </div>
        )}

        {data.status && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${data.status === 'completed' ? 'bg-green-500 text-white' :
                data.status === 'in-progress' ? 'bg-blue-500 text-white' :
                'bg-gray-500 text-white'}`}>
              {data.status}
            </span>
          </div>
        )}

        {data.link && (
          <a 
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 text-sm font-medium text-yellow-400 hover:text-yellow-600 transition-colors"
          >
            Learn More
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-yellow-500" 
      />
    </div>
  );
};

export default CustomNode;