// src/contexts/LocaleContext.js
import React, { createContext, useState, useContext } from 'react';
import ar from '../locales/ar';
import en from '../locales/en';

// إنشاء السياق
export const LocaleContext = createContext();

// مزود السياق
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('ar'); // اللغة الافتراضية هي العربية

  const translations = {
    ar,
    en,
  };

  const t = (key) => {
    // الوصول إلى الترجمة بناءً على المفتاح
    const keys = key.split('.');
    let text = translations[locale];
    for (const k of keys) {
      if (text && text[k] !== undefined) {
        text = text[k];
      } else {
        // إذا لم يتم العثور على الترجمة، ارجع المفتاح نفسه
        console.warn(`Translation key not found for ${locale}: ${key}`);
        return key;
      }
    }
    return text;
  };

  const toggleLocale = () => {
    setLocale(prevLocale => (prevLocale === 'ar' ? 'en' : 'ar'));
  };

  return (
    <LocaleContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Hook مخصص لاستخدام الترجمة
export const useLocale = () => useContext(LocaleContext);
