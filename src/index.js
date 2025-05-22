import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles/css/main.css';
import { LeadsProvider } from './context/LeadsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LeadsProvider>
      <App />
    </LeadsProvider>
  </React.StrictMode>
);

