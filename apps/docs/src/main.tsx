import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import '@z-ui/tokens/elevation.css';
import App from './App';
import './docs.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
