import React from 'react';
import PixelStreamViewer from './PixelStreamViewer';

export default function PixelStreamPage() {
  // Replace with your Unreal Engine Pixel Streaming URL
  const streamUrl = process.env.VITE_PIXEL_STREAM_URL || 'ws://localhost:8888';

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col">
      <header className="bg-black/40 backdrop-blur-sm p-4">
        <h1 className="text-xl font-bold text-white">Kustom Auto Wrx Interactive Experience</h1>
      </header>
      <main className="flex-1">
        <PixelStreamViewer 
          streamUrl={streamUrl}
          width="100%"
          height="100%"
        />
      </main>
    </div>
  );
}