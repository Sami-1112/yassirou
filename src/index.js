// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // استيراد المكون الرئيسي
import './index.css'; // استيراد ملف CSS العام (لإعدادات Tailwind والخطوط)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
