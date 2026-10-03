import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@z-ux/tokens/colors.css';
import '@z-ux/tokens/sizes.css';
import '@z-ux/tokens/text.css';
import '@z-ux/tokens/motion.css';
import '@z-ux/tokens/elevation.css';
import App from './App';
import './docs.css';
import './component-page-subheader.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
