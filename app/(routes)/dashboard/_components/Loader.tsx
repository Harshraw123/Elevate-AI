import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative w-12 h-12">
        <div className="absolute w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-ping opacity-50"></div>
      </div>
    </div>
  );
};

export default Loader;
