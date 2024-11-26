import React from 'react';
import { Check, Shield, Star } from 'lucide-react';

interface PricingPageProps {
  onOpenAppointment: () => void;
}

export default function PricingPage({ onOpenAppointment }: PricingPageProps) {
  const packages = [
    {
      name: 'Basic Wrap',
      price: 2800,
      description: 'Quality vinyl wrap with solid colors',
      features: [
        'Premium Cast Vinyl',
        'Solid Color Options',
        '3-Year Warranty',
        'Professional Installation',
        'Surface Preparation',
      ],
    },
    {
      name: 'Premium Wrap',
      price: 3500,
      description: 'Advanced wraps with premium finishes',
      popular: true,
      features: [
        'Premium Cast Vinyl',
        'Color Shift Options',
        'Chrome & Metallic Finishes',
        '5-Year Warranty',
        'Paint Correction',
        'Professional Installation',
        'Surface Preparation',
        'Door Jambs Coverage',
      ],
    },
    {
      name: 'Custom Paint',
      price: 4500,
      description: 'Full custom paint job with premium finish',
      features: [
        'Premium Paint Materials',
        'Custom Color Mixing',
        'Multi-stage Paint Process',
        '5-Year Warranty',
        'Paint Correction',
        'Clear Coat Protection',
        'Surface Preparation',
        'Complete Coverage',
      ],
    },
  ];

  const additionalServices = [
    {
      name: 'Paint Protection Film',
      price: 1500,
      description: 'Premium clear bra protection for high-impact areas',
      features: [
        'Self-healing film',
        'UV protection',
        '10-year warranty',
        'Preserves paint value'
      ]
    },
    {
      name: 'Ceramic Coating',
      price: 800,
      description: 'Professional-grade ceramic coating protection',
      features: [
        '9H hardness rating',
        'Hydrophobic properties',
        '5-year protection',
        'Enhanced gloss'
      ]
    },
    {
      name: 'Window Tinting',
      price: 300,
      description: 'Premium ceramic window tint installation',
      features: [
        'Heat rejection',
        'UV protection',
        'Lifetime warranty',
        'Legal compliance'
      ]
    },
    {
      name: 'Chrome Delete',
      price: 800,
      description: 'Transform chrome trim to sleek black finish',
      features: [
        'Satin or gloss finish',
        'Complete trim coverage',
        '5-year warranty',
        'OEM-quality look'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Auto Customization Pricing & Packages | Kustom Auto Wrx
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transparent Pricing for Premium Vehicle Customization Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-white/10 rounded-xl p-8 backdrop-blur-sm ${
                pkg.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center bg-blue-500 px-4 py-1 rounded-full">
                    <Star className="w-4 h-4 text-white mr-1" />
                    <span className="text-sm font-medium text-white">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="flex items-center justify-center text-gray-300 mb-4">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="ml-2">starting at</span>
                </div>
                <p className="text-gray-400">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-blue-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenAppointment}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                aria-label={`Get started with ${pkg.name} package`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Additional Protection & Enhancement Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div key={service.name} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                  </div>
                  <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                </div>
                <div className="text-xl font-bold text-blue-400 mb-4">
                  Starting at ${service.price}
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p>* Prices may vary based on vehicle size and condition. Contact us for a detailed quote.</p>
        </div>
      </div>
    </div>
  );
}