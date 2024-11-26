import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PixelStreamPage from './components/PixelStreamPage';
import './index.css';

createRoot(document.getElementById('pixel-stream-root')!).render(
  <StrictMode>
    <PixelStreamPage />
  </StrictMode>
);