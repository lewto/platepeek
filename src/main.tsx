import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.css';
import './index.css';

// Initialize PDF.js worker
import { initializePdfWorker } from './utils/pdf/config';
initializePdfWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);