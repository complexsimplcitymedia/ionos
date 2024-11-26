import React from 'react';
import { Check } from 'lucide-react';
import { ServiceOption } from '../types';

interface ServiceSelectorProps {
  services: ServiceOption[];
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
}

export default function ServiceSelector({
  services,
  selectedService,
  onServiceSelect,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Select Service</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className={`p-6 rounded-xl transition-all ${
              selectedService === service.id
                ? 'bg-blue-600/20 ring-2 ring-blue-500'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-white">{service.name}</h4>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedService === service.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}
              >
                {selectedService === service.id && <Check className="text-white" size={16} />}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{service.description}</p>
            <p className="text-blue-400 mt-2">From ${service.price.toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}