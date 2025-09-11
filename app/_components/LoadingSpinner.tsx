"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = "" 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-transparent rounded-full animate-spin`}
        style={{
          borderTopColor: 'transparent',
          borderImage: 'conic-gradient(#3b82f6, #06b6d4, #3b82f6) 1',
          animationDuration: '0.7s'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
