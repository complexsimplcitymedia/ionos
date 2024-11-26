import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface PixelStreamViewerProps {
  width?: string | number;
  height?: string | number;
}

export default function PixelStreamViewer({ 
  width = '100%', 
  height = '100%' 
}: PixelStreamViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const streamUrl = import.meta.env.VITE_VAGON_STREAM_URL;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const retryConnection = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setError(null);
      iframeRef.current.src = streamUrl;
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleIframeLoad = () => {
      setIsLoading(false);
      iframeRef.current?.focus();
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'streamReady') {
        setIsLoading(false);
        iframeRef.current?.focus();
      }
      if (event.data.type === 'streamError') {
        setError('Stream connection lost. Please try refreshing.');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (iframeRef.current && document.activeElement === iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          type: 'keyEvent',
          eventType: 'keydown',
          key: event.key,
          code: event.code,
          keyCode: event.keyCode,
          altKey: event.altKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          metaKey: event.metaKey
        }, '*');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (iframeRef.current && document.activeElement === iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          type: 'keyEvent',
          eventType: 'keyup',
          key: event.key,
          code: event.code,
          keyCode: event.keyCode,
          altKey: event.altKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          metaKey: event.metaKey
        }, '*');
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('message', handleMessage);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const container = document.querySelector('.pixel-stream-container');
    if (container) {
      container.addEventListener('click', () => iframeRef.current?.focus());
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (container) {
        container.removeEventListener('click', () => iframeRef.current?.focus());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/80 rounded-xl">
        <div className="text-center text-white p-6">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={retryConnection}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black pixel-stream-container">
      <iframe
        ref={iframeRef}
        src={streamUrl}
        className="w-full h-full border-0"
        style={{ width, height }}
        allow="microphone; camera; fullscreen; autoplay; clipboard-read; clipboard-write"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals"
        referrerPolicy="origin"
        loading="eager"
        importance="high"
        fetchpriority="high"
        tabIndex={0}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Connecting to Interactive Experience...</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex items-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/2/20/Unreal_Engine_5_logo.svg"
          alt="Unreal Engine 5"
          className="h-12 w-auto opacity-75"
        />
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-gray-600/80 hover:bg-gray-600 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}