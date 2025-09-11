import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Award, Zap, Trash2 } from 'lucide-react';
import RatingInput from './RatingInput';

const SkillCard = ({ index, skill, onChange, onRemove, canRemove }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-4 h-4 text-green-600" /> Skill {index + 1}
        </h3>
        {canRemove && (
          <Button type="button" onClick={() => onRemove(skill.id)}
            variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </Button>
        )}
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-green-600" /> Skill Name *
        </label>
        <Input
          required
          value={skill.name}
          onChange={(e) => onChange(skill.id, 'name', e.target.value)}
          placeholder="e.g., JavaScript, Python, React, AWS, etc."
          className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100"
        />
      </div>

      {/* Rating */}
      <RatingInput
        rating={skill.rating}
        onChange={(val) => onChange(skill.id, 'rating', val)}
      />
    </div>
  );
};

export default SkillCard;
