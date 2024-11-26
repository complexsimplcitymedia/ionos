import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  return (
    <main role="main" className="relative overflow-hidden min-h-screen">
      <Helmet>
        <title>Kustom Auto Wrx | Gainesville Auto Customization Experts</title>
        <meta name="description" content="Transform your vehicle with Gainesville's premier auto customization studio. Specializing in wraps, paint, and expert bodywork." />
        <meta name="seobility" content="700373bfd8e70b824004973f62b10353" />
        <meta name="keywords" content="car restoration, auto restoration, vehicle restoration, car customization, auto customization, vehicle customization, car paint job, auto paint job, vehicle paint job, car wrap, auto wrap, vehicle wrap, custom paint job, custom car paint, custom vehicle paint, Gainesville car restoration, Gainesville auto customization, luxury car restoration" />
        <link rel="canonical" href="https://kustomautowrx.com" />
      </Helmet>
      
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70 z-10" />
      
      <div className="absolute inset-0">
        <img
          src="https://laexoticcarrentalsandsales.com/cdn/shop/files/0FDA0ADD-ADB7-4188-B9A2-CE9D4E8CDBF1.jpg?v=1716627018&width=2048"
          alt="Luxury Vehicle Customization at Kustom Auto Wrx"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen flex items-center justify-between">
        <article className="max-w-2xl">
          <div className="space-y-2 mb-6">
            <h1 className="text-6xl font-bold text-white leading-tight">
              Auto Customization Studio
            </h1>
            <p className="text-6xl font-bold text-white leading-tight">
              Gainesville's Premier
            </p>
          </div>
          
          <div className="space-y-6 text-xl text-gray-300">
            <p>
              Experience unparalleled high-end car restoration and auto body services at Gainesville's leading vehicle customization studio. Our expert craftsmen specialize in premium vehicle wraps, custom paint jobs, and professional modifications for luxury and exotic vehicles. With state-of-the-art facilities and industry-leading techniques, we transform ordinary vehicles into extraordinary masterpieces.
            </p>
            <p>
              From classic car restoration to modern vehicle customization, we deliver exceptional results using industry-leading materials and techniques. Our certified professionals ensure every detail meets the highest standards of automotive excellence, backed by our comprehensive quality guarantee and extensive industry expertise. We take pride in our ability to bring your automotive dreams to life with precision, passion, and unmatched attention to detail.
            </p>
            <p className="font-semibold">
              Trust the blueprint for automotive excellence.
            </p>
          </div>
          
          <div className="mt-8">
            <button 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              aria-label="Schedule a consultation for your vehicle customization"
              onClick={onOpenAppointment}
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex items-center space-x-3 text-blue-400">
              <Shield className="w-5 h-5" />
              <span>5-Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-400">
              <Shield className="w-5 h-5" />
              <span>Premium Materials</span>
            </div>
          </div>
        </article>

        <aside className="hidden lg:block bg-black/40 backdrop-blur-sm rounded-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Schedule Now</h2>
          <p className="text-gray-300 mb-6">
            Don't wait! Schedule your appointment today to secure your preferred time slot and avoid extended wait times.
          </p>
          <button
            onClick={onOpenAppointment}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Reserve Your Spot
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </aside>
      </div>
    </main>
  );
}