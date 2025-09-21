import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <span className="font-medium">Thinking</span>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
      </div>
    </div>
  );
};

export default Loader;
