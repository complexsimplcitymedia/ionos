import React from 'react';
import { Shield, Star, Check } from 'lucide-react';

export default function WrapBrands() {
  const brands = [
    {
      name: '3M',
      logo: 'https://purepng.com/public/uploads/large/purepng.com-3m-logologobrand-logoiconslogos-251519940406sci7r.png',
      website: 'https://www.3m.com/3M/en_US/p/c/automotive-parts-hardware/',
      description: '3M offers a comprehensive range of high-quality vinyl wrap films known for durability and ease of application.',
      features: ['Durability', 'Easy Application', '2080 Series', 'Multiple Finishes'],
      popular: true
    },
    {
      name: 'Avery Dennison',
      logo: 'https://logowik.com/content/uploads/images/avery-dennison8596.jpg',
      website: 'https://www.averydennison.com/en/home/industries/automotive.html',
      description: 'Avery Dennison provides the Supreme Wrapping Film series, recognized for its extensive color palette.',
      features: ['Supreme Series', 'Color Variety', 'Conformability', 'Professional Grade']
    },
    {
      name: 'Orafol',
      logo: 'https://www.logolynx.com/images/logolynx/6a/6a36586be0fe3c8b0641d63bf610224c.jpeg',
      website: 'https://www.orafol.com/en/americas/products/graphic-innovations/overview',
      description: 'Orafol offers the 970RA and 975RA series, featuring unique options like honeycomb patterns.',
      features: ['970RA Series', '975RA Series', 'Unique Textures', 'Pattern Options']
    },
    {
      name: 'KPMF',
      logo: 'https://toplogos.ru/images/logo-kpmf.jpg',
      website: 'https://www.kpmf.com/',
      description: 'KPMF specializes in high-quality vehicle wrap films with unique finishes.',
      features: ['Iridescent Finish', 'Pearlescent Options', 'Visual Effects', 'Premium Quality']
    },
    {
      name: 'Hexis',
      logo: 'https://www.plasticoscomerciales.com/wp-content/uploads/2022/09/Hexis-logo.jpg',
      website: 'https://www.hexis-graphics.com/en/',
      description: 'Hexis offers a wide range of cast vinyl films suitable for full vehicle wraps.',
      features: ['Cast Vinyl', 'Vibrant Colors', 'Full Wraps', 'Durability']
    },
    {
      name: 'Arlon',
      logo: 'https://www.signshop.com/wp-content/uploads/2012/02/Arlon-logo.jpg',
      website: 'https://www.arlon.com/na_en/products/applications/fleet-vehicle-wraps',
      description: 'Arlon provides the SLX Cast Wrap series, designed for easy installation.',
      features: ['SLX Series', 'Easy Install', 'Long-term Use', 'Versatile']
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium Vehicle Wrap Manufacturers | Kustom Auto Wrx
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Certified Partners for High-Quality Vehicle Wraps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
            >
              <div className="p-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="w-full h-32 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{brand.name}</h3>
                <p className="text-gray-300 mb-4">{brand.description}</p>
                <div className="space-y-2 mb-4">
                  {brand.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-400">
                      <Shield className="w-4 h-4 text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}