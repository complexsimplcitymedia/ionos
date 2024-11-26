import React from 'react';
import { Check } from 'lucide-react';
import { CarColor } from '../types';

interface ColorPickerProps {
  colors: CarColor[];
  selectedColor: string;
  onColorSelect: (colorId: string) => void;
}

export default function ColorPicker({ colors, selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Exterior Color</h3>
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorSelect(color.id)}
            className={`flex items-center p-3 rounded-lg transition-all ${
              selectedColor === color.id
                ? 'bg-gray-100 ring-2 ring-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full border-2 border-gray-200 mr-3 flex items-center justify-center"
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.id && (
                <Check
                  className={color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}
                  size={20}
                />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">{color.name}</p>
              <p className="text-sm text-gray-500">
                {color.price === 0 ? 'Included' : `+$${color.price.toLocaleString()}`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}