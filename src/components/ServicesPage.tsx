import React from 'react';
import { Shield, Paintbrush, Car, Wrench, Palette, Layers } from 'lucide-react';

interface ServicesPageProps {
  onOpenAppointment: () => void;
}

export default function ServicesPage({ onOpenAppointment }: ServicesPageProps) {
  const services = [
    {
      id: 'full-wraps',
      title: 'Full Vehicle Wraps',
      icon: <Car className="w-8 h-8" />,
      description: 'Complete vehicle transformation with premium vinyl wraps',
      features: [
        'Premium Cast Vinyl',
        'Color Change Wraps',
        'Custom Designs',
        'Paint Protection',
      ],
      image: 'https://www.wrapstyle.com/content/img_cache/1200x675/1597316279-1744-Ferrari-Spider-Camo-design-1-.jpg'
    },
    {
      id: 'custom-graphics',
      title: 'Custom Graphics',
      icon: <Palette className="w-8 h-8" />,
      description: 'Personalized designs and commercial branding solutions',
      features: [
        'Logo Design',
        'Racing Stripes',
        'Commercial Fleet Graphics',
        'Custom Decals',
      ],
      image: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F09%2Fkoenigsegg-agera-rs-ruthie-james-jean-pomegranate-festival-of-children-foundation-wrap-003.jpg?q=90&w=2000&cbr=1&fit=max'
    },
    {
      id: 'custom-paint',
      title: 'Custom Paint',
      icon: <Paintbrush className="w-8 h-8" />,
      description: 'Professional paint services with premium finishes',
      features: [
        'Custom Color Mixing',
        'Metallic Finishes',
        'Pearl Effects',
        'Multi-tone Paint',
      ],
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'paint-protection',
      title: 'Paint Protection',
      icon: <Shield className="w-8 h-8" />,
      description: 'Advanced protection solutions for your vehicle',
      features: [
        'Ceramic Coating',
        'Paint Protection Film',
        'Anti-scratch Protection',
        'UV Protection',
      ],
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'color-change',
      title: 'Color Change',
      icon: <Layers className="w-8 h-8" />,
      description: 'Complete color transformation solutions',
      features: [
        'Full Color Changes',
        'Two-Tone Designs',
        'Accent Color Changes',
        'Custom Color Matching',
      ],
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1155015.jpg&f=1&nofb=1&ipt=c05e7eb05984b99163b226763f2f4bdc07d23d6cd82ad66fbd10cdd5a78ac835&ipo=images'
    },
    {
      id: 'bodywork',
      title: 'Auto Body Work',
      icon: <Wrench className="w-8 h-8" />,
      description: 'Expert collision repair and bodywork services',
      features: [
        'Collision Repair',
        'Panel Replacement',
        'Frame Straightening',
        'Dent Removal',
      ],
      image: 'https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0624/1ac06e9ed3454131a937ae11afd4e70e_hrs.jpg'
    }
  ];

  const navigateToWrapBrands = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'wrap-brands' }));
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional Auto Customization Services | Kustom Auto Wrx
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert Vehicle Wraps, Custom Paint & Auto Body Services in Gainesville
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white flex items-center space-x-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    {React.cloneElement(service.icon, { className: 'w-6 h-6' })}
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-400">
                      <Shield className="w-4 h-4 text-blue-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={onOpenAppointment}
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label={`Book appointment for ${service.title}`}
                >
                  Book Now
                </button>

                {(service.id === 'full-wraps' || service.id === 'custom-graphics') && (
                  <button
                    onClick={navigateToWrapBrands}
                    className="mt-3 w-full bg-transparent border border-blue-600 text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600/10 transition-colors"
                  >
                    View Wrap Brands
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}