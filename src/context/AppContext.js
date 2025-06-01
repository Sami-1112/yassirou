// src/context/AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../locales'; // استيراد ملفات الترجمة

// إنشاء Context
const AppContext = createContext();

// AppProvider هو المكون الذي سيوفر الحالة العامة للتطبيق
export const AppProvider = ({ children }) => {
  // حالة اللغة الحالية (افتراضياً عربي)
  const [locale, setLocale] = useState('ar');
  // حالة رسالة النظام (للنجاح/الخطأ)
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  // دالة لتغيير اللغة
  const toggleLocale = () => {
    setLocale(prevLocale => (prevLocale === 'ar' ? 'en' : 'ar'));
  };

  // دالة لعرض رسالة
  const showMessage = (type, text) => {
    setMessage({ type, text });
    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  // قيمة الـ Context التي ستكون متاحة لجميع المكونات الفرعية
  const contextValue = {
    locale,
    toggleLocale,
    t: translations[locale], // دالة الترجمة
    message,
    showMessage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// هوك مخصص لاستخدام الـ Context بسهولة
export const useAppContext = () => {
  return useContext(AppContext);
};
