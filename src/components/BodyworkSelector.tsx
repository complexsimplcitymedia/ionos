import React from 'react';
import { Check } from 'lucide-react';
import { BodyworkOption } from '../types';

interface BodyworkSelectorProps {
  options: BodyworkOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

export default function BodyworkSelector({
  options,
  selectedOptions,
  onToggleOption,
}: BodyworkSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Bodywork Services</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onToggleOption(option.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              selectedOptions.includes(option.id)
                ? 'bg-blue-600/20 ring-2 ring-blue-500'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-lg border-2 mr-3 flex items-center justify-center ${
                  selectedOptions.includes(option.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}
              >
                {selectedOptions.includes(option.id) && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-white">{option.name}</p>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </div>
            <span className="text-blue-400">+${option.price.toLocaleString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}