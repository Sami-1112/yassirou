// src/index.js (Example, adjust based on your React project setup)
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App';
// import './index.css'; // Assuming you have a global CSS file for Tailwind imports

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
