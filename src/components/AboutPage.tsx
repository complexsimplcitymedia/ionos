import React from 'react';
import { Shield, Users, Award, Wrench, Star, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality First',
      description: 'We never compromise on quality, using only premium materials and proven techniques for every project.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Team',
      description: 'Our certified professionals bring years of experience and passion to every vehicle transformation.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Customer Satisfaction',
      description: 'Your vision and satisfaction drive everything we do, backed by our satisfaction guarantee.'
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Innovation',
      description: 'We continuously invest in the latest automotive customization technologies and techniques.'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Kustom Auto Wrx | Gainesville's Premier Auto Studio
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming Vehicles with Precision Since 2017
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <img
              src="https://i.pinimg.com/1200x/66/09/28/6609289e73f76e09dfe09e45e07d863e.jpg"
              alt="McLaren at Kustom Auto Wrx"
              className="rounded-xl w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <MapPin className="w-5 h-5" />
                <span>2445 Hilton Dr, Ste 125W, Gainesville, GA</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5" />
                <span>Serving the community since 2017</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Our Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2017, Kustom Auto Wrx emerged from a passion for automotive excellence and a vision to provide Gainesville with premium vehicle customization services. What began as a specialized wrap shop has evolved into a comprehensive auto transformation studio.
              </p>
              <p>
                Our commitment to quality and innovation has established us as North Georgia's go-to destination for high-end vehicle modifications, custom paint work, and premium wraps. We've built our reputation on attention to detail and uncompromising standards.
              </p>
              <p>
                Today, we continue to push boundaries in automotive customization, combining traditional craftsmanship with cutting-edge techniques to deliver results that exceed expectations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="p-2 bg-blue-600 rounded-lg w-fit mb-4">
                {React.cloneElement(value.icon, { className: 'w-6 h-6 text-white' })}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}