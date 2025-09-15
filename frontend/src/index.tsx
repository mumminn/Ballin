import { attach401Handler } from '@/api/auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

attach401Handler();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

