import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvidersNest } from './context/ContextProvidersNest';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ContextProvidersNest>
      <App />
    </ContextProvidersNest>
  </Router>
);
