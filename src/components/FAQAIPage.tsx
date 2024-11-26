import React from 'react';
import { Helmet } from 'react-helmet-async';
import PixelStreamViewer from './PixelStreamViewer';

export default function FAQAIPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Interactive AI Assistant | Kustom Auto Wrx</title>
        <meta name="description" content="Experience our interactive AI assistant for real-time auto customization guidance. Get expert advice on vehicle modifications, wraps, and paint services." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive AI Assistant
          </h1>
          <p className="text-xl text-gray-300">
            Customize your vehicle in real-time with our AI assistant
          </p>
        </div>

        <div className="aspect-video">
          <PixelStreamViewer />
        </div>
      </div>
    </div>
  );
}