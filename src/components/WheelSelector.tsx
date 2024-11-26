import React from 'react';
import { WheelOption } from '../types';

interface WheelSelectorProps {
  wheels: WheelOption[];
  selectedWheel: string;
  onWheelSelect: (wheelId: string) => void;
}

export default function WheelSelector({
  wheels,
  selectedWheel,
  onWheelSelect,
}: WheelSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Wheels</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wheels.map((wheel) => (
          <button
            key={wheel.id}
            onClick={() => onWheelSelect(wheel.id)}
            className={`p-4 rounded-lg transition-all ${
              selectedWheel === wheel.id
                ? 'bg-gray-100 ring-2 ring-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <img
              src={wheel.image}
              alt={wheel.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-medium">{wheel.name}</h4>
            <p className="text-sm text-gray-500">
              {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}