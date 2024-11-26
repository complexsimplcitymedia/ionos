import React from 'react';
import { ServiceOption, PaintOption, WrapOption, BodyworkOption } from '../types';

interface PriceBreakdownProps {
  selectedService: ServiceOption;
  selectedFinish?: PaintOption | WrapOption;
  selectedBodywork: BodyworkOption[];
  selectedAddons: BodyworkOption[];
}

export default function PriceBreakdown({
  selectedService,
  selectedFinish,
  selectedBodywork,
  selectedAddons,
}: PriceBreakdownProps) {
  const bodyworkTotal = selectedBodywork.reduce((sum, item) => sum + item.price, 0);
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const finishPrice = selectedFinish?.price || 0;
  const totalPrice = selectedService.price + finishPrice + bodyworkTotal + addonsTotal;

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
      <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>{selectedService.name}</span>
          <span>${selectedService.price.toLocaleString()}</span>
        </div>
        {selectedFinish && (
          <div className="flex justify-between text-gray-300">
            <span>{selectedFinish.name}</span>
            <span>+${selectedFinish.price.toLocaleString()}</span>
          </div>
        )}
        {selectedBodywork.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-300">
            <span>{item.name}</span>
            <span>+${item.price.toLocaleString()}</span>
          </div>
        ))}
        {selectedAddons.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-300">
            <span>{item.name}</span>
            <span>+${item.price.toLocaleString()}</span>
          </div>
        ))}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Price</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            * Final price may vary based on vehicle size and condition
          </p>
        </div>
      </div>
    </div>
  );
}