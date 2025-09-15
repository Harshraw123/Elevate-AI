import React from 'react';

const EmptyState = () => {
  const handleExploreClick = () => {
    // Your navigation logic here
    // Navigate to AI tools
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="text-center">
        {/* Animated Professional Face */}
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
          >
            {/* Face circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="url(#faceGradient)"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            
            {/* Eyes */}
            <circle cx="38" cy="40" r="2.5" fill="#64748b">
              <animate
                attributeName="r"
                values="2.5;1;2.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="62" cy="40" r="2.5" fill="#64748b">
              <animate
                attributeName="r"
                values="2.5;1;2.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Smile */}
            <path
              d="M 40 60 Q 50 68 60 60"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                values="M 40 60 Q 50 68 60 60;M 40 62 Q 50 65 60 62;M 40 60 Q 50 68 60 60"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            
            {/* Thinking dots */}
            <circle cx="75" cy="25" r="1.5" fill="#94a3b8" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="82" cy="20" r="1" fill="#94a3b8" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="1.5s"
                begin="0.3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="87" cy="15" r="0.8" fill="#94a3b8" opacity="0.3">
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur="1.5s"
                begin="0.6s"
                repeatCount="indefinite"
              />
            </circle>
            
            <defs>
              <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h3 className="text-xl font-semibold mb-2">Your Journey Awaits</h3>
        <p className="text-slate-600 mb-1">No AI tools used yet</p>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
          Start exploring our AI-powered career tools to build your professional journey
        </p>
        <button
          onClick={handleExploreClick}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        >
          Explore AI Tools
        </button>
      </div>
    </div>
  );
};

export default EmptyState;