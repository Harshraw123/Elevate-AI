import React from 'react';
import { Star } from 'lucide-react';

const RatingInput = ({ rating, onChange }) => {
  const starsFilled = Math.ceil(rating / 20);

  const getLabel = () => {
    if (rating >= 80) return { text: 'Expert', color: 'bg-green-100 text-green-800' };
    if (rating >= 60) return { text: 'Advanced', color: 'bg-blue-100 text-blue-800' };
    if (rating >= 40) return { text: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' };
    if (rating >= 20) return { text: 'Beginner', color: 'bg-orange-100 text-orange-800' };
    return { text: 'No Rating', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Proficiency Level</span>
        <span className="text-sm font-bold text-blue-600">{rating}%</span>
      </div>

      {/* Stars */}
      <div className="flex items-center space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              star <= starsFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onChange(star * 20)}
          />
        ))}
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={rating}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${rating}%, #e5e7eb ${rating}%)`
        }}
      />

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
        <span>Expert</span>
      </div>

      {/* Badge */}
      <div className="text-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLabel().color}`}>
          {getLabel().text}
        </span>
      </div>
    </div>
  );
};

export default RatingInput;
