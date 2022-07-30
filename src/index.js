import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { AuthProvider } from './contextApi/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CookiesProvider>
);