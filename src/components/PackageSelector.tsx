import React from 'react';
import { Check } from 'lucide-react';
import { CarOption } from '../types';

interface PackageSelectorProps {
  packages: CarOption[];
  selectedPackages: string[];
  onTogglePackage: (packageId: string) => void;
}

export default function PackageSelector({
  packages,
  selectedPackages,
  onTogglePackage,
}: PackageSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Optional Packages</h3>
      <div className="space-y-2">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => onTogglePackage(pkg.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
              selectedPackages.includes(pkg.id)
                ? 'bg-gray-100 ring-2 ring-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center ${
                  selectedPackages.includes(pkg.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedPackages.includes(pkg.id) && (
                  <Check className="text-white" size={16} />
                )}
              </div>
              <span className="font-medium">{pkg.name}</span>
            </div>
            <span className="text-gray-500">+${pkg.price.toLocaleString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}