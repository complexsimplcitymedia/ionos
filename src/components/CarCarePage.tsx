import React from 'react';
import { Shield, Droplet, Sun, Wrench, Wind, Sparkles } from 'lucide-react';

export default function CarCarePage() {
  const careGuides = [
    {
      title: 'Wrap Care',
      icon: <Shield className="w-6 h-6" />,
      tips: [
        'Hand wash only with pH-neutral car soap',
        'Avoid automatic car washes',
        "Don't wax wrapped surfaces",
        'Clean bird droppings immediately',
        'Park in shade when possible'
      ]
    },
    {
      title: 'Paint Protection',
      icon: <Sparkles className="w-6 h-6" />,
      tips: [
        'Regular washing and drying',
        'Apply ceramic coating annually',
        'Use microfiber towels only',
        'Avoid harsh chemicals',
        'Regular paint correction'
      ]
    },
    {
      title: 'Interior Care',
      icon: <Wind className="w-6 h-6" />,
      tips: [
        'Vacuum regularly',
        'Use leather conditioner',
        'Clean spills immediately',
        'Protect from UV damage',
        'Regular detail cleaning'
      ]
    }
  ];

  const maintenanceSchedule = [
    {
      interval: 'Weekly',
      tasks: [
        'Gentle hand washing',
        'Interior vacuum',
        'Tire pressure check',
        'Visual inspection'
      ]
    },
    {
      interval: 'Monthly',
      tasks: [
        'Deep cleaning',
        'Leather conditioning',
        'Trim dressing',
        'Paint inspection'
      ]
    },
    {
      interval: 'Quarterly',
      tasks: [
        'Paint correction',
        'Ceramic coating check',
        'Deep interior cleaning',
        'Professional inspection'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional Vehicle Care Guide | Kustom Auto Wrx
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert Tips for Maintaining Your Custom Vehicle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {careGuides.map((guide) => (
            <div key={guide.title} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg">
                  {React.cloneElement(guide.icon, { className: 'w-6 h-6 text-white' })}
                </div>
                <h3 className="text-xl font-semibold text-white">{guide.title}</h3>
              </div>
              <ul className="space-y-3">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Shield className="w-4 h-4 text-blue-400 mr-2 mt-1 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Maintenance Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenanceSchedule.map((schedule) => (
              <div key={schedule.interval} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">
                  {schedule.interval} Care
                </h3>
                <ul className="space-y-3">
                  {schedule.tasks.map((task, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Wrench className="w-4 h-4 text-blue-400 mr-2" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Recommended Care Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'pH-Neutral Car Wash',
                icon: <Droplet />,
                description: 'Gentle cleansing for wraps and paint'
              },
              {
                name: 'Microfiber Towels',
                icon: <Sparkles />,
                description: 'Safe for all surfaces'
              },
              {
                name: 'Ceramic Boost Spray',
                icon: <Shield />,
                description: 'Enhance protection between details'
              },
              {
                name: 'Interior Cleaner',
                icon: <Wind />,
                description: 'Safe for all interior surfaces'
              }
            ].map((product) => (
              <div key={product.name} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    {React.cloneElement(product.icon, { className: 'w-5 h-5 text-white' })}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                </div>
                <p className="text-gray-400">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}