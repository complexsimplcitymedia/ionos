import React from 'react';
import { Shield } from 'lucide-react';

export default function GalleryPage() {
  const projects = [
    {
      title: 'Porsche 911 GT3',
      description: 'Full vehicle wrap with Avery Dennison Satin Black',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      category: 'Vehicle Wraps'
    },
    {
      title: 'Mercedes-AMG GT',
      description: 'Custom pearl paint with ceramic coating',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      category: 'Custom Paint'
    },
    {
      title: 'BMW M4 Competition',
      description: 'No matter the limits of your imagination',
      image: 'https://i.redd.it/4q2xig0qb8o61.png',
      category: 'Vehicle Wraps'
    },
    {
      title: 'Audi RS7',
      description: 'HyperShift color-changing wrap transformation',
      image: 'https://cdn.motor1.com/images/mgl/pEOXW/s3/audi-rs7-red-to-black-hypershift-color-shift-dip.jpg',
      category: 'Vehicle Wraps'
    },
    {
      title: 'Lamborghini Huracán',
      description: 'The devil is in the details',
      image: 'https://signsofthetimes.com/wp-content/uploads/2022/06/FAEFD60F-8146-4D5D-9D52-BBC1457701D1.jpg',
      category: 'Custom Graphics'
    },
    {
      title: 'Porsche 718 Cayman GT4 RS',
      description: 'Full body paint correction and ceramic coating',
      image: 'https://images.unsplash.com/photo-1592853625597-7d17be820d0c?auto=format&fit=crop&w=1200&q=80',
      category: 'Paint Protection'
    }
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Custom Vehicle Transformation Gallery | Kustom Auto Wrx
          </h1>
          <h2 className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcase of Our Premium Auto Customization Projects
          </h2>
        </div>

        <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}