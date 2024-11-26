import React from 'react';
import { Check } from 'lucide-react';
import { PaintOption, WrapOption } from '../types';

interface FinishSelectorProps {
  type: string;
  paintOptions: PaintOption[];
  wrapOptions: WrapOption[];
  selectedFinish?: string;
  onFinishSelect: (finishId: string) => void;
}

export default function FinishSelector({
  type,
  paintOptions,
  wrapOptions,
  selectedFinish,
  onFinishSelect,
}: FinishSelectorProps) {
  const options = type === 'custom-paint' ? paintOptions : wrapOptions;
  const title = type === 'custom-paint' ? 'Paint Finish' : 'Wrap Style';

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {type === 'custom-paint' ? (
          // Paint Options
          paintOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFinishSelect(option.id)}
              className={`p-4 rounded-xl transition-all ${
                selectedFinish === option.id
                  ? 'bg-blue-600/20 ring-2 ring-blue-500'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-600"
                  style={{ backgroundColor: option.hex }}
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{option.name}</p>
                  <p className="text-sm text-gray-400 capitalize">{option.type}</p>
                </div>
              </div>
              <p className="text-blue-400">+${option.price.toLocaleString()}</p>
            </button>
          ))
        ) : (
          // Wrap Options
          wrapOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFinishSelect(option.id)}
              className={`p-4 rounded-xl transition-all ${
                selectedFinish === option.id
                  ? 'bg-blue-600/20 ring-2 ring-blue-500'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <div className="text-left">
                <p className="text-white font-medium">{option.name}</p>
                <p className="text-sm text-gray-400 capitalize">{option.type}</p>
                <p className="text-blue-400 mt-1">
                  {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}