import React from 'react';
import { Check, Shield } from 'lucide-react';
import { BodyworkOption } from '../types';

interface AddonSelectorProps {
  addons: BodyworkOption[];
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
}

export default function AddonSelector({
  addons,
  selectedAddons,
  onToggleAddon,
}: AddonSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Protection & Enhancements</h3>
      </div>
      <div className="space-y-3">
        {addons.map((addon) => (
          <button
            key={addon.id}
            onClick={() => onToggleAddon(addon.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              selectedAddons.includes(addon.id)
                ? 'bg-blue-600/20 ring-2 ring-blue-500'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-lg border-2 mr-3 flex items-center justify-center ${
                  selectedAddons.includes(addon.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}
              >
                {selectedAddons.includes(addon.id) && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-white">{addon.name}</p>
                <p className="text-sm text-gray-400">{addon.description}</p>
              </div>
            </div>
            <span className="text-blue-400">+${addon.price.toLocaleString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}