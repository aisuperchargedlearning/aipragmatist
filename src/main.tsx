import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/forms.css';
import './styles/components.css';
import { App } from './App';
import { createDemoServices, ServicesProvider } from './services/ServicesContext';

const services = createDemoServices();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesProvider services={services}>
      <App />
    </ServicesProvider>
  </StrictMode>,
);
