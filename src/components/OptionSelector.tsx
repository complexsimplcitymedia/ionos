import React from 'react';
import { Check } from 'lucide-react';
import { CarOption } from '../types';

interface OptionSelectorProps {
  title: string;
  options: CarOption[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

export default function OptionSelector({
  title,
  options,
  selectedOption,
  onSelect,
}: OptionSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
              selectedOption === option.id
                ? 'bg-gray-100 ring-2 ring-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption === option.id && <Check className="text-white" size={16} />}
              </div>
              <span className="font-medium">{option.name}</span>
            </div>
            <span className="text-gray-500">
              {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}